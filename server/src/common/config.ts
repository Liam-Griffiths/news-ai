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
        { title:"Fox News", url:"http://feeds.foxnews.com/foxnews/latest" }
    ],
    breaking:[
        {title:"Breaking911", url:"https://rss.app/feeds/oVU7bONq0Z6ZWv5I.xml"}
    ]
}