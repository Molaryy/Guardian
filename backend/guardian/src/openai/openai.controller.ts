import {Controller, Post, Body } from '@nestjs/common';
import {OpenaiService} from "./openai.service";
import { CreateNFTDto } from './create-nft.dto';
import { wallet } from 'xrpl';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) {}

    @Post("/image")
    createNFTFromImage(@Body() createNFTDto: CreateNFTDto) {
        console.log(createNFTDto);
        return this.openaiService.createNFTFromImage(createNFTDto, wallet);
    }
}
