# Twitch Command Display Hub

Twitch Command Display Hub 是一個多功能的網頁應用程式，特別為 Twitch 實況主打造。它允許您透過整合聊天指令，即時觸發視覺和音頻元素，以豐富直播內容。無論是顯示圖片、影片，還是文字指令，Twitch Command Display Hub 提供了無縫的解決方案，讓直播更具互動性。

## 功能特色
- 聊天整合： 與 Twitch 聊天連接，監聽觀眾觸發的特定指令。
- 視覺元素： 支援顯示圖片、影片和文字指令，即時呈現在您的直播畫面上。
- 可自定義： 輕鬆配置 Twitch 整合設定，並根據需求自訂指令。
- 互動覆蓋層： 透過即時回應聊天指令，提升觀眾參與度。

## 開始使用

### 先決條件

1. 若你為實況主或是內容創作者，只需要有支援瀏覽器來源的實況程式即可，例如：OBS Studio、Streamlabs、XSplit
2. 若你需要嘗試開發，正常來說只需要文字編輯器以及瀏覽器即可
   為確保程式碼的品質，我們使用 eslint，你需要安裝 [Node.js](https://nodejs.org/)

### 安裝

1. **下載程式碼**

- 你可以點擊旁邊的 `<> Code` 下拉式按鈕，選擇下載壓縮檔 (Download ZIP)，自行解壓縮

- 若你需要開發，可以使用 git 功能，並且安裝相依性套件，不需要的可以直接到使用方法

1. 複製存儲庫：
```bash
git clone https://github.com/sugarbobo-ch/Twitch-Command-Display-Hub.git
```

2. 切換到專案目錄：
```bash
cd Twitch-Command-Display-Hub
```

3. 安裝依賴項：
```bash
npm install
```

## 使用方法
1. 配置設定：
使用文字編輯器，記事本或是 VSCode 等打開 `config.js` 檔案，更新以下參數：
```javascript
// config.js

var config = {
  debug: true,                   // 用於測試時設為 true，正式使用時設為 false
  prefix: '!',                   // 指令的前綴符號
  username: 'YOUR_USER_NAME',    // 您的 Twitch 使用者名稱
  token: 'YOUR_ASSET_TOKEN',     // 您的 Twitch 存取 Token，從 https://twitchtokengenerator.com/ 獲取
  channel: 'YOUR_CHANNEL_ID'     // 您的 Twitch 頻道 ID
}
```

請確認上面的參數有正確更換，記住正式使用時 `debug` 要為 `false` 喔

2. 設定指令：
使用文字編輯器，記事本或是 VSCode 等打開 `commands.js` 檔案，更新以下參數：
```javascript
// commands.js

var customCommands = {
  // 在這行以下輸入你的指令，指令格式如下:
  /* Example:
    "你的指令名稱1": {
      type: "image",
      content: "你放在assets資料夾下的檔名，包含副檔名，例如 image0.gif"
    },
    "你的指令名稱2": {
      type: "video",
      content: "你放在assets資料夾下的檔名，包含副檔名，例如 搞笑.mp4"
    },
    "你的指令名稱3": {
      type: "text",
      content: "這是一個文字指令，會顯示這裡輸入的文字在中間持續10秒"
    }
  */
  強: {
    type: 'image',
    content: '強.gif'
  },
  並沒有: {
    type: 'video',
    content: '並沒有.mp4'
  },
  123: {
    type: 'text',
    content: 'YOU TYPE 123'
  },
  test: {
    type: 'text',
    content: 'testtttttt'
  }
  // 在這邊輸入你的指令，別忘了 } 後面要加逗號才可以繼續輸入
  
  // 在上方輸入程式碼，下面不要動到
}
```

3. 將你的聲音、圖片、影片檔案放到與 `index.html` 同層的 `assets` 資料夾下，資料夾應該長這樣：
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
  - ... (其他專案檔案)
```

4. 開啟實況程式，例如 OBS Studio、Streamlabs、XSplit，在來源的區塊按下新增來源，選擇瀏覽器，建立新來源後選擇本機檔案，瀏覽到資料夾下的 `index.html`；寬度高度建議設定跟你的螢幕一樣大，之後將使用程式控制音訊打勾，方便你可以控制音量。

5. 恭喜你，你可以開始在聊天室輸入 !指令 了，建議先自己把 `config.js` 內的 `debug` 改為 `true` 測試，頁面中的音效、css 樣式、顯示時間都可以自行更改，記得改完時要點選實況軟體的來源 - 更新當前頁面快取。建議測試的時候直接用瀏覽器雙擊打開 `index.html` F5 重新整理即可。

## 配置詳情
-`debug`: 設為 true 可在沒有聊天互動的情況下進行測試；設為 `false` 進行實際使用。

-`prefix`: 定義您的聊天指令前綴。

-`username`: 您的 Twitch 使用者名稱。

-`token`: 您的 Twitch access token；請保持安全，從 [Twitch Token Generator](https://twitchtokengenerator.com/) 獲取。

-`channel`: 您的 Twitch 頻道 ID。

注意： 請保密您的 Twitch access token，不要公開分享，在網頁下面可以只給予讀取聊天室的權限，較為安全。

## 貢獻

歡迎參與貢獻！如果您有改進或修復錯誤的想法，可以不用客氣地讓我知道，加入 [Discord](https://discord.gg/gzDKGDZcwU) 社群。

## 許可證

本專案使用 [MIT](https://opensource.org/license/mit) 許可證，你可以隨意使用這個專案進行開發、營利。
