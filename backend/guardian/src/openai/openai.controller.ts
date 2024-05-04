import {Controller, Post} from '@nestjs/common';
import {OpenaiService} from "./openai.service";

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) {}

    @Post("/image")
    transform_image_to_nft() {
        return "salut";
    }
}
