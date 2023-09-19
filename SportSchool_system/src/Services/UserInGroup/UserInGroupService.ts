
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IUserInGroupData } from "../../dto/UserInGroup/IUserInGroupData";
import { BaseEntityService } from "../BaseEntityService";

export class UserInGroupService extends BaseEntityService<IUserInGroupData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/UserInGroup?api-version=1', setJwtResponse);
    }



}