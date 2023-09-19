
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ILocationData } from "../../dto/Location/ILocationData";
import { BaseEntityService } from "../BaseEntityService";

export class LocationService extends BaseEntityService<ILocationData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/Location?api-version=1', setJwtResponse);
    }


    async postLocation(jwt: IJWTResponse, data: ILocationData): Promise<true | undefined> {
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