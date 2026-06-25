---
title: "Automating Meta Ads with Claude Code: A Deep Dive"
date: 2026-06-25
updatedAt: 2026-06-25
lang: en
category: ai
summary: "Automating Meta (Facebook/Instagram) ads with Claude Code and the Marketing API: cents budgets, targeting, image_hash creatives, and a PAUSED safety gate."
tags: ["claude-code", "meta-marketing-api", "ai-coding", "marketing-automation", "developer-tools"]
intent: informational
primaryKeyword: "meta marketing api automation"
faq:
  - q: "Are Meta ad budgets in cents or micros?"
    a: "Cents — the account's minor currency unit. daily_budget of 1000 means $10.00 (1,000 cents), passed as a string. This is different from the Google Ads API, which uses micros (×1,000,000). Zero-decimal currencies like JPY and KRW are the wrinkle: there 5000 means 5,000 whole units, not 50. Read the budget back before activating either way."
  - q: "How do I read conversions from the Meta Marketing API?"
    a: "There is no single conversions field. You query the /insights edge with a date_preset and a level (campaign/adset/ad), then parse the actions array, filtering by action_type — link_click, landing_page_view, omni_purchase, and so on. Each action is an object with a string value you sum yourself. This is the opposite of Google's GAQL, where metrics come back as named columns."
  - q: "What is the difference between status and effective_status in the Meta API?"
    a: "status is the object's own configured state. effective_status rolls up the parent campaign/ad set status plus account-level restrictions like a disabled ad account. If you filter campaign queries on status, they can silently return nothing; filter on effective_status instead. This is one of the most common Meta automation footguns."
  - q: "Do I need a Meta Pixel to automate Meta ad campaigns?"
    a: "Not for an OUTCOME_TRAFFIC campaign optimizing for link clicks — that needs no pixel and is the simplest place to start. For OUTCOME_SALES with conversion optimization you need a Meta Pixel or the Conversions API on the destination, or the ad set has nothing to optimize toward."
---

## Quick Answer

Automating Meta (Facebook and Instagram) ads with Claude Code follows the same two-layer split as my Google setup: skills decide _what_ to run, and a deterministic Python script makes every Marketing API call. But Meta is its own animal. Budgets are in **cents** (`1000` = \$10.00), not Google's micros, and they live on the **ad set**, not the campaign. Reporting has no conversions field — you parse an `actions` array. Creatives need a two-step `image_hash` upload, targeting interest IDs must be looked up at runtime, and one wrong field name silently breaks the ad. Everything is created **PAUSED**. This is the deep dive.

This is the companion to [Automating Google Ads with Claude Code](/google-ads-api-automation-with-claude-code/), and both build on [How I Automated Ad Campaigns with Claude Code](/how-i-automated-ad-campaigns-with-claude-code/), which covered the two-layer idea across both platforms. If Google's API is strict and hierarchical, Meta's is sprawling and stateful: more places to put a budget, more ways to mislabel a field, and a reporting model that hands you a bag of actions instead of a row of numbers.

## Who This Guide Is For

- Solo developers running their own Facebook/Instagram ads who want to script the build-and-measure loop
- People who read the Google deep-dive and want the Meta-specific layer next to it
- Anyone who hit the Meta Marketing API and found it stranger than the docs make it look

If you have not seen the two-layer pattern — Claude Code skills for language and judgment, Python scripts for every real API call — read [the first post](/how-i-automated-ad-campaigns-with-claude-code/) first. This one assumes it.

## What Meta Makes Harder

Meta and Google are both "the ad API," and almost nothing transfers field-for-field. The differences all leak into your code:

| Concern | Google Ads API | Meta Marketing API |
| --- | --- | --- |
| Budget unit | Micros (×1,000,000) | **Cents** / minor currency unit (×100) |
| Budget lives on | The campaign (a Budget entity) | The **ad set** (or the campaign with CBO) |
| Hierarchy | Campaign → Ad Group → Ad | Campaign → Ad Set → Ad → **Creative** |
| Reporting | GAQL columns | `/insights` edge + an **`actions` array** you parse |
| Conversions | A `conversions` metric | No single field — filter `actions` by `action_type` |
| Image | Reference by resource | **Upload first → `image_hash`** → reference |
| Interests | API-defined objects | **Looked up at runtime**, not hardcoded |
| Status filter | `status` | **`effective_status`** |

