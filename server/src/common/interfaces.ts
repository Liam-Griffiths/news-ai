export interface Key {
    ID: string;
}

export interface MapObj {
    [key: string]: string;
}

export interface Headlines {
    lead: Headline;
    breaking: Headline;
    headlines: Headline[];
};

export interface Headline {
    text: string;
    link: string;
}

export interface NewsAPIResponse {
    status:       string;
    totalResults: number;
    articles:     Article[];
}

export interface Article {
    source:      Source;
    author:      null | string;
    title:       string;
    description: string;
    url:         string;
    urlToImage:  null | string;
    publishedAt: Date;
    content:     string;
}

export interface Source {
    id:   null | string;
    name: string;
}
