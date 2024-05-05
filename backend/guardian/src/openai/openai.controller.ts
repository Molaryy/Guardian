import {Controller, Post, Body } from '@nestjs/common';
import {OpenaiService} from "./openai.service";
import createNFTDto from "./creat-nft.dto";
import { Wallet } from 'xrpl';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) {}

    @Post("/image")
    createNFTFromImage(@Body() createNFTDto: createNFTDto) {
        console.log(createNFTDto);
        return this.openaiService.createNFTFromImage(createNFTDto, Wallet);
    }
}
