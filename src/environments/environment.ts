export const environment = {
    backendApiUrl: 'https://google.com',
    textToSpeech: 'https://aiplatform.mobifone.ai/tts/convert-by-token',
}

export const getApiRouterUrl = (apiName: string): string => {
    return apiRouter[apiName.substr(0, apiName.indexOf("/"))];
};

export const apiRouter: any = {
    chatbot: ''
}