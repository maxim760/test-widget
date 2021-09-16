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
  if (!data || (data && data.type !== 'sycret')) {
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
  window.open(`https://certificate-react.vercel.app/?${query}`, '_blank')
}

function setCoords(frame, position) {
  if (position === 'top') {
    frame.style.top = 0
    frame.style.left = 0
    frame.style.right = 0
    frame.style.width = '100%'
    frame.style.height = Math.min(height, window.innerHeight) + 'px'
  } else if (position === 'bottom') {
    frame.style.bottom = 0
    frame.style.left = 0
    frame.style.right = 0
    frame.style.width = '100%'
    frame.style.height = Math.min(height, window.innerHeight) + 'px'
  } else if (position === 'left') {
    frame.style.bottom = 0
    frame.style.top = 0
    frame.style.height = '100%'
    frame.style.left = 0
    frame.style.width = Math.min(width, window.innerWidth) + 'px'
  } else {
    frame.style.bottom = 0
    frame.style.top = 0
    frame.style.height = '100%'
    frame.style.right = 0
    frame.style.width = Math.min(width, window.innerWidth) + 'px'
  }
}

function openSycretFrame(options) {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('message', onMessage)

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
  frame.setAttribute('src', `https://certificate-react.vercel.app/?${query}`)
  frame.setAttribute('frameborder', `no`)
  frame.style.position = 'absolute'
  frame.style.boxShadow =
    'rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px'
  frame.addEventListener('click', (e) => e.stopPropagation())
  div.addEventListener('click', (e) => {
    div.remove()
  })
  setCoords(frame, position)
  div.appendChild(frame)
  document.body.appendChild(div)
}
