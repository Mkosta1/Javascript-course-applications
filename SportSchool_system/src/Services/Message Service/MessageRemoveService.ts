
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IMessageData } from "../../dto/Message/IMessageData";
import { IMessageRemoveData } from "../../dto/Message/IMessageRemoveData";
import { BaseEntityService } from "../BaseEntityService";

export class MessageRemoveService extends BaseEntityService<IMessageRemoveData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('v1/Message', setJwtResponse);
    }


    async deleteMessage(jwt: IJWTResponse, data: IMessageRemoveData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.delete(
                data.id + '?api-version=1',
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

    async updateMessage(jwt: IJWTResponse, data: IMessageData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.put(
                data.id + '?api-version=1',
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