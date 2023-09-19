
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ILocationData } from "../../dto/Location/ILocationData";
import { ITrainingData } from "../../dto/Training/ITrainingData";
import { BaseEntityService } from "../BaseEntityService";

export class TrainingService extends BaseEntityService<ITrainingData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/Training?api-version=1', setJwtResponse);
    }


    async postTraining(jwt: IJWTResponse, data: ITrainingData): Promise<true | undefined> {
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