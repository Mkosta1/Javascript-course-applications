
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";
import { IJWTResponse } from "../../dto/IJWTResponse";
import { BaseEntityService } from "../BaseEntityService";

export class CompetitionService extends BaseEntityService<ICompetitionData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/Competition?api-version=1', setJwtResponse);
    }


    async postComp(jwt: IJWTResponse, data: ICompetitionData): Promise<true | undefined> {
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