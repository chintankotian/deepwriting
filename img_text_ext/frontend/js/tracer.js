console.log("Welcome to tracer")
window.addEventListener("load", function() {
    // code...
    console.log("DOM loaded")
    var img = document.getElementById("canvasImg");
    var canvas = document.getElementById("tracerCanvas")
    canvas.width = canvas.parentElement.clientWidth * 1;
    canvas.height = canvas.parentElement.clientHeight * 1;
    var ctx = canvas.getContext("2d");
    var startPosition = {x: 0, y: 0};
    var lineCoordinates = {x: null, y: null};
    var isDrawStart = false;
    var strokeLength = canvas.width * 0.05;
    var lineArray = []
    var wordArray = ["jumped"]

    // Create the word label radio buttons
    var wordForm = document.getElementById("wordContainerForm")
    wordArray[0].toLowerCase().split("").forEach(function(char, no){
        if (!no) {
            wordForm.innerHTML = wordForm.innerHTML + '<input type="radio" checked name="character" value="'+char+'">'+char+'&nbsp;'
        }else{
            wordForm.innerHTML = wordForm.innerHTML + '<input type="radio" name="character" value="'+char+'">'+char+'&nbsp;'
        }
    })

    // define stroke style and width
    ctx.lineWidth = "1";
    ctx.strokeStyle = "red";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


    // ANGLE AND DISTANCE
    const distance = (event) =>{
        return Math.sqrt( 
                            Math.pow((event.x1 - event.x2), 2) + Math.pow((event.y1 - event.y2), 2)
                        )
    }

    const  angle = (cx, cy, ex, ey) => {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        // theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
      }

    const pointFromAngleDis = (event) => {
        x = event.x + (strokeLength * Math.cos(event.theta))
        y = event.y + (strokeLength * Math.sin(event.theta))   
        return {x, y}
    }
    const getClientOffset = (event) => {
        const {pageX, pageY} = event.touches ? event.touches[0] : event;
        const x = pageX - canvas.offsetLeft;
        const y = pageY - canvas.offsetTop;

        return {x,y} 
    }

    const capturePoint = (pen = 0) => {
        if (pen) {
            console.log(lineArray)
        }
        if (lineCoordinates.x != null) {
            var coord = {}
            coord["x1"] = startPosition.x
            coord["y1"] = startPosition.y 
            coord["x2"] = lineCoordinates.x 
            coord["y2"] = lineCoordinates.y
            coord["pen"] = pen;
            // bow_label must be 1 on the first point of the first stroke of a word, if we are creating new instance of bow_label will be 1 for the first entry of lineArray 
            coord["bow_label"] = 0;
            if(!lineArray.length) coord["bow_label"] = 1;
            lineArray.push(coord)
            console.log("Point captured")
        }
        console.log("No of points = " + lineArray.length.toString())

    }

    const drawLine = () => {

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        lineArray.forEach(function(data){
            ctx.beginPath();
            ctx.moveTo(data["x1"], data["y1"]);
            ctx.lineTo(data["x2"], data["y2"]);
            ctx.stroke();
        })


            ctx.beginPath();
            ctx.moveTo(startPosition.x, startPosition.y);
            ctx.lineTo(lineCoordinates.x, lineCoordinates.y);
            // console.log("Distance = " + distance({"x1":startPosition.x, "x2":lineCoordinates.x, "y1":startPosition.y, "y2":lineCoordinates.y}))
            // console.log("Angle = " + angle(startPosition.x, startPosition.y, lineCoordinates.x, lineCoordinates.y))
            ctx.stroke();
    }

    const mouseDownListener = (event) => {
        console.log("Mouse down")
        if (isDrawStart) {
            capturePoint();

            startPosition = lineCoordinates;
        }
    }

    const mouseMoveListener = (event) => {
        if(!isDrawStart) return;
        
        lineCoordinates = getClientOffset(event);
        // clearCanvas();
        var length = distance({"x1":startPosition.x, "x2":lineCoordinates.x, "y1":startPosition.y, "y2":lineCoordinates.y});

        if(length > strokeLength)
        {

            var tempData = {"x":startPosition.x, "y":startPosition.y, "theta":angle(startPosition.x, startPosition.y, lineCoordinates.x, lineCoordinates.y)}
            tempData = pointFromAngleDis(tempData)
            lineCoordinates.x = tempData.x
            lineCoordinates.y = tempData.y
        }
        drawLine();
    }

    const mouseDblclickListener = (event) => {
        isDrawStart = !isDrawStart;
        if (isDrawStart) {
            startPosition = getClientOffset(event);
            capturePoint();
        }else
        {
            // if(lineArray.length != 0)
            // {   
            //     console.log("pop")
            //     lineArray.pop()
            // }

            // capturePoint(pen = 1);
            lineArray[lineArray.length - 1].pen = 1;
            console.log(lineArray)
            lineCoordinates = {x: null, y: null};

        }

    }

    // const mouseupListener = (event) => {
    // isDrawStart = false;
    // }

    const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    canvas.addEventListener('dblclick', mouseDblclickListener);
    canvas.addEventListener('mousedown', mouseDownListener);
    canvas.addEventListener('mousemove', mouseMoveListener);
    // canvas.addEventListener('mouseup', mouseupListener);

    canvas.addEventListener('touchstart', mouseDownListener);
    canvas.addEventListener('touchmove', mouseMoveListener);
    // canvas.addEventListener('touchend', mouseupListener);

    });
    