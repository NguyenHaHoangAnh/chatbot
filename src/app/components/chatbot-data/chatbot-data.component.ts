import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot-data',
  templateUrl: './chatbot-data.component.html',
  styleUrls: ['./chatbot-data.component.scss']
})
export class ChatbotDataComponent implements OnInit {
  @Input() data?: any;
  columns: any[] = [];

  ngOnInit(): void {
    if (this.data) {
      for (const key in this.data[0]) {
        this.columns.push(key);
      }
    }
  }
}
