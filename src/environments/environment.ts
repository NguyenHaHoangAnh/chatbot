export const environment = {
    backendApiUrl: 'http://10.4.203.88:8006/AI_Agent',
    textToSpeech: 'https://aiplatform.mobifone.ai/tts/convert-by-token',
}

export const getApiRouterUrl = (apiName: string): string => {
    return apiRouter[apiName.substr(0, apiName.indexOf("/"))];
};

export const apiRouter: any = {
    chat_data: 'AI_AGENT',
}