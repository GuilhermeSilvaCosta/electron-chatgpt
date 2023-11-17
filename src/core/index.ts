import { IpcMainEvent } from "electron";
import { Configuration, OpenAIApi } from 'openai';

type CompletionHandler = (e: Electron.IpcMainInvokeEvent, p: string) => Promise<AIResponse>;

console.log('process.env.OPENAI_SECRET_KEY', process.env.OPENAI_SECRET_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
});
  
const openai = new OpenAIApi(configuration);

export const getCompletion: CompletionHandler = async (e, prompt: string) => {
    console.log(`FROM MAIN PROCESS: ${prompt}`);
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0.7,
            max_tokens: 1024
        });
    
        return {message: completion.data.choices[0].text};
    } catch {
        return {message: "", error: "Oops something went wrong!"};
    }
};