import { IpcMainEvent } from "electron";

type Listener = (event: IpcMainEvent, ...args: any[]) => void;

export const getCompletion: Listener = (e, prompt: string) => {
    console.log(`FROM MAIN PROCESS: ${prompt}`);
};