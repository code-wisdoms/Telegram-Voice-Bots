# Telegram Voice Bots
##### Small overnight project that is easily configurable and expandable. Bots reply to command with a audio note made from predefined audio files.
---
### How to install:
1.  #### Make a bot on Telegram and save its token
	1. Start chat with Botfather [@BotFather](https://t.me/BotFather)
    2. Use /newbot command
    3. Follow the steps and give your bot a title and username
    4. Botfather will give you a token*. Save this token to use later.
        **(Note: Token is a password to your bot. Do not share it with anyone)**
2.  #### Download and Install NodeJS with NPM
	- Follow the steps here [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3.  #### Make a Node server
	1. Download this repository. [Download link](https://github.com/Zakoota/Telegram-Voice-Bots/archive/master.zip)
	2. Extract zip
	3. Go into extracted directory and run `npm intall` command to install libraries required for this bot.
4.  #### Set token, audio files and other configurations
	1. Make a new folder in `/public` directory and save audio files in it.
	2. Every new bot will have its own directory with unique name
            (For example the files for Rizvi bots are saved in `/public/rizvi` directory)
	3. Every audio file will be turned into a bot command by using its filename
    4. Telegram requires audio notes to be in OPUS .ogg format with size limit upto 50MB. Otherwise the notes will be sent as streamable audio files.
    5. Set token in .env file found in root directory. Every value is separated by a pipe `|` and new bot settings start with a semicolon `;`
    	- Config format:
			`bots=[Directory name]|[Bot Username]|[Bot Token]|[Bot Webhook Endpoint];[Another Directory name]|[Another Bot Username]|[Another Bot Token]|[Another Bot Webhook Endpoint]`
        - Config example: `bots=rizvi|khadimrizvi_bot|1234:asdhasdhajsdaldsjalsjdalsjdlasjdlasjdlasjdaj|asdhasdhajsdalds`
	- #### Important
		1. \*Endpoints are ears to your bot. Telegram will send all messages to this url so your bot can process them
        2. \*\*Endpoints can be anything but it is recommended that you make them a **random string** so no one can guess them. They are not secure and anyone can hijack your bot.
        3. \*\*\*Every bot **must have a unique endpoint**.
5.  #### Start the server and set webhooks/commands
	1. Open command prompt
    2. Start server with `node ./index.js`
    3. Open a web browser and visit `localhost/refreshwebhooks` to setup webhooks and bot commands.

- ### Config options 
|Option| Description | Required | Default |
|--|--|--|--|
| `bots ` | Bot details separated be `\|` and new bot separated by `;`| YES | 
| `cores `| Number of cores server should use | NO | All available cores |
| `port ` | Server port | NO | `80` |
| `publicDir `| Name of public directory.| NO | `/public` |
| `domain_name `| Domain name | NO | `os.hostname()` |
| `telegram_api `| Telegram API URL | NO | `https://api.telegram.org`|
| `disable_dotenv`| Disable `.env` file and use system environment variables | NO | `FALSE` |
