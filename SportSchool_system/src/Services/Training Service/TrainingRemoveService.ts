
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ILocationData } from "../../dto/Location/ILocationData";
import { ILocationRemoveData } from "../../dto/Location/ILocationRemoveData";
import { ITrainingRemoveData } from "../../dto/Training/ITrainingRemoveData";
import { BaseEntityService } from "../BaseEntityService";

export class TrainingRemoveService extends BaseEntityService<ITrainingRemoveData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/Training', setJwtResponse);
    }


    async deleteTraining(jwt: IJWTResponse, data: ITrainingRemoveData): Promise<true | undefined> {
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

    async updateTraining(jwt: IJWTResponse, data: ITrainingRemoveData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.put(
                data.id + "?api-version=1",
                data,
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