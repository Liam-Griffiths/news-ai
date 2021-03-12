import {MapObj, SourceList} from "./interfaces";

export const devConfig: MapObj = {
    peopleTable: "teamx-dev-people",
    teamTable: "teamx-dev-team"
}

export const prodConfig: MapObj = {
    peopleTable: "teamx-prod-people",
    teamTable: "teamx-prod-team"
}

export const sources: SourceList = {
    mainstream: [
        { title:"Guardian", url:"https://theguardian.com/uk/rss" },
        { title:"Daily Mail", url:"https://dailymail.co.uk/home/index.rss" },
        { title:"Telegraph", url:"https://telegraph.co.uk/rss" },
        { title:"Mirror", url:"https://mirror.co.uk/rss.xml" },
        { title:"Metro", url:"https://metro.co.uk/feed/" },
        { title:"Sun", url:"https://thesun.co.uk/feed" },
        { title:"BBC", url:"http://feeds.bbci.co.uk/news/world/rss.xml" },
        { title:"CNN", url:"http://rss.cnn.com/rss/cnn_latest.rs" },
        { title:"Fox News", url:"http://feeds.foxnews.com/foxnews/latest" },
        { title:"NY Times", url:"https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml" },
        { title:"Breaking911", url:"https://rss.app/feeds/oVU7bONq0Z6ZWv5I.xml"},
        { title:"Al Jazeera", url:"http://www.aljazeera.com/xml/rss/all.xml" },
        { title:"Yahoo News", url:"http://yahoo.com/news/rss/world" },
        { title:"Reddit News", url:"https://www.reddit.com/r/worldnews/.rss" },
        { title:"Washington Post", url:"http://feeds.washingtonpost.com/rss/world" },
        { title:"CNBC", url:"https://www.cnbc.com/id/100727362/device/rss/rss.html" },
        { title:"RT", url:"https://www.rt.com/rss/news/" },
        { title:"NPR", url:"http://www.npr.org/rss/rss.php?id=1004" },
        { title:"ABC News", url:"http://abcnews.go.com/abcnews/internationalheadlines" },
        { title:"CBS News", url:"https://www.cbsnews.com/latest/rss/world" },
        { title:"Independent", url:"http://www.independent.co.uk/news/world/rss" },
        { title:"LA Times", url:"https://www.latimes.com/world/rss2.0.xml" },
        { title:"Coin Telegraph", url:"https://cointelegraph.com/feed" },
        { title:"Bitcoin", url:"https://news.bitcoin.com/feed/" },
        { title:"MarketWatch", url:"http://feeds.marketwatch.com/marketwatch/topstories/" },
        { title:"Investing", url:"https://www.investing.com/rss/news.rss" },
        { title:"Motley Fool", url:"https://www.fool.co.uk/feed/" },
        { title:"FT", url:"https://www.ft.com/?format=rss" },
        { title:"CryptoNews", url:"https://cryptonews.com/news/feed" },
        { title:"4chan /biz/", url:"https://boards.4channel.org/biz/index.rss" }
    ],
    breaking:[
        {title:"Breaking911", url:"https://rss.app/feeds/oVU7bONq0Z6ZWv5I.xml"}
    ]
}