import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { AbstractCrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { apiName, getBackendApiUrl } from '../app-constants';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ChatbotDocumentService extends AbstractCrudService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getApiName(): string {
    return apiName.CHAT;
  }

  getResponse(msg: Message): any {
    const { message } = msg;
    const user_id = '1';
    const botname = 'bot';
    const conversation_id = 'a';
    const format_value = '1';
    
    return this.httpClient.post(this.getBaseUrl(), { user_id, botname, message, conversation_id, format_value }, {responseType: 'text'});
  }
}
