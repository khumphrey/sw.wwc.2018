window.addEventListener('load', function(){
  const canvas = document.querySelector('#paper'),
    ctx = canvas.getContext('2d')
  
  let erase = false
  let brushSize = 5
  let color = 'black'
  let drawing = false


  const prev = {}
  
  document.getElementById('eraser').addEventListener('click', () => erase = true )
  document.getElementById('reset').addEventListener('click', () => ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight))
 
  /* Brush Size from size buttons*/  
  Array.from(document.querySelectorAll('.brush-size')).forEach(el => {
    el.addEventListener('click', function () {
      // increment or decrement size
      brushSize = this.innerHTML === '+' ? brushSize + 1 : brushSize - 1
    })
  })

  /* Color Selector from color elements */
  Array.from(document.querySelectorAll('.marker')).forEach(colorElement => {
    // Set the background color of this DOM element to its id (purple, blue, etc)
    colorElement.style.backgroundColor = colorElement.id

    // Attach a click handler that will set our color variable to
    // the elements id, remove the selected class from all colors,
    // and then add the selected class to the clicked color.
    colorElement.addEventListener('click', function () {
        color = this.id
        erase = false
        document.querySelector('.selected').classList.remove('selected')
        this.classList.add('selected')
    })
  })
  
  canvas.addEventListener('mousedown', (e) => {
    e.preventDefault()
    drawing = true
    prev.x = e.pageX
    prev.y = e.pageY
  })
  
  document.addEventListener('mouseup', () => { drawing = false })
  document.addEventListener('mouseleave', () => { drawing = false })

  document.addEventListener('mousemove',function(e){
    if(drawing){
      
      drawLine(prev.x, prev.y, e.pageX, e.pageY, color, brushSize)
      
      prev.x = e.pageX
      prev.y = e.pageY
    }
  })

  function drawLine(fromx, fromy, tox, toy, color, brushSize){
    
    ctx.beginPath()
    ctx.strokeStyle = color
    
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    
    if (erase) {
      ctx.clearRect(fromx, fromy, 8, 8)
    } else {
      ctx.moveTo(fromx, fromy)
      ctx.lineWidth = brushSize
      ctx.lineTo(tox, toy)
      ctx.stroke()
    }
  }

})