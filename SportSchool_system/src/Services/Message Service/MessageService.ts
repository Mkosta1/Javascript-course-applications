
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ILocationData } from "../../dto/Location/ILocationData";
import { IMessageData } from "../../dto/Message/IMessageData";
import { BaseEntityService } from "../BaseEntityService";

export class MessageService extends BaseEntityService<IMessageData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/Message?api-version=1', setJwtResponse);
    }


    async postMessage(jwt: IJWTResponse, data: IMessageData): Promise<true | undefined> {
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