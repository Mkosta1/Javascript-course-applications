import { ICompetition } from "../domain/ICompetition";
import { BaseEntityService } from "./BaseEntityService";

export class CompetitionService extends BaseEntityService<ICompetition> {
    constructor() {
        super('v1/Competition');
    }
}