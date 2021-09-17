window.addEventListener('message', onMessage)
function getWidget() {
  return document.querySelector('#sycret-widget')
}
const height = {
  small: '200px',
  big: '400px',
}

let isStarted = false

window.addEventListener('resize', onResize)

function getHeightBeforeStart() {
  return window.innerWidth < 600 ? height.small : height.big
}

const widget = getWidget()
if (widget) {
  widget.style.height = getHeightBeforeStart()
}
function onMessage(e) {
  const data = e.data
  if (!data || (data && (data.type !== 'sycret'))) {
    return
  }
  const widget = getWidget()
  if (data.status === 'start') {
    widget.style.height = height.big
    isStarted = true
  } else {
    widget.style.height = getHeightBeforeStart()
    isStarted = false
  }
}

function onResize() {
  const widget = getWidget()
  if (!widget) {
    return
  }
  if (isStarted && window.innerWidth >= 600) {
    widget.style.height = height.big
    return
  }
  if (!isStarted && window.innerWidth < 600) {
    widget.style.height = height.small
  }
}

function parseQuery(options) {
  return Object.keys(options)
    .filter((k) => options[k])
    .map((k) => `${k}=${options[k]}`)
    .join('&')
}

function openSycretCertificate(options) {
  var query = parseQuery(options)
  window.open(`https://sycret.ru/test/onlinesale/?${query}`, '_blank')
}

function setCoords(frame, position, width, height) {
  if (position === 'top') {
    frame.style.top = 0
    frame.style.left = 0
    frame.style.right = 0
    frame.style.width = '100%'
    frame.style.height = Math.min(height, window.innerHeight) + 'px'
  } else if (position === 'bottom') {
    const h = Math.min(height, window.innerHeight)
    frame.style.bottom = 0
    frame.style.left = 0
    frame.style.right = 0
    frame.style.width = '100%'
    frame.style.height = h + 'px'
  } else if (position === 'left') {
    const w = Math.min(width, window.innerWidth);
    frame.style.bottom = 0
    frame.style.top = 0
    frame.style.height = '100%'
    frame.style.left = 0
    frame.style.width = w + 'px'
  } else {
    frame.style.bottom = 0
    frame.style.top = 0
    frame.style.height = '100%'
    frame.style.right = 0
    frame.style.width = Math.min(width, window.innerWidth) + 'px'
  }
}

function removeFrame() {
  console.log("remove")
  document.body.style.overflow = null
  const frame = document.querySelector("#wrapper-sycret-frame")
  if (frame) {
    frame.remove()
  }
}

function openSycretFrame(options) {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('message', onMessage)
  console.log("now hidden")
  document.body.style.overflow = "hidden"
  window.addEventListener("message", (event) => {
    const data = event.data || {}
    console.log({data})
    if (data.type === "sycret" && data.status === "close") {
      removeFrame()
    }
  })
  
  const { width, height, position, ...queryObj } = options
  console.log({ options, position })
  const div = document.createElement('div')
  const frame = document.createElement('iframe')
  div.style.position = 'fixed'
  div.style.top = 0
  div.style.right = 0
  div.style.bottom = 0
  div.style.left = 0
  div.style.background = 'rgba(0, 0, 0, 0.3)'
  div.style.zIndex = 9999
  div.setAttribute('id', 'wrapper-sycret-frame')
  const query = parseQuery(queryObj)
  frame.setAttribute('src', `https://sycret.ru/test/onlinesale/?${query}&close=1`)
  frame.setAttribute('frameborder', `no`)
  frame.style.position = 'absolute'
  frame.addEventListener('click', (e) => e.stopPropagation())
  div.addEventListener('click', removeFrame)
  setCoords(frame, position, width, height)
  div.appendChild(frame)
  document.body.appendChild(div)
}
