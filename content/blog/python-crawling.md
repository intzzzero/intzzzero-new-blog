---
title: "Python Crawling TIL 01"
date: "2022-08-18"
update: "2022-08-18"
draft: false
category: "Python"
path: "/blog/python-crawling-til-01"
---

## 크롤링이란
크롤링(crawling) 혹은 스크레이핑(scraping)은 웹 페이지를 그대로 가져와서 거기서 데이터를 추출해 내는 행위다. 크롤링하는 소프트웨어는 크롤러(crawler)라고 부른다.

## 주로 사용하는 라이브러리 및 조합
파이썬으로 크롤링을 할 때에는 주로 두 종류의 조합을 사용한다. 첫째, beautifulSoup과 requests. 둘째, selenium과 webdriver

### selenium + webdriver
selenium의 탄생 목적은 웹페이지의 테스트 자동화였다. 따라서 실제 사람이 웹페이지의 요소를 조작하는 방식 그대로 실행된다.
webdriver로 실행한 브라우저에서 URL로 웹페이지에 접근하여 XPATH를 통해 요소를 선택하고 click 등의 액션을 취하는 등의 액션을 자동으로 행한다.

### beautifulsoup + requests
beautifulsoup은 애초에 크롤링을 목적으로 탄생했다. requests를 통해 특정 웹페이지의 html을 요청하여 받아온 후 beautifulsoup으로 해당 html 문서를 파싱한다. 그리고, 태그에 직접 접근하여 원하는 정보를 가져오는 방식이다.
selenium처럼 렌더링 후 요소에 접근하고 액션을 실행하는 방식이 아니라 text로써의 html문서 자체에서 정보를 가져오기 때문에 selenium과 같이 쓰는 경우도 있다.

### selenium + webdriver + beautifulsoup
selenium과 beautifulsoup의 장점을 두루 사용하기 위한 조합이다. selenium을 통해 검색어 입력, 버튼 클릭 등의 액션을 실행하고, beautifulsoup을 통해 html 요소에서 쉽게 접근할 수 있다.

## 주의사항
beautifullsoup은 http 요청을 통해 html 문서만을 받아와 파싱한다. 이 말은 곧 JavaScript로 뒤늦게 받아와 변경되는 내용은 크롤링할 수 없다는 말이다. 이런 경우엔 selenium을 사용하여 렌더링이 완료된 DOM에 접근하여 크롤링을 해야 한다.

## practice
```python
from selenium import webdriver
from bs4 import BeautifulSoup
import logging
import time

logging.basicConfig(
    format='%(asctime)s %(levelname)s:%(message)s', level=logging.INFO
)


class TestCrawler:

    def __init__(self, url, keywords=[]):
        self.url = url
        self.searched_keywords = []
        self.keywords_to_search = keywords

    def add_keyword_and_url_to_used(self, keyword):
        if keyword not in self.searched_keywords and keyword not in self.keywords_to_search:
            self.keywords_to_search.append(keyword)

    def crawl(self, url, keyword):
        option = webdriver.ChromeOptions()
        option.add_argument("disable-infobars")
        option.add_argument("disable-extensions")
        option.add_argument('disable-gpu')
        # option.add_argument('headless')

        driver = webdriver.Chrome(
            '/Users/syjeong/development/python/bot/chromedriver', options=option)

        driver.get(url)

        x_path_btn = '//*[@id="_verticalGnbModule"]/div/div[2]/div/div[2]/div/div[2]/form/fieldset/div/button[2]'
        x_path_searchbox = '//*[@id="_verticalGnbModule"]/div/div[2]/div/div[2]/div/div[2]/form/fieldset/div/input'

        searchbox = driver.find_element_by_xpath(x_path_searchbox)
        btn = driver.find_element_by_xpath(x_path_btn)
        searchbox.click()

        searchbox.send_keys(keyword)
        btn.click()

        time.sleep(1)

        html = driver.page_source
        data = BeautifulSoup(html, 'html.parser')

        parent = data.select_one(
            '#__next > div > div.style_container__UxP6u > div.style_inner__i4gKy > div.style_content_wrap__Cdqnl > div.style_content__xWg5l > ul')
        chidren = parent.select(
            'div > div > li > div > div:first-child > div > a')

        links = []
        for child in chidren[:5]:
            link = child['href']
            links.append(link)

        logging.info(f'Crawling : {keyword} - {len(links)} 개')

    def run(self):
        while self.keywords_to_search:
            url = self.url
            keyword = self.keywords_to_search.pop(0)
            try:
                self.crawl(url, keyword)
            except Exception:
                logging.exception(f'Failed to crawl : {keyword} : {url}')
            finally:
                self.searched_keywords.append(keyword)


TestCrawler('https://shopping.naver.com/home/p/index.naver',
            keywords=['츄르', '찹앤찹']).run()

logging.info(f'End of crawl')

```

