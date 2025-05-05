import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { AbstractCrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '../app-constants';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService extends AbstractCrudService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getApiName(): string {
    return apiName.CHATBOT;
  }

  getResponse(message: string): any {
    return this.post(message, this.getBaseUrl());
  }
}
