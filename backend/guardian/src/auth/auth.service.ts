import { Injectable } from '@nestjs/common';
import { Xumm } from 'xumm';
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class AuthService {
    async sendPayload () {
        console.log(process.env.API_KEY);
        try {
            const xumm = new Xumm(process.env.API_KEY, process.env.SECRET_KEY);
            const pong = await xumm?.ping()
            const payload = await xumm.payload?.create({
                custom_meta: {
                    instruction: "Sign request from " + pong?.application.name,
                },
                txjson: {
                    TransactionType: "SignIn",
                },
            });
            console.log(payload)
            return payload
        } catch (error: any) {
            console.error(error);
        }
    }
}
