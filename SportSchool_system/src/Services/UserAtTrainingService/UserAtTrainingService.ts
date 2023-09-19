
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IUserAtTrainingData } from "../../dto/UserAtTraining/IUserAtTrainingData";
import { BaseEntityService } from "../BaseEntityService";

export class UserAtTrainingService extends BaseEntityService<IUserAtTrainingData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/UserAtTraining?api-version=1', setJwtResponse);
    }


    async postTraining(jwt: IJWTResponse, data: IUserAtTrainingData): Promise<true | undefined> {
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