None of these are hard once you know them. Each one quietly costs you an afternoon the first time, which is exactly why the deterministic script encodes every one of them once.

## The Meta Hierarchy

You build four levels, and unlike Google the budget is not at the top:

```text
Campaign          # objective (OUTCOME_*), special_ad_categories
  └─ Ad Set       # daily_budget (cents!), targeting, optimization_goal, bid_strategy
      └─ Ad       # links an ad set to a creative
          └─ Ad Creative   # object_story_spec: page_id, link_data, image_hash
```

My scripts create these top-down with one POST per level, threading each returned id into the next (`campaign_id` into the ad set, `creative_id` into the ad). The campaign is almost an empty shell — name and objective. The **ad set is where the real decisions live**: the money, the audience, and what you optimize for.

## The Workflow

### Step 1: Authenticate with a system user token

Meta does not want a personal OAuth token for automation — it wants a **system user token** from a Business Manager, with the `ads_management` permission. The script loads it once and pins a Graph API version:

```python
class MetaAdManager:
    def __init__(self):
        self.token = os.getenv("META_SYSTEM_USER_TOKEN")
        self.ad_account = f"act_{os.getenv('META_AD_ACCOUNT_ID')}"
        self.page_id = os.getenv("FACEBOOK_PAGE_ID")
        self.ig_user_id = os.getenv("INSTAGRAM_ACCOUNT_ID")
        if not self.token:
            raise ValueError("META_SYSTEM_USER_TOKEN is not set")
```

Two practical notes. The ad account id is always prefixed `act_`. And load your `.env` with `load_dotenv(override=True)` — without `override`, an already-exported stale token wins and you spend an hour wondering why a fresh token still 401s. That one-liner cost me that exact hour, the same way it did on the Google side.

### Step 2: Create the campaign with an ODAX objective

Since v21, Meta only accepts the ODAX (Outcome-Driven Ad Experiences) objectives. There are six: `OUTCOME_AWARENESS`, `OUTCOME_TRAFFIC`, `OUTCOME_ENGAGEMENT`, `OUTCOME_LEADS`, `OUTCOME_SALES`, `OUTCOME_APP_PROMOTION`. The old objective names just error now.

```python
self._post(f"{self.ad_account}/campaigns", {
    "name": name,
    "objective": "OUTCOME_TRAFFIC",
    "status": "PAUSED",
    "special_ad_categories": "[]",
    "is_adset_budget_sharing_enabled": "false",   # required since v22
})
```

`special_ad_categories` is not optional — if your ad touches housing, employment, credit, or politics you must declare it, and that declaration restricts targeting. `is_adset_budget_sharing_enabled` is a field that simply did not exist in older versions and became required in a bump; leaving it out breaks creation with a cryptic error. Pin it in code with a comment, the same way a Google campaign now needs an EU political advertising flag.

### Step 3: The budget — cents, on the ad set, as a string

This is the unit that bites. Meta money is the account's **minor currency unit**: for USD or EUR that is cents, so `daily_budget` of `1000` is \$10.00. It is passed as a **string**, and it lives on the **ad set**, not the campaign:

```python
self._post(f"{self.ad_account}/adsets", {
    "name": name,
    "campaign_id": campaign_id,
    "daily_budget": "1000",                      # cents -> $10.00/day
    "billing_event": "IMPRESSIONS",
    "optimization_goal": "LINK_CLICKS",
    "bid_strategy": "LOWEST_COST_WITHOUT_CAP",
    "promoted_object": json.dumps({"page_id": self.page_id}),
    "targeting": json.dumps(targeting),
    "status": "PAUSED",
})
```

