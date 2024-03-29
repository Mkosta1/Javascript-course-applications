
import { ICompetitionData } from "../../dto/Competition/ICompetitionData";
import { ICompetitionRemoveData } from "../../dto/Competition/ICompetitionRemoveData";
import { IJWTResponse } from "../../dto/IJWTResponse";
import { BaseEntityService } from "../BaseEntityService";

export class CompetitionRemoveService extends BaseEntityService<ICompetitionRemoveData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/Competition', setJwtResponse);
    }


    async deleteComp(jwt: IJWTResponse, data: ICompetitionRemoveData): Promise<true | undefined> {
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