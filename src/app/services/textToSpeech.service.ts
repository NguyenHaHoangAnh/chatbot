import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbstractCrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '../app-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService extends AbstractCrudService {
  private isReadingSubject = new BehaviorSubject<boolean>(false);
  isReading = this.isReadingSubject.asObservable();
  audio: any;

  constructor(private zone: NgZone, httpClient: HttpClient) {
    super(httpClient);
  }

  getApiName(): string {
    return apiName.TTS;
  }

  async speak(text: string): Promise<void> {
    return new Promise(async (resolve) => {
      (await this.convertTextToSpeech(text)).subscribe(async (res: any) => {
        if (res && res.error_code === 0) {
          await this.downloadAudio(res.link).then((res: any) => {
            this.audio = res;
            // console.log('[res]', res);
            if (this.audio) {
              resolve();
              this.audio.play();
              this.isReadingSubject.next(true);
              this.audio.onended = () => {
                this.isReadingSubject.next(false);
              }
            }
          });
        }
      });
    })
  }

  async stop() {
    if (this.audio) {
      await this.audio.pause();
      await this.audio.load();
      this.zone.run(() => {
        this.isReadingSubject.next(false);
      });
    }
  }

  async convertTextToSpeech(text: string) {
    const body = {
      text: text,
      token_id: 'tk_2f15d7bb-49db-4762-95f6-afa4a4db276e', // <-- Thay token nếu cần
      audio_quality: '32',
      audio_type: 'mp3',
      comma: '0.5',
      sentence: '0.5',
      paragraph: '0.25',
      voice: 'nam_bac',
    };

    return this.post(body, environment.textToSpeech);
  }
  
  downloadAudio(url: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const getAudio = () => {
        this.httpClient.get(url).subscribe((res: any) => {
          if (res && res.status === 2) {
            // console.log('[res]', res);
            const audioUrl = res.link;
            const audio = new Audio(audioUrl);
            // console.log('[audio]', audio);
            resolve(audio);
          } else {
            const timerId = setTimeout(() => {
              getAudio();
              clearTimeout(timerId);
            }, 1000);
          }
        });
      }

      getAudio();
    });
  }

  getVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          resolve(window.speechSynthesis.getVoices());
        };
      }
    });
  }
}
