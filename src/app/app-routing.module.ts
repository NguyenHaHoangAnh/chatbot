import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './layouts/app.main/app.main.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';

const routes: Routes = [
  {
    path: '', component: AppMainComponent,
    children: [
      {
        path: '',
        component: ChatbotComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
