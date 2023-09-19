
import { IUserAtCompetitionData } from "../../dto/UserAtCompetition/IUserAtCompetitionData";
import { IJWTResponse } from "../../dto/IJWTResponse";
import { BaseEntityService } from "../BaseEntityService";
import { IUserAtCompetitionDataRemove } from "../../dto/UserAtCompetition/IUserAtCompetitionDataRemove";

export class UserAtCompetitionServiceRemove extends BaseEntityService<IUserAtCompetitionDataRemove> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/UserAtCompetition', setJwtResponse);
    }


    async deleteUserComp(jwt: IJWTResponse, data: IUserAtCompetitionDataRemove): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.delete(
                data.id + "?api-version=1",
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt.jwt
                    }
                }
            );

            if (response.status === 204) {
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }
}