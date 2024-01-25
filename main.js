song="";
function preload()
{
    song=loadSound("alert.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    }
    function start(){
        objectDetector=ml5.objectDetector('cocossd',modelloaded);
        document.getElementById("status").innerHTML="status:Detecting Objects";
    }
    
    img="";
    status_1="";
    objects=[];
    
    function preload(){
    img=loadImage('dog_cat.jpg');
    }
    function draw(){
    image(video,0,0,380,380);
    if(status_1!="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status:Object Dectected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects detected are:"+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].hieght);
        if(objects[i].label=="person")
        {
        document.getElementById("number_of_objects").innerHTML="Baby Found";
        console.log("stop");
        song.stop();
        }
        else{
            document.getElementById("number_of_objects").innerHTML="Baby Not Found";
            console.log("play")
            song.play();
        }
        }
        if(objects.length==0)
        {
        document.getElementById("number_of_objects").innerHTML="Baby Not Found";
        console.log("play");
        song.play();
        }
    }
    }
    function modelloaded(){
    console.log("ModelLoaded!");
    status_1=true;
    
    
    }
    function gotResult(error,results){
    if(error){
    console.log(error);
    }
        console.log(results);
        objects=results;
    }