import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';
import { Response } from 'src/app/models/response';
import { ChatbotDocumentService } from 'src/app/services/chatbot-document.service';
import { SpeechToTextService } from 'src/app/services/speechToText.service';
import { TextToSpeechService } from 'src/app/services/textToSpeech.service';

@Component({
  selector: 'app-chatbot-document',
  templateUrl: './chatbot-document.component.html',
  styleUrls: ['./chatbot-document.component.scss']
})
export class ChatbotDocumentComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  message: string = '';
  recognition: any;
  isLoading: boolean = false;
  isRecording: boolean = false;
  isReading: boolean = false;
  isLoadingVoice: boolean = false;
  voiceIndex!: number;
  subscription!: Subscription;
  // voices: any[] = [];
  // voice: any;
  @ViewChild('content') content: any;

  constructor(
    private chatbotDocumentService: ChatbotDocumentService,
    private speechToTextService: SpeechToTextService,
    private textToSpeechService: TextToSpeechService,
  ) {}

  async ngOnInit() {
    this.subscription = this.speechToTextService.isRecording.subscribe((isRecording: boolean) => this.isRecording = isRecording);
    this.subscription = this.speechToTextService.message.subscribe((message: string) => this.message = message);
    this.subscription = this.textToSpeechService.isReading.subscribe((isReading: boolean) => this.isReading = isReading);
    // this.voices = await this.textToSpeechService.getVoices();
    // this.voice = this.voices[0]
    // console.log('[voices]', this.voices);

    const newMessage = new Message();
    newMessage.role = 'bot';
    newMessage.message = 'Xin chào! Tôi có thể giúp bạn tra cứu thông tin từ văn bản pháp luật.';
    newMessage.date = new Date();

    this.messages.push(newMessage);
    this.scrollToEnd();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async startRecording() {
    await this.speechToTextService.start();
  }

  async stopRecording() {
    await this.speechToTextService.stop();
  }

  toggleRecording() {
    if (this.isRecording) this.stopRecording();
    else this.startRecording();
  }

  onKeyPress(event: any) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.message)
        this.handleSubmit();
    }
  }
  
  async handleSubmit() {
    if (!this.message.trim()) return;
    this.isLoading = true;
    const newMessage = new Message();
    newMessage.role = 'user';
    newMessage.message = this.message.trim();
    newMessage.date = new Date();
    // console.log('[message]', this.message);
    this.messages.push(newMessage);
    newMessage.history_data.push(newMessage.message);
    this.scrollToEnd();
    this.message = '';

    await this.chatbotDocumentService.getResponse(newMessage)
      .subscribe(async (res: any) => {
        this.voiceIndex = this.messages.length - 1 + 1;
        await this.toggleRead(res, this.messages.length - 1 + 1);

        const response = new Response();
        response.role = 'bot',
        response.date = new Date();
        response.message = res;
        response.sql_fix = res.sql_fix;
        response.result_execute = res.result_execute;

        this.messages.push(response);
        this.isLoading = false;
        this.scrollToEnd();
      });
  }

  isResponse(message: Message | Response): boolean {
    return message.role !== 'user' && message instanceof Response;
  }

  async toggleRead(text: string, index: number) {
    if (!this.isReading) {
      this.voiceIndex = index;
      this.isLoadingVoice = true;
      await this.textToSpeechService.speak(text);
      this.isLoadingVoice = false;
    } else {
      this.textToSpeechService.stop();
      if (this.voiceIndex !== index) {
        this.voiceIndex = index;
        this.isLoadingVoice = true;
        await this.textToSpeechService.speak(text);
        this.isLoadingVoice = false;
      }
    }
  }

  scrollToEnd() {
    setTimeout(() => {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    }, 100);
  }
}
