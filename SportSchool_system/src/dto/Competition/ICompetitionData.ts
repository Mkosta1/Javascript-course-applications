import { IUserAtCompetitionData } from "../UserAtCompetition/IUserAtCompetitionData";

export interface ICompetitionData {
    id: string,
    name: string,
    groupSize: number,
    since: Date | null,
    until: Date | null,
    locationId: string,
    userAtCompetition: IUserAtCompetitionData[]
    
}