import { environment, getApiRouterUrl } from "src/environments/environment"

export const getBackendApiUrl = (apiName?: string): string => {
    if (apiName) {
        return getApiRouterUrl(apiName);
    }
    return environment.backendApiUrl;
}

export const apiName: any = {
    CHATBOT: '',
    TTS: '',
}