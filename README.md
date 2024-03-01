# Twitch Command Display Hub

The Twitch Command Display Hub is a web application that integrates with Twitch chat, allowing content creators to trigger visual and audio elements on their streams using chat commands. This hub supports images, videos, and text commands, providing an interactive and dynamic overlay for Twitch broadcasts.

- 中文版本請點這：[中文版本說明](https://github.com/sugarbobo-ch/Twitch-Command-Display-Hub/blob/main/zh/README.md)
- Tutorial (English sub provided): https://youtu.be/LZh7Ij1GFN0

## Features

- Chat Integration: Connects with Twitch chat to listen for specific commands triggered by your viewers.
- Visual Elements: Supports images, videos, and text commands to be displayed on your stream.
- Customizable: Easily configure your Twitch integration settings and customize commands according to your preferences.
- Interactive Overlay: Enhance viewer engagement by responding to chat commands in real-time.

## Getting Started

### Prerequisites

1. If you are a streamer or content creator, you only need a streaming program that supports browser sources, such as OBS Studio, Streamlabs, or XSplit.
2. If you want to try development, you only need a text editor and a browser. To ensure code quality, we use eslint, and you need to install [Node.js](https://nodejs.org/en).

### Installation
1. Download the code
- You can click the `<> Code` dropdown button and choose to `Download ZIP` file, then unzip it.

- If you prefer using git for development, clone the repository and install dependencies. If not, you can skip to the usage section.

```
git clone https://github.com/sugarbobo-ch/Twitch-Command-Display-Hub.git
cd Twitch-Command-Display-Hub
npm install
```

## Usage
1. Configure settings:

Use a text editor, Notepad, or VSCode to open the `config.js` file and update the following parameters:
```javascript
// config.js

var config = {
  debug: true,                   // Set to true for testing, false for production
  prefix: '!',                   // Prefix for commands
  username: 'YOUR_USER_NAME',    // Your Twitch username
  token: 'YOUR_ASSET_TOKEN',     // Your Twitch access token obtained from https://twitchtokengenerator.com/
  channel: 'YOUR_CHANNEL_ID'     // Your Twitch channel ID
}
```
Make sure to replace the above parameters with your actual values. Remember to set `debug` to `false` for production.

2. Set up commands:
Use a text editor, Notepad, or VSCode to open the `commands.js` file and update the following parameters:
```javascript
// commands.js

var customCommands = {
  // Enter your commands below. Command format:
  /* Example:
    "YourCommand1": {
      type: "image",
      content: "Filename in the assets folder, including the extension, e.g., image0.gif"
    },
    "YourCommand2": {
      type: "video",
      content: "Filename in the assets folder, including the extension, e.g., funny.mp4"
    },
    "YourCommand3": {
      type: "text",
      content: "This is a text command, displaying the entered text in the center for 10 seconds"
    }
  */
  strong: {
    type: 'image',
    content: 'strong.gif'
  },
  notfound: {
    type: 'video',
    content: 'notfound.mp4'
  },
  test: {
    type: 'text',
    content: 'This is a test command!'
  }
  // Add your commands above, don't forget the comma after each entry

  // Do not modify the code below this line
}
```

3. Place your audio, image, and video files in the assets folder at the same level as index.html. The folder structure should look like this:
```
- Twitch-Command-Display-Hub
  - assets
    - sound.mp3
    - image.jpg
    - video.mp4
  - index.html
  - commands.js
  - config.js
  - script.js
  - style.css
  - README.md
  - ... (other project files)
```

4. Open your streaming software, such as OBS Studio, Streamlabs, or XSplit. Add a new source, choose Browser, create a new source, and select the local file, navigate to the `index.html` in the folder. Set the width and height to match your screen. Make sure to enable controlling audio from the source for better volume control.

5. Congratulations! You can now start typing `!yourCommand` in the chat. It's recommended to set `debug` to `true` in `config.js` for testing. You can customize audio, CSS styles, and display time by modifying the code. After making changes, update the current page cache in your streaming software.

## Configuration Details
-`debug`: Set to true for testing without chat interaction; set to false for actual use.

-`prefix`: Define the prefix for your chat commands.

-`username`: Your Twitch username.

-`token`: Your Twitch access token; keep it secure, obtain it from [Twitch Token Generator](https://twitchtokengenerator.com/).

-`channel`: Your Twitch channel ID.

Note: Keep your Twitch access token confidential. Only grant read access to the chat in the web interface for security.

## Contributing
Contributions are welcome! If you have ideas for improvements or bug fixes, feel free to let us know by joining the [Discord](https://discord.gg/gzDKGDZcwU) community.

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit), allowing you to use it freely for development and profit.
