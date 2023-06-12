export interface MessageResult {
  update_id: number;
  message: {
    chat: { id: string };
    text: string;
    date: number;
    from: { id: number };
  };
}

export interface UpdateShape {
  ok: true;
  result: MessageResult[];
}

// https://core.telegram.org/bots/api#formatting-options
export type ParseMode = "MarkdownV2" | "HTML";

export interface ReplyMarkupUnit {
  text: "Option 1";
  callback_data: "1";
}

export interface MessageOptions {
  parse_mode: ParseMode;
  reply_to_message_id: number;
  protect_content: boolean;
  disable_notification: boolean;
  reply_markup?: {
    inline_keyboard: ReplyMarkupUnit[][];
  };
}
