## `.env` file variables in this project

### DEBUG
This variable can be `true` or `false`,

`true` will lead to more detailed (and private) data returned in response. For example validation issues in input data will be returned. 

In production mode, it should always be `false`.

### BOT_TOKEN

The token received from telegram for your bot.

This token will be used to validate user data hash on app start.

For more info, please visit [telegram bots api documentation page](https://core.telegram.org/bots/api).

### HOOK_KEY, HOOK_SECRET

This key will be the string appended at the end of the default hook address. (for example: your_web_service/hook/telegram_KEY_HERE)

and the secret is the string that you set in your webhook settings in telegram api,
this way, we will ensure that the hook data request came from the telegram server.
[More information here](https://core.telegram.org/bots/api#setwebhook).

### WEBAPP_URL

The url to the telegram-mini-application, It will be used to create bot keyboard buttons, linking to the web app.

### HTTP_PORT

The port you want the service use.

### DB_URI, DB_USERNAME, DB_PASSWORD

MongoDB instance data.
To know more about mongo db installation and its configurations, [please read  here](https://www.mongodb.com/docs/manual/administration/install-community/).

### REDIS_URI

Redis instance uri to be used as socket.io adapter and also for caching purposes. [What is redis?](https://redis.io)

### REDIS_ADAPTER_KEY, REDIS_CACHE_KEY

Unique redis prefixes to be used.

### FILE_PATH

File path to store media files.

### JWT_SECRET

JWT secret to sign tokens and create safe jwt tokens. [What is jwt token?](https://auth0.com/docs/secure/tokens/json-web-tokens)

### API_PATH

API services url, to be used as prefix string to media path, whenever required.
