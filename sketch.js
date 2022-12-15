let points;
let angle = 0;
let recording = true;

function preload() {
    // HME.createH264MP4Encoder().then(enc => {
    //     encoder = enc
    //     encoder.outputFilename = 'test'
    //     encoder.width = 1000
    //     encoder.height = 1000
    //     encoder.frameRate = 60
    //     encoder.kbps = 50000 // video quality
    //     encoder.groupOfPictures = 10 // lower if you have fast actions.
    //     encoder.initialize()
    // })
}

function setup() {
    createCanvas(windowWidth, windowHeight-1);
    colorMode(HSB, 80);
    frameRate(60);
    //background(0);
    angleMode(DEGREES);
    points = Matrix.nDimensionSquare(50, 3);
}

function draw() {
    translate(width/2, height/2);
    scale(4);
    background(0);

    let projection = [];

    for (let i = 0; i < points.length; i++) {
        
        let rotated = Matrix.rotateX(angle).mult(points[i]);
        rotated = Matrix.rotateY(angle).mult(rotated);
        rotated = Matrix.rotateZ(angle).mult(rotated);
        let projected2d = Matrix.nDimensionProjection(2).mult(rotated);

        projection.push({
            original: points[i],
            rotated: rotated,
            projected: projected2d
        });

    }
    //Lines
    for (let p of projection) {
        let neighbors = [];

        for (let i = 0; i < projection.length; i++) {
            if (differenceCount(p.original.v.flat(), projection[i].original.v.flat()) == 1) {
                neighbors.push(projection[i]);
            }
        }

        for (let n of neighbors) {
            push();
            strokeWeight(2);
            stroke(255);
            line(p.projected.getX(), p.projected.getY(), n.projected.getX(), n.projected.getY());
            pop();
        }

    }
    //Points
    for (let p of projection) {
        push();
        //stroke(projection.indexOf(p)*10,80,80);
        stroke(255);
        strokeWeight(8);
        point(p.projected.getX(), p.projected.getY());
        pop();
    }
    
    angle += 0.5
    if (angle == 360) {
        angle = 0;
    }

    // if (recording) {
    //     encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
    // }

    // if (frameCount == 720) {
    //     recording = false;

    //     encoder.finalize();
    //     const uint8Array = encoder.FS.readFile(encoder.outputFilename);
    //     const anchor = document.createElement('a')
    //     anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }))
    //     anchor.download = encoder.outputFilename
    //     anchor.click();
    //     encoder.delete();

    // }
}

function differenceCount(arr1, arr2) {
    let smallCount = arr1.length;
    let largeCount = arr2.length

    if (smallCount > largeCount) {
        let temp = smallCount;
        smallCount = largeCount;
        largeCount = temp;
    }

    toReturn = largeCount-smallCount;

    for (let i = 0; i < smallCount; i++) {
        if (arr1[i] != arr2[i]) toReturn++;
    }

    return toReturn;

}