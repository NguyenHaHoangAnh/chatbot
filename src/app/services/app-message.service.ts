import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  constructor(private messageService: MessageService) { }

  showSuccess(str: string) {
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: str, 
    });
  }

  showInfo(str: string) {
      this.messageService.add({ 
        severity: 'info', 
        summary: 'Info', 
        detail: str, 
      });
  }

  showWarn(str: string) {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Warn', 
        detail: str, 
      });
  }

  showError(str: string) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: str, 
      });
  }

  showContrast(str: string) {
      this.messageService.add({ 
        severity: 'contrast', 
        summary: 'Error', 
        detail: str, 
      });
  }
}
