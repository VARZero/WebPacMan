const scrn = document.getElementById("scr");
/** @type {CanvasRenderingContext2D} */
const scx = scrn.getContext("2d");

let score = 0; let level = 1;

let moving = 2; let mth = 0;
let nxmoving = 2;
let boxOneW, boxOneH;
let SplayerX, SplayerY, NplayerX, NplayerY;
let lastPlayerX, lastPlayerY;
let enemySpX, enemySpY;
let cpX, cpY; cpX = 0; cpY = 0;

function mapScreenDraw(){
    let nowX, nowY;
    boxOneH = parseInt( scrn.scrollHeight / map.length ), boxOneW = parseInt( scrn.scrollWidth / map[0].length );
    
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
                        map[th][tw] = 10;
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
                        NplayerX = tw;
                        SplayerY = nowY + (boxOneH/2); 
                        NplayerY = th;
                        lastPlayerX = SplayerX; lastPlayerY = SplayerY;
                    break;
                    case 5:
                        scx.fillStyle = "yellow";
                        scx.arc(nowX + (boxOneW/2), nowY + (boxOneH/2), 7, 0, Math.PI*2, 0);
                        scx.fill();
                        map[th][tw] = 50;
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

function playerDraw(pX, pY){ // 그리기 및 충돌 처리
    // Draw
    scx.beginPath(); scx.fillStyle = "black";
    scx.arc(lastPlayerX, lastPlayerY, 11, 0, Math.PI*2); scx.fill();
    scx.beginPath(); scx.fillStyle = "yellow";
    scx.arc(pX, pY, 10, Math.PI*(0.2-(0.2*mth)), Math.PI*(1.8+(0.2*mth)));
    scx.lineTo(pX, pY);
    lastPlayerX = pX; lastPlayerY = pY;
    scx.fill();
    
    // mouth
    if (mth == 1) {mth = 0;}
    else {mth = 1;}
    
    // collision check
    NplayerX = parseInt(SplayerX/boxOneW); NplayerY = parseInt(SplayerY/boxOneH);
    cpX = Math.abs(( boxOneW - (SplayerX % boxOneW) ) / boxOneW); cpY = Math.abs(( boxOneH - (SplayerY % boxOneH) ) / boxOneH); // 구역 침범 비율
    // 코인 처리부분
    if (map[NplayerY][NplayerX] == 10 && cpX >= 0.35 && cpY >= 0.35 ) {
        score += 1; map[NplayerY][NplayerX] = 0;
        scx.fillStyle = "black";
        scx.arc(NplayerX*boxOneW + (boxOneW/2), NplayerY*boxOneH + (boxOneH/2), 4, 0, Math.PI*2, 0);
        scx.fill();
    }
    // 빅코인 처리부분
        if (map[NplayerY][NplayerX] == 40 && cpX >= 0.2 && cpY >= 0.2 ) {
        score += 1; map[NplayerY][NplayerX] = 0;
        scx.fillStyle = "black";
        scx.arc(NplayerX*boxOneH + (boxOneW/2), NplayerY*boxOneH + (boxOneH/2), 4, 0, Math.PI*2, 0);
        scx.fill();
    }
}

function playerMove(){
    xx = 0; yy = 0;
    switch (moving){
        case 0: return; break; //Stop
        case 1: xx = -1; break; // Left
        case 2: xx = 1; break; // Right
        case 3: yy = -1; break; // Up
        case 4: yy = 1; // Down
    }
    if (SplayerX == ((NplayerX*boxOneW)+parseInt(boxOneW/2)) || SplayerY == ((NplayerY*boxOneH)+parseInt(boxOneH/2))){
        if (nxmoving != moving){
            if (nxmoving == 1 && map[NplayerY][NplayerX-1] != 2){moving = 1;}
            if (nxmoving == 2 && map[NplayerY][NplayerX+1] != 2){moving = 1;}
            if (nxmoving == 3 && map[NplayerY-1][NplayerX] != 2){moving = 1;}
            if (nxmoving == 4 && map[NplayerY+1][NplayerX] != 2){moving = 1;}
        }
        if (map[NplayerY+yy][NplayerX+xx] == 2){
            moving = 0; nxmoving = 0;
            return;
        }
    }
    SplayerX += xx;
    SplayerY += yy;
}

function keyCheck(pkey){
    if (pkey.key == "ArrowLeft"){nxmoving = 1;}
    else if (pkey.key == "ArrowRight"){nxmoving = 2;}
    else if (pkey.key == "ArrowUp"){nxmoving = 3;}
    else if (pkey.key == "ArrowDown"){nxmoving = 4;}
}

mapScreenDraw();
playerDraw(SplayerX, SplayerY);
setInterval(() => {
    playerDraw(SplayerX, SplayerY);
    playerMove();
}, 15);