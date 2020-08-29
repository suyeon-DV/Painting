const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

//CSS에서 설정한 것은 canvas의 사이즈이다. 박스의 크기를 설정한 것.
//아래에서 설정한 것은 박스 내의 실제 pixel 사이즈를 설정한 것이다. 실제 공간의 사이즈를 설정한 것. 때문에 500=>300으로 바꾸면 canvas의 크기는 500px이지만 내부는 300px로 쪼개지기 때문에 300x300만큼의 공간처럼 쓴다. 또 포인터랑 그리는 위치랑 달라짐.
canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false; // 그리지 않는 상태

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

// 마우스를 클릭했을 때
function onMouseDown(event) {
    painting = true;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}


