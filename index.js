const canvas = document.getElementById('canvas')
const contentFrame = document.getElementById('content-frame')

window.addEventListener('storage', () => {
  const selectedId = localStorage.getItem('menu')
  console.log(selectedId)
  window.open(`content${selectedId}.html`, 'content-frame')
})

const ctx = canvas.getContext('2d')

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.strokeRect(0, 0, canvas.width, canvas.height)
ctx.font = '30px Arial'
ctx.fillStyle = 'black'
ctx.fillText('Томанов Максим', 10, 50)
const drawLines = (ctx, coords) => {
  const [x, y] = coords.shift()
  ctx.beginPath()
  ctx.moveTo(x, y)
  coords.forEach(([x, y]) => ctx.lineTo(x, y))
  ctx.closePath()
  ctx.stroke()
}

// triangle
drawLines(ctx, [
  [100, 100],
  [300, 100],
  [300, 300],
])
drawLines(ctx, [
  [120, 110],
  [290, 110],
  [290, 280],
])

// rectangle
ctx.beginPath()
ctx.strokeRect(100, 350, 200, 200)
ctx.closePath()
ctx.beginPath()
ctx.strokeRect(150, 400, 100, 100)
ctx.closePath()
ctx.stroke()
// circle
ctx.beginPath()
ctx.arc(200, 650, 50, 0, Math.PI * 2)
ctx.closePath()
ctx.stroke()
ctx.beginPath()
ctx.arc(200, 650, 10, 0, Math.PI * 2)
ctx.closePath()
ctx.stroke()
