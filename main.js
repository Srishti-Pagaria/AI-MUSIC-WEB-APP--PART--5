song = "";
song2 = "";
music_status = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_status = "";

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    music_status = song.isPlaying();
    song_status = song2.isPlaying();


    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    }
    if(music_status == false){
        song.play();
        document.getElementById("song_name").innerHTML = "Song which will be played is " + "Peter Pan Song";
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song.stop();
    }
    if(music_status == false){
        song2.play();
        document.getElementById("song_name").innerHTML = "Song which will be played is " + "music2";
    }
}

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function modelLoaded(){
    console.log("Posenet is initialised");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX);
        console.log("leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX)
        console.log("rightWristY = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score left wrist = " + scoreLeftWrist);
        console.log("Score right wrist = " + scoreRightWrist);
    }
}