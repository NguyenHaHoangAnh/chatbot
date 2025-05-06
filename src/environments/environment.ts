export const environment = {
    production: false,
    backendApiUrl: 'http://10.4.203.88:8006',
}

export const getApiRouterUrl = (apiName: string): string => {
    return apiRouter[apiName.substr(0, apiName.indexOf("/"))];
};

export const apiRouter: any = {
    chat_data: 'http://10.4.203.88:8006/AI_Agent',
    chat: 'https://1a9c-103-199-76-132.ngrok-free.app/completions',
    tts: 'https://aiplatform.mobifone.ai',
}