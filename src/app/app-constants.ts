import { environment, getApiRouterUrl } from "src/environments/environment"
import { AppRoutingUrl } from "./app-routing-url";

export const getBackendApiUrl = (apiName?: string): string => {
    if (apiName) {
        return getApiRouterUrl(apiName);
    }
    return environment.backendApiUrl;
}

export const apiName: any = {
    CHAT_DATA: 'chat_data/',
    TTS: 'tts/',
    CHAT: 'chat/',
}

export const sidebarItems: any = [
    { url: AppRoutingUrl.module.chatbot, label: 'Hỏi đáp trại giam' },
    { url: AppRoutingUrl.module.chatbotDocument, label: 'Hỏi đáp văn bản pháp luật' },
]