---
title: "Automating Google Ads with Claude Code: A Deep Dive"
date: 2026-06-25
updatedAt: 2026-06-25
lang: en
category: ai
summary: "A deep dive into automating Google Ads with Claude Code and the Google Ads API: campaign hierarchy, micros budgets, GAQL reporting, and a PAUSED safety gate."
tags: ["claude-code", "google-ads-api", "ai-coding", "marketing-automation", "developer-tools"]
intent: informational
primaryKeyword: "google ads api automation"
faq:
  - q: "What is a micros budget in the Google Ads API?"
    a: "Google Ads expresses all money in micros, where 1,000,000 micros equals one unit of your account currency. A $10 daily budget is amount_micros = 10000000. Forgetting the multiplier is the classic footgun, which is exactly why every campaign should be created PAUSED so you can read the budget back before it spends."
  - q: "Do I need GAQL to automate Google Ads reporting?"
    a: "Yes. Google Ads has no flat insights endpoint like Meta. You read performance with GAQL (Google Ads Query Language), a SQL-like syntax: SELECT metrics.clicks, metrics.cost_micros FROM campaign WHERE segments.date DURING LAST_7_DAYS. Enum literals must be quoted, and cost fields come back in micros."
  - q: "Why create Google Ads campaigns in a PAUSED state?"
    a: "Because the agent picks the budget and the budget is in micros, a single off-by-a-million error can create a live overspend. Creating PAUSED means nothing delivers until a human reads the generated budget, keywords, and copy and flips it on. The automation builds the campaign; it never decides to spend."
  - q: "What auth does the Google Ads API need beyond an API key?"
    a: "Three things, not one: a developer token (account-level), an OAuth 2.0 client id/secret with a long-lived refresh token, and a login_customer_id for the manager (MCC) account. An invalid_grant error means the refresh token expired or was revoked and you have to re-authenticate by hand."
---

## Quick Answer

Automating Google Ads with Claude Code means letting the agent decide _what_ to advertise — keywords, copy, budget, match types — while a deterministic Python script using the `google-ads-python` client makes every API call. The Google-Ads-specific work is the part a generic ad-automation setup never shows you: building a five-level hierarchy (CampaignBudget → Campaign → AdGroup → keyword criteria → ad), setting budgets in **micros** (1,000,000 micros = one currency unit), reading performance back with **GAQL**, and authenticating with a developer token _plus_ an OAuth refresh token _plus_ a `login_customer_id`. Every campaign is created **PAUSED**. This post is the deep dive into each of those.

This is the follow-up to [How I Automated Ad Campaigns with Claude Code](/how-i-automated-ad-campaigns-with-claude-code/), which covered the two-layer idea — skills for judgment, scripts for execution — across both Meta and Google. Here I go down one platform: Google Ads, where the API is stricter, the budget unit is a trap, and reporting is a query language.

## Who This Guide Is For

- Solo developers running their own Google Search or App campaigns who want to script the setup-and-measure loop
- People who read the first post and want the Google-Ads-specific layer underneath it
- Anyone who hit the Google Ads API and discovered it is stricter, more hierarchical, and weirder than the Meta Graph API

If you have never seen the two-layer pattern — Claude Code skills handle language and judgment, Python scripts make every real API call — read [the first post](/how-i-automated-ad-campaigns-with-claude-code/) first. This one assumes it and zooms in.

## What Google Ads Makes Harder

The generic two-layer post treats "the ad API" as one box. Google Ads is a different box from Meta in five ways that all leak into your code:

| Concern | Meta-style ad API | Google Ads API |
| --- | --- | --- |
| Budget unit | Currency minor units | **Micros** (×1,000,000), as a separate CampaignBudget entity |
| Structure | Campaign → Ad Set → Ad | Mandatory **5-level** chain: Budget → Campaign → AdGroup → Criterion → Ad |
| Reporting | A flat insights endpoint | **GAQL**, a SQL-like query language |
| Text limits | Character counts | **Byte** counts (multibyte characters cost more) |
| Auth | One token | Developer token + OAuth refresh token + `login_customer_id` |

None of these are hard once you know them. All of them silently waste an afternoon the first time. The deterministic script layer exists to encode each one exactly once so the agent never re-derives it.

## The Google Ads Hierarchy

You cannot create "an ad." You create a tree, bottom dependency first:

```text
CampaignBudget          # amount_micros, delivery_method, explicitly_shared
  └─ Campaign           # PAUSED, channel type, bidding strategy
      └─ AdGroup        # the bid container
          └─ AdGroupCriterion   # keywords + match types, negative keywords
          └─ AdGroupAd          # the responsive search ad (assets)
```

