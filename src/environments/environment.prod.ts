export const environment = {
    production: true,
    backendApiUrl: '${AI_AGENT_BACKEND_CHATBOT}',
}

export const getApiRouterUrl = (apiName: string): string => {
    return apiRouter[apiName.substr(0, apiName.indexOf("/"))];
};

export const apiRouter: any = {
    chat_data: '${AI_AGENT_BACKEND_CHAT_DATA}',
    chat: '${AI_AGENT_BACKEND_CHAT}',
    tts: '${AI_AGENT_BACKEND_TTS}',
}