window.addEventListener('load', function(){
  
  var doc = document,
    canvas = document.querySelector('#paper'),
    ctx = canvas[0].getContext('2d')
  
  /* Start of ERASE */
  /* 
  1. Find the reset button, consider `getElementById`
  2. We want to listen to click events and whenever that happens we want to erase the canvase
     - use the DOM element's `addEventListener` function to list to `click` events (element.addEventListener('click', function () {})
     - inside the function use `ctx.clearRect()`
       - This function takes beginningX, beginningY, widthToClear, heightToClear
       - 0,0 is a great place to begin but how large of a space do we clear? What if someone is on their phone but someone else is on a monitor (different screen sizes)?
       - document.body.clientWidth gives us the width of the document, maybe this can be helpful. Also there is a sibling property for height!
  */  
  var element = document.getElementById("reset");
  element.addEventListener('click', function () {
    ctx.clearRect(0,0,document.body.clientWidth, document.body.clientHeight)
  })
  
  var erase = false // default erase status
  
  /* 
  1. Find the erase button, consider `getElementById`
  2. We want to listen to click events and whenever that happens we want to set erase to true
     - use the DOM element's `addEventListener` function to list to `click` events (element.addEventListener('click', function () {})
     - inside the function set erase to true
  */
  
  /* End of ERASE */
  
  /* Start of BRUSH SIZE */
  
  var brushSize = 5; // default brush size
  
  /* Let's pull in the brush size DOM elements so we can add events to them
  1. Start with querying the document (webpage) (consider `querySelectorAll`). How can we specify just the brush size buttons?
  2. Note that these are nodes, not an array, so wrap what we got back with Array.from
     - this creates an array from an iterable, which we have!
  3. Now set all of that equal to a variable (maybe call it `sizeElements`) so we can use it in other parts of our code! 
  */

   /* Arrays in JavaScript have many built in methods, which is why we wanted an Array instead of any old iterable
  1. Let's work with `forEach` so we can do something to each element in the `colorElements` array
  2. For each element we want to listen to click events and whenever that happens we want to increment or decrement the brushSize
     - use each DOM element's `addEventListener` function to list to `click` events (element.addEventListener('click', function () {})
  3. How to determine if we are incrementing or decrementing?
     - look at the `innerHTML` and write a logic statement (if/else) to increment or decrement
     - ALTERNATIVELY you could give the HTML elements id's and select them individually rather than both at once
     - either way, set the brushSize variable to 1 more or 1 less depending on the button
  */
  
  /* End of BRUSH SIZE */
  
  /* Start of COLOR SELECTOR */
  var color = 'black'; // default color

  /* Let's pull all of the dom nodes for the color selector into an array to work with
  1. Start with querying the document (webpage) (consider `querySelectorAll`). How can we specify just the color selector nodes?
  2. Note that these are nodes, not an array, so wrap what we got back with Array.from
     - this creates an array from an iterable, which we have!
  3. Now set all of that equal to a variable (maybe call it `colorElements`) so we can use it in other parts of our code! 
  */

  /* Arrays in JavaScript have many built in methods, which is why we wanted an Array instead of any old iterable
  1. Let's work with `forEach` so we can do something to each element in the `colorElements` array
  2. For each element we want that node on the page to have a background color of what it's id is
     - DOM nodes have a style object so we can give CSS to a node dynamically. Check out `style.backgroundColor`
  3. For each element we ALSO want to listen to click events and whenever that happens we want to make that color the selected one
     - use each DOM element's `addEventListener` function to list to `click` events (element.addEventListener('click', function () {})
     - set the color variable to this color (what is `this.id`?)
     - remove `selected` from the classList of the previously selected color. Consider `querySelector` to find that node and use `classList.remove()` to update that node
     - add `selected` to the classList so the CSS styling we have for the selected color carries over (`classList.add`).
  */
  
  /* End of COLOR SELECTOR */
  
  
  // A flag for drawing activity
  var drawing = false;

  var clients = {};
  var cursors = {};

  var prev = {};
  
  canvas.on('mousedown',function(e){
    e.preventDefault();
    drawing = true;
    prev.x = e.pageX;
    prev.y = e.pageY;
  });
  
  doc.bind('mouseup mouseleave',function(){
    drawing = false;
  });

  doc.on('mousemove',function(e){ // an event listening for the mouse moving!
    
    // Draw a line for the current user's movement, as it is
    if(drawing){ // if we clicked this should be true so let's draw something!
      
      drawLine(prev.x, prev.y, e.pageX, e.pageY, color, brushSize);
      
      prev.x = e.pageX;
      prev.y = e.pageY;
    }
  });

  function drawLine(fromx, fromy, tox, toy, color, brushSize){
    
    ctx.beginPath();
    /* COLOR SELECTOR 
    If we want to get it working we need to give the canvas a color
    Look into `ctx.strokeStyle`. What could we set it equal to?
    */
    
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    if (erase) {
      /* ERASE
      We need to clear parts of the canvas.
      `ctx.clearRect` does this for us, but what do we give as the x and y?
      We need an x and y to start, for the width and height we clear let's just give it a constant like 8
      Try `ctx.clearRect(fromx, fromy, 8, 8)`
      How does it change as you change the numbers in your constant?
      */
    } else {
      ctx.moveTo(fromx, fromy);
      ctx.lineWidth = brushSize;
      ctx.lineTo(tox, toy);
      ctx.stroke();
    }
  }

});