import { BaseMessage } from "./base-message";

export class Response extends BaseMessage {
    final_answer!: string;
    sql_fix!: string;
    result_execute!: any[];
}