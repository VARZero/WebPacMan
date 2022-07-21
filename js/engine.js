const scrn = document.getElementById("scr");
/** @type {CanvasRenderingContext2D} */
const scx = scrn.getContext("2d");

let SplayerX, SplayerY, NplayerX, Nplaty;
let enemySpX, enemySpY;

function mapScreenDraw(){
    let nowX, nowY;
    let boxOneH = scrn.scrollHeight / map.length, boxOneW = scrn.scrollWidth / map[0].length;
    
    for(let th = 0; th < map.length; th++){
        for(let tw = 0; tw < map[0].length; tw++){
            nowX = boxOneW*tw; nowY = boxOneH*th;
            scx.moveTo(nowX, nowY);
            if (map[th][tw] != 2){
                switch(map[th][tw]){
                    case 0:
                        scx.fillStyle = "yellow";
                        scx.arc(nowX + (boxOneW/2), nowY + (boxOneH/2), 3, 0, Math.PI*2, 0);
                        scx.fill();
                    break;
                    case 3:
                        if (enemySpX != undefined){
                            console.error("적 스폰지점은 하나여야만 합니다. 좌상단에 지정된 스폰지점으로 등록하겠습니다.");
                            break;
                        }
                        enemySpX = nowX + (boxOneW/2);
                        enemySpY = nowY + (boxOneH/2);
                    break;
                    case 4:
                        if (SplayerX != undefined){
                            console.error("플레이어 스폰지점은 하나여야만 합니다. 좌상단에 지정된 스폰지점으로 등록하겠습니다.");
                            break;
                        }
                        SplayerX = nowX + (boxOneW/2);
                        SplayerY = nowY + (boxOneH/2);
                    break;
                    case 5:
                        scx.fillStyle = "yellow";
                        scx.arc(nowX + (boxOneW/2), nowY + (boxOneH/2), 7, 0, Math.PI*2, 0);
                        scx.fill();
                    break
                }
                continue;
            }

            scx.beginPath();
            scx.strokeStyle = "blue"; scx.lineWidth = 2; // Wall Style

            // Left
            scx.moveTo(nowX, nowY);
            if (tw == 0){
                scx.lineTo(nowX, nowY + boxOneH);
            }
            else if (map[th][tw-1] != 2){
                scx.lineTo(nowX, nowY + boxOneH);
            }

            // Right
            scx.moveTo(nowX + boxOneW, nowY);
            if (tw == (map[0].length - 1)){
                scx.lineTo(nowX + boxOneW, nowY + boxOneH);
            }
            else if (map[th][tw+1] != 2){
                scx.lineTo(nowX + boxOneW, nowY + boxOneH);
            }

            // Up
            scx.moveTo(nowX, nowY);
            if (th == 0){
                scx.lineTo(nowX + boxOneW, nowY);
            }
            else if (map[th-1][tw] != 2){
                scx.lineTo(nowX + boxOneW, nowY);
            }

            // Down
            scx.moveTo(nowX, nowY + boxOneH);
            if (th == (map.length - 1)){
                scx.lineTo(nowX + boxOneW, nowY + boxOneH);
            }
            else if (map[th+1][tw] != 2){
                scx.lineTo(nowX + boxOneW, nowY + boxOneH);
            }
            scx.stroke();
        }
    }
}

function playerDraw(pX, pY){
    scx.beginPath(); scx.fillStyle = "yellow";
    scx.arc(pX, pY, 10, Math.PI*0.2, Math.PI*1.8);
    scx.lineTo(pX, pY);
    scx.fill()
}

function playerMove(){

}

mapScreenDraw();
playerDraw(SplayerX, SplayerY)