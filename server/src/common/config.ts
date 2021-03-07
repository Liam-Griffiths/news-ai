export interface MapObj {
    [key: string]: string;
}

export const devConfig: MapObj = {
    peopleTable: "teamx-dev-people",
    teamTable: "teamx-dev-team"
}

export const prodConfig: MapObj = {
    peopleTable: "teamx-prod-people",
    teamTable: "teamx-prod-team"
}