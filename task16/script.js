const c = document.querySelector("#canvas");
const ctx = c.getContext("2d");
const selection = document.querySelector('#select');
const selection2 = document.querySelector('#select2');
let fontSize = selection2.value;
const toolBox = document.querySelector(".tools");
const menu = document.querySelector(".menu");
const container = document.querySelector("#container");
const record = document.querySelector("#record");
const video = document.querySelector("#video");
const download = document.querySelector("#download");

record.title = "Start Recording";

const sizes = [10, 12, 14, 16, 18, 20];
let isActive = false;
let lastX = 0;
let lastY = 0;
let currentTool="pencil";

sizes.forEach(size => {
  const option = document.createElement("option");
  option.value = size;
  option.textContent = size;
  selection2.appendChild(option);
})

c.width = window.innerWidth * 0.5;
c.height = window.innerHeight * 0.5;

video.width = window.innerWidth * 0.5;
video.height = window.innerHeight * 0.5;

window.addEventListener("resize", () => {
    c.width = window.innerWidth * 0.5;
    c.height = window.innerHeight * 0.5;
    
    video.width = window.innerWidth * 0.5;
    video.height = window.innerHeight * 0.5;
})

toolBox.addEventListener("click", event=>{
  if(event.target.tagName !=="BUTTON"){return};
  currentTool= event.target.id;
  menu.setAttribute("data-tool",currentTool);
  container.setAttribute("data-tool",currentTool);

  if(currentTool==="clear"){
      ctx.clearRect(0,0,c.width,c.height);
  }
})

c.addEventListener("pointerdown", (e) => {
  isActive=true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

c.addEventListener("pointermove", event => {
  if(!isActive){return};
  ctx.strokeStyle = selection.value;
  ctx.lineCap = "round";
  const x = event.offsetX;
  const y = event.offsetY;

  if (currentTool ==="pencil") {
    ctx.beginPath();
    fontSize = selection2.value;
    ctx.lineWidth = fontSize;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (currentTool==="eraser") {
    ctx.beginPath();
    ctx.strokeStyle = "#282828";
    ctx.lineWidth = "5";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  lastX = x;
  lastY = y;
})

let isRecording = false;
let mediaRecorder = null;
let chunks =[];
let url = null;
let recordingReady = false;

record.addEventListener("click",()=>{
    
    if(!isRecording){
        record.style.backgroundColor="blue";
        record.title="Stop Recording";
        recordingReady=false;
        const stream = c.captureStream(30);
        mediaRecorder = new MediaRecorder(stream);
        chunks = [];

        video.srcObject = stream;
        video.play();
        
        mediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
        };
        
        mediaRecorder.onstop = e => {
            const blob = new Blob(chunks, { type: "video/webm" });
            url = URL.createObjectURL(blob);

            video.srcObject = null;
            video.src = url;
            video.play();

            recordingReady = true;
        };

        mediaRecorder.start();
        isRecording = true;
    }else{
        record.style.backgroundColor="red";
        record.title="Start Recording";
        mediaRecorder.stop();
        isRecording = false;
    }
})

download.addEventListener("click",()=>{
    if(!recordingReady || !url){return}

    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

})

c.addEventListener("pointerout", () => isActive = false);
c.addEventListener("pointerup", () => isActive = false);
