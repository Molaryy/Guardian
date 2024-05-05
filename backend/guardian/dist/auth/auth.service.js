"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const xumm_1 = require("xumm");
const dotenv = require("dotenv");
dotenv.config();
let AuthService = class AuthService {
    async sendPayload() {
        console.log(process.env.API_KEY);
        try {
            const xumm = new xumm_1.Xumm(process.env.API_KEY, process.env.SECRET_KEY);
            const pong = await xumm?.ping();
            const payload = await xumm.payload?.create({
                custom_meta: {
                    instruction: "Sign request from " + pong?.application.name,
                },
                txjson: {
                    TransactionType: "SignIn",
                },
            });
            console.log(payload);
            return payload;
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map