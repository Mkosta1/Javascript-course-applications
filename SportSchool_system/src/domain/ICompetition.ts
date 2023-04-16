import { IBaseEntity } from "./IBaseEntity";

export interface ICompetition extends IBaseEntity {

    name: string,
    groupSize: number,
    since: Date,
    until: Date,
    locationId: string,

}