import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor() { }

  getResponse(message: string) {
    return new Promise<Message> ((resolve) => {
      setTimeout(() => {
        const result = new Message();
        result.role = 'bot';
        result.content = 'Hiện tại, có tổng cộng 68,538 phạm nhân đang thụ án trong hệ thống quản lý trại giam. Bạn cần thêm thông tin gì khác không?';
        result.date = new Date();

        resolve(result);
      }, 3000);
    });
  }
}
