import { MessageOptions, UpdateShape } from "./type";

const headers = { "content-type": "application/json" };

const toPrefixUrl = (token: string) => `https://api.telegram.org/bot${token}`;

// https://core.telegram.org/bots/api#sendmessage
export const sendMessage =
  (token: string) =>
  async (
    chatId: string,
    text: string,
    options: Partial<MessageOptions> = {}
  ) => {
    const jBody = {
      chat_id: chatId,
      text: text,
      ...options,
    };

    const body = JSON.stringify(jBody);

    try {
      const response = await fetch(`${toPrefixUrl(token)}/sendMessage`, {
        body,
        headers,
        method: "POST",
      });

      return response.json();
    } catch (err) {
      console.error(err);
    }
  };

export const getUpdates = (token: string) => async (): Promise<UpdateShape> => {
  const response = await fetch(`${toPrefixUrl(token)}/getUpdates`, {
    headers,
    method: "GET",
  });

  return response.json();
};

export const sendTypingIndicator =
  (token: string) => async (chat_id: string) => {
    const body = JSON.stringify({
      chat_id,
      action: "typing",
    });

    const response = await fetch(`${toPrefixUrl(token)}/sendChatAction`, {
      headers,
      method: "POST",
      body,
    });

    return response.json();
  };

export const setWebhook =
  (
    token: string,
    webhookUrl: string,
    allowed_updates: string[] = ["message", "callback_query"]
  ) =>
  async (): Promise<void> => {
    console.log("setting webhook to url", webhookUrl);
    const body = JSON.stringify({
      url: webhookUrl,
      allowed_updates,
    });

    const response = await fetch(`${toPrefixUrl(token)}/setWebhook`, {
      headers,
      method: "POST",
      body,
    });

    return response.json();
  };

export const deleteWebhook = (token: string) => async (): Promise<void> => {
  const response = await fetch(`${toPrefixUrl(token)}/deleteWebhook`, {
    headers,
    method: "GET",
  });

  return response.json();
};

export const getWebhookInfo = (token: string) => async (): Promise<any> => {
  const response = await fetch(`${toPrefixUrl(token)}/getWebhookInfo`, {
    headers,
    method: "GET",
  });

  return response.json();
};
