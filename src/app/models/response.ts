import { Message } from "./message";

export class Response extends Message {
    chart?: any;
    sql?: string;
    data?: any;
}