import { OpenaiService } from "./openai.service";
export declare class OpenaiController {
    private readonly openaiService;
    constructor(openaiService: OpenaiService);
    transform_image_to_nft(): string;
}
