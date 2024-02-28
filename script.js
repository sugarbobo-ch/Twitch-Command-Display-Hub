// Load variables from global environment
const { debug, prefix, username, token, channel } = window.config
const commands = window.customCommands
const {
  Chat
} = window.TwitchJs

// Get instances of elements
const app = document.getElementById('app')
const contentContainer = document.getElementsByClassName('content-container')[0]
const contentElement = document.getElementsByClassName('content')[0]
const sound = document.getElementsByClassName('sound')[0]

// State and query or command
const commandQueue = []
let isPlaying = false

if (debug) {
  const onTriggerButtonClick = () => {
    receiveMessageCommand({
      type: 'video',
      content: '並沒有.mp4'
    })
    receiveMessageCommand({
      type: 'image',
      content: '強.gif'
    })
  }
  const button = document.createElement('button')
  button.textContent = 'Test'
  button.addEventListener('click', onTriggerButtonClick)
  document.body.appendChild(button)
}

function delay (delayTime) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delayTime)
  })
}

// Handle Google Chrome autoplay policy.
function play (element) {
  const promise = element.play()
  if (promise !== undefined) {
    promise.then(_ => {
      element.play()
    }).catch(error => {
      // Autoplay was prevented.
      // Show a "Play" button so that user can start playback.
      console.error(error)
      element.muted = true
    })
  }
}

// Play a shot of sound when display text or image
function playSound () {
  if (!sound) return
  sound.currentTime = 0
  sound.volume = 0.25
  play(sound)
}

// For remove prefix of text
function removePrefix (inputString) {
  const words = inputString.split('')
  words.shift()
  return words.join('')
}

// Toggle content animation
function toggle () {
  contentContainer.classList.toggle('active')
}

// Invoked when receive a chat command which is set in commands.js
function receiveMessageCommand (commandData) {
  commandQueue.push(commandData)
  if (!isPlaying) {
    showNextCommand(commandData.type, `./assets/${commandData.content}`)
  }
}

// Invoked everytime receive a message or at the end of a command display
function showNextCommand () {
  if (commandQueue.length === 0) {
    isPlaying = false
    return
  }
  const nextCommand = commandQueue.shift()
  showContent(nextCommand.type, nextCommand.content)
}

// Show content with type, allowing text, video and image currently.
// Do not call this function without state control.
async function showContent (type, content) {
  if (showContent.length === 0) return
  isPlaying = true

  contentElement.innerHTML = ''
  if (type === 'text') {
    const textContent = document.createElement('div')
    textContent.innerText = content
    textContent.classList.add('text')
    contentElement.appendChild(textContent)
    playSound()
    setTimeout(() => {
      removeContent(textContent)
    }, 10000)
  } else if (type === 'video' || type === 'image') {
    const mediaContent = (type === 'video') ? document.createElement('video') : document.createElement('img')
    mediaContent.src = `./assets/${content}`
    if (type === 'video') {
      mediaContent.controls = false
      mediaContent.autoplay = true
      play(mediaContent)
      mediaContent.addEventListener('ended', () => {
        removeContent(mediaContent)
      })
    } else {
      mediaContent.addEventListener('load', async () => {
        playSound()
        await delay(5000)
        removeContent(mediaContent)
      })
    }
    contentElement.appendChild(mediaContent)
  }
  toggle()
}

async function removeContent (element) {
  toggle()
  await delay(1000)
  element.remove()
  await delay(500)
  showNextCommand()
}

const run = async () => {
  const chat = new Chat({
    username,
    token,
    log: {
      level: 'warn'
    }
  })

  chat.on('*', (message) => {
    const time = new Date(message.timestamp).toTimeString()
    const event = message.event || message.command
    const channel = message.channel
    const msg = message.message || ''
    const username = message.username || ''
    if (debug) {
      app.innerHTML += `<div>${time} <strong>${event}</strong> ${channel} ${msg}</div>`
    }
    if (event === 'PRIVMSG') {
      console.log(username, msg)
    }
    if (typeof msg !== 'string' || !msg.startsWith(prefix)) return
    const command = msg.trim()
    const commandData = commands[removePrefix(command)]

    if (commandData) {
      receiveMessageCommand(commandData)
    }
  })

  await chat.connect()
  await chat.join(channel)
}

run()
