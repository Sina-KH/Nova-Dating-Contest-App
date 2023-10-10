export interface ITelegramUpdate {
    update_id: number;
    message: ITelegramMessage;
}

export interface ITelegramMessage {
    message_id: number;
    from?: ITelegramUser;
    sender_chat?: ITelegramChat;
    date: number;
    chat: ITelegramChat;
    text?: string;
}

export interface ITelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
}

export interface ITelegramChat {
    id: number;
    type: 'private' | 'group' | 'supergroup' | 'channel';
    title?: 'string';
    username?: 'string';
}

export interface ITelegramReplyKeyboardMarkup {
    inline_keyboard: ITelegramKeyboardButton[][];
}

export interface ITelegramKeyboardButton {
    text: string;
    web_app?: {
        url: string;
    };
}
