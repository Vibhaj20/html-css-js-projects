const generateBtn=document.getElementById("generator-btn");
const paletteContainer=document.querySelector(".palette-container");


generateBtn.addEventListener("click",generatepalette);
paletteContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("copy-btn")){
        const hexvalue=e.target.previousElementSibling.textContent;
        navigator.clipboard.writeText(hexvalue)
        .then(()=>showCopySuccess(e.target))
        .catch((err)=>console.log("Failed to copy text:",err))
    }else if(e.target.classList.contains("color")){
        const hexvalue=e.target.nextElementSibling.textContent;
        navigator.clipboard.writeText(hexvalue)
        .then(()=>showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err)=>console.log("Failed to copy text:",err))
    }
});
function showCopySuccess(element){
    element.classList.remove("far","fa-copy");
    element.classList.add("fas","fa-check");
    element.style.color="#48bb78";
    setTimeout(()=>{
        element.classList.remove("fas","fa-check");
        element.classList.add("far","fa-copy");
        element.style.color="#000000";
    },1500) 
}
function generatepalette(){
  const colors=[];
  for(let i=0;i<5;i++){
    colors.push(generaterandomcolor())
  }
 updatepalettedisplay(colors)
}
function generaterandomcolor(){
    const letters="0123456789ABCDEF";
    let color="#"
    for(let i=0;i<6;i++){
        color+=letters[Math.floor(Math.random()*16)];
    }
    return color
}
function updatepalettedisplay(colors){
    const colorboxes=document.querySelectorAll(".color-box")
    colorboxes.forEach((box,index)=>{
        const color =colors[index]
        const colordiv=box.querySelector(".color")
        const hexValue=box.querySelector(".hex-value")

        colordiv.style.backgroundColor=color;
        hexValue.textContent=color
    })
}


