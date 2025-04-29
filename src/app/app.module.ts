import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { AppMainComponent } from './layouts/app.main/app.main.component';
import { DateFormatPipe } from './pipes/dateFormat.pipe';
import { MessageService } from 'primeng/api';
import { ChatbotDataComponent } from './pages/chatbot/chatbot-data/chatbot-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    AppMainComponent,
    DateFormatPipe,
    ChatbotDataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    TooltipModule,
    ToastModule,
    DropdownModule,
    CardModule,
    TableModule,
    TabViewModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
