import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotDataComponent } from './chatbot-data.component';

describe('ChatbotDataComponent', () => {
  let component: ChatbotDataComponent;
  let fixture: ComponentFixture<ChatbotDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
