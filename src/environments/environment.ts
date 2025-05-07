export const environment = {
    production: false,
    backendApiUrl: 'http://10.4.203.88:8006',
}

export const getApiRouterUrl = (apiName: string): string => {
    return apiRouter[apiName.substr(0, apiName.indexOf("/"))];
};

export const apiRouter: any = {
    AI_Agent: 'http://10.4.203.88:8006',
    completions: 'https://1a9c-103-199-76-132.ngrok-free.app',
    tts: 'https://aiplatform.mobifone.ai',
}