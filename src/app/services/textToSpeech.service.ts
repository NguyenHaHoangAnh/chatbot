import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  private synth = window.speechSynthesis;
  private speech: SpeechSynthesisUtterance | null = null;
  private isReadingSubject = new BehaviorSubject<boolean>(false);
  isReading = this.isReadingSubject.asObservable();

  constructor(private zone: NgZone) { }

  speak(text: string, voice: any) {
    this.speech = new SpeechSynthesisUtterance();
    
    this.speech.text = text;
    this.speech.voice = voice;
    this.speech.volume = 1;
    this.speech.rate = 1;
    this.speech.pitch = 1;
    
    this.isReadingSubject.next(true);
    window.speechSynthesis.speak(this.speech);
  }

  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
      this.zone.run(() => {
        this.isReadingSubject.next(false);
    });
    }
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
