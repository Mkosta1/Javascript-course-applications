
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ISportsSchoolData } from "../../dto/SportsSchool/ISportsSchoolData";
import { BaseEntityService } from "../BaseEntityService";

export class SportsSchoolService extends BaseEntityService<ISportsSchoolData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/SportSchool?api-version=1', setJwtResponse);
    }
}