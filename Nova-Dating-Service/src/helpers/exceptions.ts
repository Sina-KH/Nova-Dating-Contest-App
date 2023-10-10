export enum Exceptions {
    notAuthorized = 'err.notAuthorized',
    invalidJWTToken = 'err.invalidJWTToken',
    badRequest = 'err.badRequest',
    badFileUpload = 'err.badFileUpload',

    botUpdate_isNotMessage = 'err.botUpdate.isNotMessage',
    botUpdate_messageIsNotInDirectChat = 'err.botUpdate.messageIsNotInDirectChat',
    botUpdate_messageIsFromABot = 'err.botUpdate.messageIsFromABot'
}
