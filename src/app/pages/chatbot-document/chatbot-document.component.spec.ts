import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotDocumentComponent } from './chatbot-document.component';

describe('ChatbotDocumentComponent', () => {
  let component: ChatbotDocumentComponent;
  let fixture: ComponentFixture<ChatbotDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
