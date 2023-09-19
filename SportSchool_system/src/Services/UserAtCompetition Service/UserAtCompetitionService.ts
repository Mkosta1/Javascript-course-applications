
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import { IJWTResponse } from "../../dto/IJWTResponse";
import { BaseEntityService } from "../BaseEntityService";
import { IUserAtCompetitionDataRemove } from "../../dto/UserAtCompetition/IUserAtCompetitionDataRemove";

export class UserAtCompetitionService extends BaseEntityService<IUserAtCompetitionData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/UserAtCompetition?api-version=1', setJwtResponse);
    }


    async postComp(jwt: IJWTResponse, data: IUserAtCompetitionData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.post(
                '', 
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt.jwt
                    }
                }
            );

            if (response.status === 201) {
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

}