My scripts build this with **sequential mutate calls**: create the budget, read back its `resource_name`, pass that into the campaign, read back the campaign's `resource_name`, and so on down the tree. Each level is its own `MutateXxx` call with an operation object whose `.create` field you populate.

The API _also_ supports building the whole tree in one atomic mutate using negative temporary resource names (`customers/{id}/campaignBudgets/-1`, then `-2` for the campaign that references it). I do sequential calls instead: a per-resource call gives a cleaner failure point, and because the campaign is created PAUSED anyway, atomicity buys little. The trade-off is more round-trips for clearer errors — worth it when an agent is assembling the arguments.

## The Workflow

### Step 1: Authenticate with three secrets, not one

The Google Ads client wants a developer token, a full OAuth pair with a refresh token, and the manager account id. The script loads them from `.env` and builds the client once:

```python
config = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
    "use_proto_plus": True,
}
client = GoogleAdsClient.load_from_dict(config)
```

`login_customer_id` is the manager (MCC) account that has access to the account you are mutating. For a standalone account it equals the working customer id. Get it wrong and you get `not_a_manager`. The refresh token is the part that rots: an `invalid_grant` means it expired or was revoked, and re-auth is a manual OAuth flow you cannot automate away.

### Step 2: Create the budget in micros

This is the one number that can hurt you. Google Ads money is in micros, so you multiply by a million:

```python
budget = operation.create
budget.amount_micros = int(daily_budget * 1_000_000)   # $10/day -> 10_000_000
budget.delivery_method = client.enums.BudgetDeliveryMethodEnum.STANDARD
budget.explicitly_shared = False
```

Forget the `* 1_000_000` and you set a budget of \$0.00001 — the campaign just never delivers and you waste a day wondering why. Pass a currency amount where micros belong from a different code path and you can do the opposite. The unit is off from human intuition by six zeros, every time. Always cast with `int(...)` so float precision does not shave the last digits.

### Step 3: Create the campaign — PAUSED, and mind the required fields

```python
campaign.status = client.enums.CampaignStatusEnum.PAUSED
campaign.advertising_channel_type = client.enums.AdvertisingChannelTypeEnum.SEARCH
campaign.contains_eu_political_advertising = (
    client.enums.EuPoliticalAdvertisingStatusEnum
    .DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING
)
```

That last field is not optional. As of API v23, `contains_eu_political_advertising` is required, and a script written against an older version breaks the day you upgrade with a cryptic "required field" error. This is the kind of moving target the script layer is _for_: pin it once, in code, with a comment saying why.

Bidding strategy is its own object on the campaign — there is no single "bid" field. You pick one:

```python
campaign.target_cpa.target_cpa_micros = int(target_cpa * 1_000_000)   # Target CPA
# or
campaign.target_spend.cpc_bid_ceiling_micros = int(ceiling * 1_000_000)  # Max clicks
```

### Step 4: Keywords and match types

Search campaigns live or die on keyword match types. Each keyword is an `AdGroupCriterion`:

```python
criterion.keyword.text = "cat health tracking app"
criterion.keyword.match_type = client.enums.KeywordMatchTypeEnum.PHRASE  # or BROAD, EXACT
```

- **BROAD** — matches related searches in any order; cheap reach, expensive waste
- **PHRASE** — matches the phrase in order, with words allowed around it
- **EXACT** — matches only that term and close variants

Negative keywords are how you stop paying for the wrong clicks, and they live at the **campaign** level with a `negative` flag (conventionally BROAD):

```python
criterion.campaign = campaign_resource_name
criterion.negative = True
criterion.keyword.text = "free"        # don't pay for "free <product>" searches
criterion.keyword.match_type = client.enums.KeywordMatchTypeEnum.BROAD
```

This is exactly the kind of judgment the skill layer is good at: ask the agent to propose negatives like `free`, `dog`, `jobs` for a paid cat-app — and a script that writes them deterministically.

### Step 5: The ad — responsive search ads, with byte limits

Here is a Google quirk that surprises everyone: ad text limits are in **bytes, not characters**. A responsive search ad allows up to 15 headlines at 30 bytes each and 4 descriptions at 90 bytes each. In ASCII, 30 bytes is 30 characters. In UTF-8, an accented letter or emoji is 2–4 bytes, and a Korean character is 3 — so a 10-character Korean headline already hits the 30-byte cap. The fix is a byte-aware truncator, not Python's `len()` (which counts characters):

