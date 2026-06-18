const button=
    document.getElementById("button");
const speakbtn=document.getElementById("speakbtn");
const voicebtn=document.getElementById("voicebtn");
let currentQuestion="";
button.addEventListener("click",startInterview);
speakbtn.addEventListener("click",speakQuestion);
voicebtn.addEventListener("click",startVoiceRecognition);
function startInterview(){
    const role=document.getElementById("role").value;
const roleQuestions=questions[role];
const randomIndex=Math.floor(
    Math.random()*roleQuestions.length
);
currentQuestion=roleQuestions[randomIndex];
document.getElementById("question").innerText=currentQuestion;
startTimer();
}
function speakQuestion(){

    if(currentQuestion===""){
        alert("Click Start Interview First");
        return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(currentQuestion);

    speech.lang="en-US";
    speech.rate=1;
    speech.pitch=1;
    speech.volume=1;

    speechSynthesis.speak(speech);
}
function startVoiceRecognition(){
    const recognition=new webkitSpeechRecognition();
    recognition.lang="en-US";
    recognition.start();
    recognition.onresult=function(event){
        const transcript=event.results[0][0].transcript;
        document.getElementById("answer").innerText=transcript;
    };
}
function startTimer(){
    let time=60;
    const timer=document.getElementById("timer");
    const countdown=setInterval(function(){
        time--;
        timer.innerText=time;
        if(time<=0){
            clearInterval(countdown);
            alert("interview Time Over");
        }
    },1000);
}
