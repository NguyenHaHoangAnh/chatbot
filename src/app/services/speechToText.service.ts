import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppMessageService } from './app-message.service';

declare var webkitSpeechRecognition: any;
declare var webkitSpeechGrammarList: any;

@Injectable({
    providedIn: 'root'
})
export class SpeechToTextService {
    recognition: any;
    private isRecordingSubject = new BehaviorSubject<boolean>(false);
    private messageSubject = new BehaviorSubject<string>('');
    isRecording = this.isRecordingSubject.asObservable();
    message = this.messageSubject.asObservable();

    constructor(private zone: NgZone, private appMessageService: AppMessageService) {
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
                this.messageSubject.next(content);
                // console.log('[content]', content);
            });
        };

        this.recognition.onspeechend = () => {
            this.stop();
        };

        this.recognition.onerror = (event: any) => {
            console.log('[error]', event.error);
            this.stop();
        };
    }

    async requestMicrophonePermission(): Promise<boolean> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // dừng ngay nếu chỉ xin quyền
            return true;
        } catch (error: any) {
            const err = error.toString().split(':')[0];
            if (err === 'NotFoundError') {
                this.appMessageService.showError('Không tìm thấy microphone. Vui lòng kết nối microphone.');
            } else if (err === 'NotAllowedError') {
                this.appMessageService.showError('Vui lòng cho phép sử dụng microphone.');
            }
            return false;
        }
    }

    async start() {
        const isAllowed = await this.requestMicrophonePermission();
        if (isAllowed) {
            console.log('start...');
            this.isRecordingSubject.next(true);
            this.recognition.start();
        }
    }

    async stop() {
        const isAllowed = await this.requestMicrophonePermission();
        if (isAllowed) {
            this.recognition.stop();
            console.log('stop!');
            this.zone.run(() => {
                this.isRecordingSubject.next(false);
            });
        }
    }
}