The wrinkle: zero-decimal currencies have no cents. A JPY or KRW account passes whole units, so `5000` is 5,000 yen/won, not 50. Hardcode the ×100 assumption and an account in the wrong currency is off by 100. The script reads the account currency and decides; it does not assume.

`bid_strategy` is the ad set's cost control: `LOWEST_COST_WITHOUT_CAP` (let Meta spend the budget), `COST_CAP`, or `BID_CAP`. And `promoted_object` with the `page_id` is required for most placements — another field that returns nothing useful in the error when you forget it.

### Step 4: Targeting — looked up, not hardcoded

Targeting is Meta's whole game, and it is a JSON-stringified spec:

```python
targeting = {
    "age_min": 20, "age_max": 35,
    "genders": [0],                              # 0=all, 1=male, 2=female
    "geo_locations": {"countries": ["US"]},
    "publisher_platforms": ["facebook", "instagram"],
    "targeting_automation": {"advantage_audience": 0},   # required since v22
    "flexible_spec": [{"interests": interests}],
}
```

Interest IDs are **not stable enough to hardcode**. They differ by locale and get deprecated. So the script searches for them at runtime and uses what comes back:

```python
def search_interests(self, query, limit=10):
    resp = self._get("search", {"type": "adinterest", "q": query, "limit": limit})
    return [{"id": x["id"], "name": x["name"],
             "size": x.get("audience_size_lower_bound")} for x in resp["data"]]
```

This is the clean division of labor: the skill proposes interest _names_ a human understands ("cats", "pet adoption", "animal welfare"), and the script resolves them to live IDs the API accepts. `advantage_audience` under `targeting_automation` is another recently-required field — newer versions default it on or demand it explicitly, so the script always sets it rather than letting the default drift.

### Step 5: The creative — two steps, and one field that breaks everything

You cannot put an image in a creative. You upload the image first, get an `image_hash`, and reference the hash:

```python
def upload_image(self, path):
    with open(path, "rb") as f:
        resp = requests.post(f"{BASE_URL}/{self.ad_account}/adimages",
                             files={"filename": f}, data={"access_token": self.token})
    return next(iter(resp.json()["images"].values()))["hash"]
```

Then the creative is an `object_story_spec` referencing that hash, with the Facebook page id and — the gotcha — `instagram_user_id`:

```python
story_spec = {
    "page_id": self.page_id,
    "link_data": {
        "image_hash": image_hash,                # from step 1, never raw bytes
        "link": link_url,
        "message": primary_text,
        "name": headline,
        "call_to_action": {"type": "SHOP_NOW", "value": {"link": link_url}},
    },
}
if use_instagram:
    story_spec["instagram_user_id"] = self.ig_user_id   # NOT instagram_actor_id
```

The trap is `instagram_actor_id`. It is the plausible-looking name an LLM invents with full confidence, and it fails the creative on current versions. The correct field is `instagram_user_id`. This is precisely why the API call lives in a script: the right field name is encoded once, not re-guessed probabilistically on every run.

### Step 6: Everything is created PAUSED

Campaign, ad set, and ad are all created `PAUSED`, and each level must be activated explicitly. The reason is the same one that makes PAUSED non-negotiable on Google: the agent chose the budget, the budget is in an off-by-100-or-10,000 unit, and the audience could be ten people or ten million. Created PAUSED, I read the budget, the resolved interests, the copy, and the creative before a single impression serves. The automation assembles; a human flips it on.

### Step 7: Read it back from /insights — and parse the actions array

There is no GAQL and no `conversions` column. You hit the `/insights` edge and then dig through an `actions` array:

```python
def get_insights(self, object_id, level=None, date_preset="last_7d"):
    params = {"fields": "impressions,reach,clicks,spend,cpc,ctr,actions",
              "date_preset": date_preset}
    if level:
        params["level"] = level                  # campaign / adset / ad
    return self._get(f"{object_id}/insights", params)["data"]

# conversions are NOT a field — you filter the actions list:
link_clicks = next((int(a["value"]) for a in row.get("actions", [])
                    if a["action_type"] == "link_click"), 0)
```

