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