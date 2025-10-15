const noun = ['dog', 'cat', 'house', 'tree', 'river', 'mountain', 'boy', 'girl'];
const verb = ['runs', 'jumps', 'sings', 'sleeps', 'eats', 'flies'];
const adj = ['happy', 'big', 'small', 'blue', 'loud', 'quiet'];
const adv = ['quickly', 'slowly', 'happily', 'sadly', 'loudly', 'softly'];
const prepo = ['on', 'in', 'under', 'over', 'near', 'beside'];

function getrandom(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function generate(){
    const struct=[
        `${getrandom(adj)} ${getrandom(noun)} ${getrandom(verb)} ${getrandom(adv)}.`,
        `The ${getrandom(noun)} ${getrandom(verb)} ${getrandom(prepo)} the ${getrandom(adj)} ${getrandom(noun)}.`,
        `${getrandom(noun)} ${getrandom(verb)} and ${getrandom(verb)} ${getrandom(adv)}.`,
    ];
    return getrandom(struct);
}

const para=document.querySelector("#sentence");
const userinput=document.querySelector("#input");
const startbtn=document.querySelector("#start_btn");
let sents=[];
let text="";
let timer=null;
let time=60;
let mist=0;
let timeElapsed=0;
function renderNew(){
    sents=[];
    for(let i=0;i<10;i++){
        sents.push(generate());
    }
    text=sents.join(" ");
    const charsarr=text.split("").map((value)=>{
        return `<span class="char">${value}</span>`;
    });
    para.innerHTML=charsarr.join("");
}

function updateTimer() {
    if(time<=0){
        displayResult();
    } 
    else{
        time--;
        document.querySelector(".time").innerText=time+"s";
    }
}

function startTest() {
    mist=0;
    time=60;
    userinput.value="";
    userinput.focus();
    renderNew();
    document.querySelector(".time").innerText = time+"s";
    if(timer){
        clearInterval(timer);
    }
    timer = setInterval(updateTimer, 1000);
}

function displayResult() {
    clearInterval(timer);
    const charlen=userinput.value.length;
    const mins=(60-time)/60;
    const wpm=(charlen/5)/mins;
    const textl=text.length;
    const rightchar=document.querySelectorAll(".char.success").length;
    const acc=(rightchar/textl)*100;
    document.querySelector(".awpm").innerText=wpm.toFixed(2)+" wpm";
    document.querySelector(".aacc").innerText=acc.toFixed(2)+"%";
    if(acc>90){
        document.querySelector(".agrd").innerText="A";
    }
    else if(acc<=90 && acc>70){
        document.querySelector(".agrd").innerText="B";
    }
    else if(acc<=70){
        document.querySelector(".agrd").innerText="C";
    }
}

userinput.addEventListener("input",()=>{
    const allchars = document.querySelectorAll(".char");
    const inputchars = userinput.value.split("");
    mist=0;
    let j=0;
    for(let char of allchars){
        if(inputchars[j]==null){
            char.classList.remove("success");
            char.classList.remove("fail");
        }
        else if(inputchars[j]==char.textContent){
            char.classList.add("success");
            char.classList.remove("fail");
        }
        else{
            char.classList.add("fail");
            mist++;
        }
        j++;
    }

    document.querySelector(".amist").innerText=mist;
    if (userinput.value.length===text.length) {
        displayResult();
    }
});
startbtn.addEventListener("onclick", startTest);
window.onload=()=>{
    userinput.value="";
    renderNew();
};


    