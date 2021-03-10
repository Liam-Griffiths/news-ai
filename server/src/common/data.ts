import {
    getConfig,
    loadAllGeneric,
    loadIDGeneric,
    loadIDBatchGeneric,
    loadFieldGeneric,
    commitGeneric
} from "./platform";
import {MapObj} from "./interfaces";

/*
export const getAllPeople = async (env?: string): Promise<Person[]> => {
    const config: MapObj = getConfig(env);

    return await loadAllGeneric(config.peopleTable) as Person[];
};

export const getAllTeams = async (env?: string): Promise<Team[]> => {
    const config: MapObj = getConfig(env);

    return await loadAllGeneric(config.teamTable) as Team[];
};

export const getPerson = async (id: string, env?: string): Promise<Person> => {
    const config: MapObj = getConfig(env);

    return await loadIDGeneric(config.peopleTable, id) as Person;
};

export const getBatchPersons = async (idArr: string[], env?: string): Promise<Person[]> => {
    const config: MapObj = getConfig(env);

    return await loadIDBatchGeneric(config.peopleTable, idArr) as Person[];
};

export const getBatchTeams = async (idArr: string[], env?: string): Promise<Team[]> => {
    const config: MapObj = getConfig(env);

    return await loadIDBatchGeneric(config.teamTable, idArr) as Team[];
};

export const getSlackPerson = async (id: string, env?: string): Promise<Person> => {
    const config: MapObj = getConfig(env);

    return await loadFieldGeneric(config.peopleTable, "slackID", id) as Person;
};

export const getTeam = async (id: string, env?: string): Promise<Team> => {
    const config: MapObj = getConfig(env);

    return await loadIDGeneric(config.teamTable, id) as Team;
};

export const commitPerson = async (data: Person, env?: string): Promise<boolean> => {
    const config: MapObj = getConfig(env);

    return await commitGeneric(config.peopleTable, data);
};

export const commitTeam = async (data: Team, env?: string): Promise<boolean> => {
    const config: MapObj = getConfig(env);

    return await commitGeneric(config.teamTable, data);
};
*/
