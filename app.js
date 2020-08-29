const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

//strokeStyle과 fillStyle이 같은 defalt 값을 가져서 변수 만듬
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

// **Line Drawing**

//CSS에서 설정한 것은 canvas의 사이즈이다. 박스의 크기를 설정한 것.
//아래에서 설정한 것은 박스 내의 실제 pixel 사이즈를 설정한 것이다. 실제 공간의 사이즈를 설정한 것. 때문에 500=>300으로 바꾸면 canvas의 크기는 500px이지만 내부는 300px로 쪼개지기 때문에 300x300만큼의 공간처럼 쓴다. 또 포인터랑 그리는 위치랑 달라짐.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//배경색 default값 지정.위 두개를 지정해놓지 않을 시 이미지 저장을 하게되면 background 색이 투명이 되어 버린다.
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false; // 그리지 않는 상태
let filling = false; // fill off 상태

/* note
console창에서 event를 열어서보면 clientx, clienty가 있다. 
clientx, clienty: window 상에서의 좌표값
offsetx, offsety: canvas(특정 영역) 안에서의 좌표값
이므로 canvas의 좌표값을 얻을 수 있는 offset을 이용해야한다.
canvas를 window 사이즈로 만들었다면 client와 offset의 차이는 없을 것이다. 
*/

// 마우스가 그리기를 멈출 때(캔버스를 벗어났을 때)
function stopPainting() {
    painting = false;
}

// 그리기 시작할 때
function startPainting() {
    painting = true;
}

//마우스가 캔버스 위에서 움직일 때
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    //path 시작 및 선 그리기
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y); // lineTo: 그릴 위치를 잡는 것. 선을 그을 때 자 대는 것과 같음.
        ctx.stroke(); // stkoe: 실제로 그리는 것. 선이 나타남.
    }
}

// 색 바꾸는 함수
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color; //Fill mode일 때 stroke 색상과 같은 색상으로 변하도록 지정
}

// range 조절하는 함수
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// Fill 버튼: Mode 변경함수(paint or not paint)
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

// Canvas 클릭하면 배경으로 색이 채워지는 함수
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

// context menu(canvas에서 오른쪽 클릭하면 나오는 메뉴) 나오지 않게하는 함수
function handleCM(event) {
    event.preventDefault();
}

// Save 버튼 눌렀을 때 저장하는 함수
function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PainJS[❤]";
    link.click(); // a tag 눌렀을 때 처럼!!
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

//**Color selector**
console.log(Array.from(colors));
//querySelectorAll(querySelector)를 사용하면 nodelist가 반환된다.
//getelementbyclassname: HTML??? object 반환됨
// 둘 다 object이기 때문에 Array.from()을 사용해서 Array로 변환시켜주면 됨

Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
);

// **Range controler**
if (range) {
    range.addEventListener("input", handleRangeChange);
}

// **Mode 버튼(Fill btn) click 시 paint로 바뀜**
if (mode) {
    mode.addEventListener("click", handleModeClick);
}

//**Save 버튼**
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
