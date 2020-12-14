console.log("Welcome to tracer")
window.addEventListener("load", function() {
    // code...
    console.log("DOM loaded")
    var img = document.getElementById("canvasImg");
    var canvas = document.getElementById("tracerCanvas")
    canvas.width = canvas.parentElement.clientWidth * 0.8;
    var ctx = canvas.getContext("2d");
    let startPosition = {x: 0, y: 0};
    let lineCoordinates = {x: 0, y: 0};
    let isDrawStart = false;

    ctx.lineWidth = "1";
    ctx.strokeStyle = "red";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


    // img.onload = start;

    // function start() {
    //     console.log("Img loaded")
    //     /// initial draw of image
    //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    //     /// listen to mouse move (or use jQuery on('mousemove') instead)
    //     // canvas.onmousemove = updateLine;
    // }
    
    var lineArray = []



    const getClientOffset = (event) => {
        const {pageX, pageY} = event.touches ? event.touches[0] : event;
        const x = pageX - canvas.offsetLeft;
        const y = pageY - canvas.offsetTop;

        return {x,y} 
    }

    const drawLine = () => {

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var coord = {}
    coord["x1"] = startPosition.x
    coord["y1"] = startPosition.y 
    coord["x2"] = lineCoordinates.x 
    coord["y2"] = lineCoordinates.y

    lineArray.push(coord)
    lineArray.forEach(function(data){
        ctx.beginPath();
        ctx.moveTo(data["x1"], data["y1"]);
        ctx.lineTo(data["x2"], data["y2"]);
        ctx.stroke();
    })

    }

    const mouseDownListener = (event) => {
    startPosition = getClientOffset(event);
    isDrawStart = true;
    }

    const mouseMoveListener = (event) => {
    if(!isDrawStart) return;
    
    lineCoordinates = getClientOffset(event);
    // clearCanvas();
    drawLine();
    }

    const mouseupListener = (event) => {
    isDrawStart = false;
    }

    const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener('mousedown', mouseDownListener);
    canvas.addEventListener('mousemove', mouseMoveListener);
    canvas.addEventListener('mouseup', mouseupListener);

    canvas.addEventListener('touchstart', mouseDownListener);
    canvas.addEventListener('touchmove', mouseMoveListener);
    canvas.addEventListener('touchend', mouseupListener);

    });
    