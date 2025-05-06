import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './layouts/app.main/app.main.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { ChatbotDocumentComponent } from './pages/chatbot-document/chatbot-document.component';
import { AppRoutingUrl } from './app-routing-url';

const routes: Routes = [
  {
    path: '', component: AppMainComponent,
    children: [
      {
        path: AppRoutingUrl.module.chatbot,
        component: ChatbotComponent,
      },
      {
        path: AppRoutingUrl.module.chatbotDocument,
        component: ChatbotDocumentComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
