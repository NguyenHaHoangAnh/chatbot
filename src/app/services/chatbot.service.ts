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

  getResponse(message: string) {
    return new Promise<Response> ((resolve) => {
      setTimeout(() => {
        const result = new Response();
        result.role = 'bot';
        result.content = 'Hiện tại, có tổng cộng 68538 phạm nhân đang thụ án trong hệ thống quản lý trại giam. Bạn cần thêm thông tin gì khác không?';
        result.date = new Date();
        result.sql = 'SELECT COUNT(*) AS "total_prisoners" FROM "criminal_table" WHERE "PRISON_STATUS" = 1;';
        result.data = [
          { total_prisoner: 68538 },
        ]

        resolve(result);
      }, 3000);
    });
  }
}
