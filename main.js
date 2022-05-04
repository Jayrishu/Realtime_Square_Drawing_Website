function setup(){
    canvas = createCanvas(550,500);
    canvas.position(600,150);
    video = createCapture(VIDEO);
    video.size(550,500);
    video.position(10,150)
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("PoseNet is ready");
}
noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX=0;
difference = 0;
function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X - "+noseX+","+"Nose Y - "+noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("Left Wrist x - "+leftWristX+" , Right Wrist x - "+rightWristX);
    }
}
function draw(){
    background(255,255,0);
    fill(255,0,255);
    stroke(128,0,128);
    square(noseX,noseY,difference);
    document.getElementById("square_size").innerHTML="Width and Height of the square will be "+difference;
}