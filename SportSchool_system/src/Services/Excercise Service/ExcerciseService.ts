
import { IExcerciseData } from "../../dto/Excercise/IExcerciseData";
import { IJWTResponse } from "../../dto/IJWTResponse";
import { BaseEntityService } from "../BaseEntityService";

export class ExcerciseService extends BaseEntityService<IExcerciseData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/Excercise?api-version=1', setJwtResponse);
    }


    async postExcercise(jwt: IJWTResponse, data: IExcerciseData): Promise<true | undefined> {
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