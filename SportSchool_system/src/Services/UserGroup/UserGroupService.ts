
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IUserGroupData } from "../../dto/UserGroup/IUserGroupData";
import { BaseEntityService } from "../BaseEntityService";

export class UserGroupService extends BaseEntityService<IUserGroupData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/UserGroup?api-version=1', setJwtResponse);
    }


}