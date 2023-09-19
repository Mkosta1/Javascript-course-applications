
import { ICompetitionData } from "../Competition/ICompetitionData";

export interface ILocationData {
    id: string,
    name: string,
    address: string,
    competition: ICompetitionData[]
}