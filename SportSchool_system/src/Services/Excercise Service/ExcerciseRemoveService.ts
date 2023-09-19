
import { IExcerciseRemoveData } from "../../dto/Excercise/IExcerciseRemove";
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ILocationData } from "../../dto/Location/ILocationData";
import { ILocationRemoveData } from "../../dto/Location/ILocationRemoveData";
import { BaseEntityService } from "../BaseEntityService";

export class ExcerciseRemoveService extends BaseEntityService<IExcerciseRemoveData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/Excercise', setJwtResponse);
    }


    async deleteExcercise(jwt: IJWTResponse, data: IExcerciseRemoveData): Promise<true | undefined> {
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