```python
for text in headlines[:15]:
    asset = client.get_type("AdTextAsset")
    asset.text = truncate_to_byte_limit(text, 30)   # bytes, not chars
    ad.responsive_search_ad.headlines.append(asset)
```

The copy-generation skill writes the headlines; the script guarantees they fit the byte budget before they ever reach the API.

### Step 6: Everything is created PAUSED — the approval gate

No script in the system activates a campaign. Creation always sets `PAUSED`. The reason is sharper on Google than anywhere else: the agent chose a budget, that budget is in micros, and an off-by-a-million is one cast away. PAUSED means I read the budget, the keywords, the negatives, and the headlines back out before a single impression serves. The automation assembles; I flip the switch.

### Step 7: Read it back with GAQL

Google has no flat "give me my numbers" endpoint. You query with GAQL and stream the results:

```python
query = """
    SELECT
        campaign.id,
        campaign.name,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.cost_per_conversion
    FROM campaign
    WHERE segments.date DURING LAST_7_DAYS
      AND campaign.status != 'REMOVED'
    ORDER BY metrics.impressions DESC
"""
for batch in ga_service.search_stream(customer_id=cid, query=query):
    for row in batch.results:
        cost = row.metrics.cost_micros / 1_000_000   # micros, again
```

Two things bite here. Enum literals must be **quoted** (`'REMOVED'`, not `REMOVED`) or the query errors. And cost metrics come back in micros, so you divide by a million on the way out just like you multiplied on the way in.

### Step 8: Evaluate and recommend — never autopilot

A reporting skill pulls the GAQL numbers and an evaluation skill reads them with simple, legible rules:

- 100+ clicks and 0 conversions → recommend **pause**
- ROAS above target × 1.25 → recommend **+20% budget**
- ROAS below target × 0.75 → recommend **−20% budget**

Crucially, these are _recommendations_, written to a report for me to read. The loop closes with a human, the same as activation. The agent never raises a budget on its own.

## Example Project Structure

Genericized, but this is the real shape of the Google side:

```text
marketing-agent/
  CLAUDE.md                      # workflow map + hard rules (campaigns are PAUSED)
  .env                           # developer token, OAuth, login_customer_id
  .claude/skills/
    google-ads-campaign-creator/SKILL.md   # builds the hierarchy
    google-copy-generator/SKILL.md         # RSA headlines/descriptions
    google-ads-reporter/SKILL.md           # GAQL -> markdown report
    google-ads-bid-optimizer/SKILL.md      # ROAS/CPA -> +/-20% recommendations
    google-evaluate-campaign/SKILL.md      # KPI trend read
    google-env-setup/SKILL.md              # OAuth / MCC validation
  src/
    ads_client.py                # GoogleAdsClient init + auth diagnostics
    campaign_manager.py          # budget -> campaign -> ad group -> keywords -> ad
    bidding_optimizer.py         # performance -> recommendations
    reporting.py                 # GAQL queries -> reports
    text_utils.py                # truncate_to_byte_limit (UTF-8 byte counting)
  assets/brands/<id>/
    profile.json                 # product + target persona
    guidelines.md                # tone the copy skill reads
```

`campaign_manager.py` owns the whole mutate sequence and the micros math. `text_utils.py` exists solely because byte limits are not character limits. And `CLAUDE.md` is the constitution: it tells the agent the order of operations and the non-negotiable rule that campaigns are created PAUSED.

## A Real Project Note

The honest part: not one of these failures was the model being dumb. Every one was the Google Ads API being exacting, and every fix was to pin the rule in the script so the agent could not get it wrong twice.

- **The required field that appeared.** After bumping the client library, campaign creation started failing on a missing `contains_eu_political_advertising`. It became required in v23. The model would never guess a brand-new required enum; the script encodes it.
- **Bytes, not characters.** A Korean headline that read as 11 characters was rejected for exceeding 30 bytes (11 × 3 = 33). `len()` lies here. `truncate_to_byte_limit` was the fix, and it matters for any multibyte copy — emoji included.
- **`login_customer_id` and the MCC.** Pointing it at the working account instead of the manager account returns `not_a_manager`. One value, encoded once, end of guessing.
- **Quoted enums in GAQL.** `WHERE campaign.status != REMOVED` fails; `!= 'REMOVED'` works. GAQL looks like SQL right up until the literal quoting bites you.
- **App campaign constraints.** App ads only accept 1:1 and 1.91:1 images (others throw `ASPECT_RATIO_NOT_ALLOWED`), allow one app ad per ad group, cannot be removed directly (`AD_TYPE_CANNOT_BE_REMOVED` — you delete the ad group), and the ad group name stays reserved even after it is removed.
- **The refresh token that rotted.** An `invalid_grant` out of nowhere meant the OAuth refresh token had expired. There is no automating around that — re-auth by hand and move on.

