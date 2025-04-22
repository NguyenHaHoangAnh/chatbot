import { Component, NgZone } from '@angular/core';

declare var webkitSpeechRecognition: any;
declare var webkitSpeechGrammarList: any;

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: any[] = [];
  message: string = '';
  recognition: any;

  constructor(private zone: NgZone) {
    const grammar = '#JSGF V1.0;';
    this.recognition = new webkitSpeechRecognition();
    const speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    this.recognition.grammars = speechRecognitionList;

    this.recognition.lang = 'vi-VN';
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const lastResult = event.results.length - 1;
      const content = event.results[lastResult][0].transcript;
      this.zone.run(() => {
        this.message = content;
        console.log('[content]', this.message);
      });
    };

    this.recognition.onspeechend = () => {
      this.stopRecording();
    };

    this.recognition.onerror = (event: any) => {
      console.log('[error]', event.error);
    };
  }

  startRecording() {
    console.log('start...');
    this.recognition.start();
  }

  stopRecording() {
    this.recognition.stop();
    console.log('stop!');
  }
  
  handleSubmit() {
    if (!this.message.trim()) return;
    console.log('[message]', this.message);
    this.messages.push(this.message);
    this.message = '';
  }
}
