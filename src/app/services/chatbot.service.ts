import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { AbstractCrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { apiName, getBackendApiUrl } from '../app-constants';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService extends AbstractCrudService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getApiName(): string {
    return apiName.CHAT_DATA;
  }

  getResponse(msg: Message): any {
    const { message, history_data, type_llm } = msg;
    
    return this.post({ message, history_data, type_llm }, getBackendApiUrl() + '/' + this.getApiName());
  }
}