Every meaningful outcome — `link_click`, `landing_page_view`, `post_engagement`, `omni_purchase` — is an entry in `actions` with a string `value`. You filter by `action_type` and cast the value yourself. And when you list campaigns, filter on **`effective_status`**, not `status`, or the query silently returns nothing because `status` ignores the parent and account-level state.

### Step 8: Evaluate and recommend — never autopilot

A reporting skill pulls insights and an evaluation skill reads them with legible rules: high spend and zero `omni_purchase` actions → recommend pause; cost-per-result trending up → recommend a smaller budget; a winner → recommend more. These are recommendations written to a report I read. Activation and budget changes stay human, the same as on Google.

## Example Project Structure

Genericized, but this is the real shape of the Meta side:

```text
marketing-agent/
  CLAUDE.md                        # workflow map + hard rules (objects are PAUSED)
  .env                             # system user token, ad account, page, IG ids
  .claude/skills/
    meta-ad-setup/SKILL.md         # campaign -> ad set -> ad
    meta-creative-generator/SKILL.md   # AI image -> upload -> image_hash
    meta-copy-generator/SKILL.md       # primary text / headline / CTA
    meta-fetch-campaign/SKILL.md       # /insights queries
    meta-evaluate-campaign/SKILL.md    # actions-array read -> recommendations
    meta-env-setup/SKILL.md            # token + Business Manager validation
  src/
    meta_ad_manager.py             # campaign/adset/ad CRUD + insights
    meta_creative_generator.py     # image generation + adimages upload
    meta_auth_check.py             # debug_token validation
  assets/brands/<id>/
    profile.json                   # ad_account_id, page_id, instagram_account_id, pixel_id
    copy_config.json               # objective, budget, targeting, tone
```

`meta_ad_manager.py` owns the cents math, the targeting spec, and the `effective_status` filter. `profile.json` keeps each brand's Meta ids in one file so the skill never re-asks for a page id. And `CLAUDE.md` carries the non-negotiable rule: everything is created PAUSED.

## A Real Project Note

The honest part, same as the Google write-up: not one failure was the model being dumb. Every one was the Meta API being particular, and every fix was to pin the rule in the script.

- **Fields that appeared in a version bump.** `is_adset_budget_sharing_enabled` on the campaign and `advantage_audience` under `targeting_automation` both became required. Code written against an older version breaks on upgrade with an unhelpful error. Pin them, comment why.
- **`instagram_user_id`, not `instagram_actor_id`.** The wrong-but-plausible name fails the creative. Hardcoding the correct field ended the guessing — the single most LLM-proof line in the file.
- **Interest IDs are not hardcodable.** They vary by locale and get deprecated. `search_interests()` resolves names to live IDs at runtime instead of trusting a value baked into a prompt.
- **The image is a two-step.** Passing a filename or bytes where an `image_hash` belongs just fails. Upload to `/adimages` first, then reference the hash.
- **Conversions hide in `actions`.** There is no `conversions` field. Forgetting to parse the array makes a converting campaign look dead.
- **`effective_status` vs `status`.** Filtering on `status` returned an empty list while the campaign was plainly there. `effective_status` is the one that accounts for the hierarchy.
- **`load_dotenv(override=True)`.** A stale exported token beat the fresh one in `.env` until `override=True`. One line, one lost hour.

None of these are AI problems. They are integration problems, and the two-layer design contains them — each quirk fixed in the script once, instead of being re-litigated by the model on every call. The structure protects you, not the model, the same lesson I keep relearning [building small web apps with Claude Code](/how-i-use-claude-code-to-build-small-web-apps/).

## Common Mistakes

- **Treating budgets as currency, or assuming cents.** It is the account's minor unit — cents for USD/EUR, whole units for JPY/KRW. Read the currency; pass a string.
- **Putting the budget on the campaign.** In a standard setup it lives on the ad set. (Campaign budget optimization is a separate, deliberate choice.)
- **Hardcoding interest IDs.** Look them up at runtime; they move.
- **Embedding image bytes in the creative.** Upload first, reference the `image_hash`.
- **Using `instagram_actor_id`.** It is `instagram_user_id` in `object_story_spec`.
- **Filtering on `status`.** Use `effective_status` or your queries lie.
- **Expecting a conversions field.** Parse the `actions` array by `action_type`.
- **Letting the agent activate.** Create PAUSED; a human flips it on.

