import OpenAI from 'openai';
import { GLM4FlashConfig } from '../config/config';

export const LLMClient = new OpenAI({
    baseURL: GLM4FlashConfig.BaseURI,
    apiKey: GLM4FlashConfig.APIKEY,
    dangerouslyAllowBrowser:true,
});