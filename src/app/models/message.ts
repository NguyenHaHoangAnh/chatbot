import { BaseMessage } from "./base-message";

export class Message extends BaseMessage {
    history_data: any[] = [];
    type_llm: string = 'gpt';
}