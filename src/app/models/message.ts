import { BaseMessage } from "./base-message";

export class Message extends BaseMessage {
    message!: string;
    history_data: any[] = [];
    type_llm: string = 'gpt';
}