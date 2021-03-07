import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {responses} from "../../common/responses";
import { Team, Person, MinPerson, TeamsResponse } from '../../common/interfaces';
import {getAllPeople, getAllTeams, getPerson} from "../../common/data";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult>  => {
    console.log("Incoming event:");
    console.log(JSON.stringify(event));

    try {
        const teams: Team[] = await getAllTeams();
        const allPeople: Person[] = await getAllPeople();
        console.log(teams);
        for await (const team of teams) {
            console.log(team);

            const people: string[] = team.people as string[];
            console.log(people);

            const minPeople: MinPerson[] = [];
            for await (const id of people) {
                //get person
                let fullPerson: Person | undefined;

                allPeople.forEach((item)=>{
                    if(item.ID === id) fullPerson = item;
                });

                if(fullPerson) {
                    console.log(fullPerson);
                    const minPerson: MinPerson = {
                        ID: fullPerson.ID,
                        name: fullPerson.name,
                        role: fullPerson.role,
                        imageUrl: fullPerson.profilePicture,
                        slackID: fullPerson.slackID.replace(" ", "-"),
                        primaryTeam: fullPerson.primaryTeam
                    };
                    minPeople.push(minPerson);
                }
            }
            team.people = minPeople;
            console.log(team);
        }
        console.log(teams);

        const res: APIGatewayProxyResult = responses.ok;
        res.body = JSON.stringify({ data: teams } as TeamsResponse);
        return res;

    } catch (error) {
        console.log(error)
        const res: APIGatewayProxyResult = responses.serverError;
        res.body = error;
        return res;
    }
};