## Checklist

- [ ] Budget read from the account currency, passed as a string in the minor unit
- [ ] Budget set on the ad set (or campaign deliberately, for CBO)
- [ ] ODAX `OUTCOME_*` objective; `special_ad_categories` declared
- [ ] Version-required fields pinned (`is_adset_budget_sharing_enabled`, `advantage_audience`)
- [ ] Interest IDs resolved at runtime, never hardcoded
- [ ] Image uploaded to `/adimages` first; creative references the `image_hash`
- [ ] `instagram_user_id` (not `instagram_actor_id`) in `object_story_spec`
- [ ] Conversions parsed from the `actions` array by `action_type`
- [ ] Queries filter on `effective_status`
- [ ] Campaign, ad set, and ad created `PAUSED`, activated only by a human
- [ ] System user token in `.env`, loaded with `override=True`, never committed

## When Not to Use This Approach

If you run one Meta campaign and rarely touch it, open Ads Manager and click — the targeting spec, the `image_hash` dance, and the actions-array parsing are not worth scripting for a one-off. This pays off when you run the same build-and-measure loop repeatedly across several brands or products and the setup busywork is the bottleneck. And if you cannot yet judge whether an audience is sane or whether last week's cost-per-result was good, automate the mechanics but keep both hands on the approval gate. The system removes typing; it does not remove the need to know what good looks like.

## FAQ

**Q. Are Meta ad budgets in cents or micros?**

A. Cents — the account's minor currency unit. `daily_budget` of `1000` means \$10.00 (1,000 cents), passed as a string. This differs from the Google Ads API, which uses micros (×1,000,000). Zero-decimal currencies like JPY and KRW are the wrinkle: there `5000` means 5,000 whole units, not 50. Read the budget back before activating either way.

**Q. How do I read conversions from the Meta Marketing API?**

A. There is no single conversions field. You query the `/insights` edge with a `date_preset` and a `level` (campaign/adset/ad), then parse the `actions` array, filtering by `action_type` — `link_click`, `landing_page_view`, `omni_purchase`, and so on. Each action is an object with a string value you sum yourself. This is the opposite of Google's GAQL, where metrics come back as named columns.

**Q. What is the difference between `status` and `effective_status` in the Meta API?**

A. `status` is the object's own configured state. `effective_status` rolls up the parent campaign/ad set status plus account-level restrictions like a disabled ad account. If you filter campaign queries on `status`, they can silently return nothing; filter on `effective_status` instead. This is one of the most common Meta automation footguns.

**Q. Do I need a Meta Pixel to automate Meta ad campaigns?**

A. Not for an `OUTCOME_TRAFFIC` campaign optimizing for link clicks — that needs no pixel and is the simplest place to start. For `OUTCOME_SALES` with conversion optimization you need a Meta Pixel or the Conversions API on the destination, or the ad set has nothing to optimize toward.

## Related Articles

- [Automating Google Ads with Claude Code: A Deep Dive](/google-ads-api-automation-with-claude-code/) — the companion deep-dive on the other platform
- [How I Automated Ad Campaigns with Claude Code](/how-i-automated-ad-campaigns-with-claude-code/) — the two-layer foundation both deep-dives build on
- [How I Run a Claude Code Writing Project Like Software](/claude-code-writing-project-like-software/)
- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/)
- [More posts tagged AI coding](/tags/ai-coding/)
- [내가 AI로 블로그 글을 대량생산하는 워크플로우 (Korean)](/how-to-make-content-using-ai/)

_Last updated: 2026-06-25. Built against a pinned Graph API version (v22 in this project); required fields like `advantage_audience` and `is_adset_budget_sharing_enabled` move between versions, so check the changelog when you upgrade._
