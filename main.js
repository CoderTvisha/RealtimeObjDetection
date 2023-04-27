stat = "";
img = "";
objects = [];


function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640,420);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded() {
    console.log("Model Loaded");
    stat = true;
   
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);

    objects = results;

}

function draw() {
    image(video, 0, 0, 640, 420);

r = random(255);
g = random(255);
b = random(255);

    if (stat != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_obj").innerHTML = "Objects Detected are : " + objects.length;
            fill(r,g,b);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }





}