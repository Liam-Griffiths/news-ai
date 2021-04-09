export interface Key {
    ID: string;
}

export interface MapObj {
    [key: string]: string;
}

export interface Headlines {
    lead: Headline;
    breaking?: Headline;
    headlines?: Headline[];
};

export interface Headline {
    text: string;
    link: string;
    topic: string;
}

export interface NewsAPIResponse {
    status:       string;
    totalResults: number;
    articles:     NewsAPIArticle[];
}

export interface NewsAPIArticle {
    source:      NewsAPISource;
    author:      null | string;
    title:       string;
    description: string;
    url:         string;
    urlToImage:  null | string;
    publishedAt: Date;
    content:     string;
}

export interface NewsAPISource {
    id:   null | string;
    name: string;
}

export interface SourceList {
    mainstream: SourceItem[];
    breaking: SourceItem[];
}
export interface SourceItem{
    title: string;
    url: string;
}

export interface RawHeadline {
    headline: string;
    url: string;
    topics: string[];
}

export interface TopicHeadline {
    topic: string;
    headlines: string[];
    url: string;
}