None of these are AI problems. They are integration problems, and the two-layer design contains them: each quirk got fixed in the script layer once, instead of being re-litigated by the model on every call. The structure protects you, not the model — the same lesson I keep relearning [building small web apps with Claude Code](/how-i-use-claude-code-to-build-small-web-apps/).

## Common Mistakes

- **Treating budgets as currency.** It is micros. `int(amount * 1_000_000)` or you are off by a million.
- **Counting characters for ad text.** It is bytes. Multibyte copy hits the cap early.
- **Letting the agent activate campaigns.** Create PAUSED, read it back, then a human flips it. Always.
- **Hardcoding the API version's required fields from memory.** Pin them in code with a comment; they move (v23's EU political flag).
- **Unquoted enum literals in GAQL.** `'REMOVED'`, not `REMOVED`.
- **Pointing `login_customer_id` at the wrong account.** It is the manager (MCC), not the working customer.

## Checklist

- [ ] Budgets set with `int(amount * 1_000_000)`; values read back before activation
- [ ] Campaigns created `PAUSED`, activated only by a human
- [ ] Required campaign fields (e.g. EU political advertising) pinned in code with a comment
- [ ] Ad text truncated by **byte** length, not character length
- [ ] Keyword match types chosen deliberately; negative keywords set at campaign level
- [ ] GAQL enum literals quoted; cost metrics divided by 1,000,000
- [ ] Auth uses developer token + OAuth refresh token + `login_customer_id`
- [ ] Bid changes are recommendations a human approves, not autopilot
- [ ] Secrets in `.env`, never committed

## When Not to Use This Approach

If you run one Search campaign and rarely touch it, open Google Ads and click — this is over-engineering. The hierarchy, the micros math, and the GAQL plumbing only pay off when you run the same build-and-measure loop repeatedly across several products and the setup busywork is the bottleneck. And if you cannot yet judge whether a keyword set is sane or whether last week's CPA was good, automate the mechanics but keep both hands on the approval gate. The system removes typing; it does not remove the need to know what good looks like.

## FAQ

**Q. What is a micros budget in the Google Ads API?**

A. Google Ads expresses all money in micros, where 1,000,000 micros equals one unit of your account currency. A \$10 daily budget is `amount_micros = 10000000`. Forgetting the multiplier is the classic footgun, which is exactly why every campaign should be created PAUSED so you can read the budget back before it spends.

**Q. Do I need GAQL to automate Google Ads reporting?**

A. Yes. Google Ads has no flat insights endpoint like Meta. You read performance with GAQL (Google Ads Query Language), a SQL-like syntax: `SELECT metrics.clicks, metrics.cost_micros FROM campaign WHERE segments.date DURING LAST_7_DAYS`. Enum literals must be quoted, and cost fields come back in micros.

**Q. Why create Google Ads campaigns in a PAUSED state?**

A. Because the agent picks the budget and the budget is in micros, a single off-by-a-million error can create a live overspend. Creating PAUSED means nothing delivers until a human reads the generated budget, keywords, and copy and flips it on. The automation builds the campaign; it never decides to spend.

**Q. What auth does the Google Ads API need beyond an API key?**

A. Three things, not one: a developer token (account-level), an OAuth 2.0 client id/secret with a long-lived refresh token, and a `login_customer_id` for the manager (MCC) account. An `invalid_grant` error means the refresh token expired or was revoked and you have to re-authenticate by hand.

## Related Articles

- [Automating Meta Ads with Claude Code: A Deep Dive](/meta-ads-api-automation-with-claude-code/) — the companion deep-dive on the other platform
- [How I Automated Ad Campaigns with Claude Code](/how-i-automated-ad-campaigns-with-claude-code/) — the two-layer foundation this post builds on
- [How I Run a Claude Code Writing Project Like Software](/claude-code-writing-project-like-software/)
- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/)
- [More posts tagged AI coding](/tags/ai-coding/)
- [내가 AI로 블로그 글을 대량생산하는 워크플로우 (Korean)](/how-to-make-content-using-ai/)

_Last updated: 2026-06-25. Built against `google-ads-python` v31 (June 2026); field requirements like the EU political advertising flag move between API versions, so check the release notes when you upgrade._
