import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { SpeechToTextService } from 'src/app/services/speechToText.service';
import { TextToSpeechService } from 'src/app/services/textToSpeech.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  message: string = '';
  recognition: any;
  isLoading: boolean = false;
  isRecording: boolean = false;
  isReading: boolean = false;
  subscription!: Subscription;
  voices: any[] = [];
  voice: any;
  @ViewChild('content') content: any;

  constructor(
    private chatbotService: ChatbotService,
    private speechToTextService: SpeechToTextService,
    private textToSpeechService: TextToSpeechService,
  ) {}

  async ngOnInit() {
    this.subscription = this.speechToTextService.isRecording.subscribe((isRecording: boolean) => this.isRecording = isRecording);
    this.subscription = this.speechToTextService.message.subscribe((message: string) => this.message = message);
    this.subscription = this.textToSpeechService.isReading.subscribe((isReading: boolean) => this.isReading = isReading);
    this.voices = await this.textToSpeechService.getVoices();
    this.voice = this.voices[0]
    // console.log('[voices]', this.voices);
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
    newMessage.content = this.message.trim();
    newMessage.date = new Date();
    // console.log('[message]', this.message);
    this.messages.push(newMessage);
    this.scrollToEnd();
    const msg = this.message;
    this.message = '';

    await this.chatbotService.getResponse(msg)
      .then((response: Message) => {
        this.messages.push(response);
        // this.read(response.content);
        this.isLoading = false;
        this.scrollToEnd();
      });
  }

  read(text: string, voice: any) {
    if (!this.isReading) {
      this.textToSpeechService.speak(text, voice);
    } else {
      this.textToSpeechService.stop();
    }
  }

  scrollToEnd() {
    setTimeout(() => {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    }, 100);
  }
}
