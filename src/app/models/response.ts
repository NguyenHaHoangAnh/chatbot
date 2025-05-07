import { BaseMessage } from "./base-message";

export class Response extends BaseMessage {
    sql_fix!: string;
    result_execute!: any[];
    chart!: any;
}