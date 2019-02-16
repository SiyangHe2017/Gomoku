function initial(){
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
        var chess = document.getElementById("chess") ;//获取canvas
        chess.height = 900;
        chess.width = 900;
    }
    drawLine();
    drawPoint();
}

function drawPoint(){
    var chess = document.getElementById("chess") ;//获取canvas
    var context = chess.getContext("2d");
    var block_height = chess.height/15;
    context.fillStyle="#000000";
    // alert(block_height);
    // alert(block_height);
    context.beginPath();
    context.arc(block_height/2+7*block_height, block_height/2+7*block_height, block_height/10+1, 0, Math.PI*2,true);
    context.closePath();
    context.fill();

    context.beginPath();
    // context.arc(20+3*40,20+3*40,5,0,Math.PI*2,true);
    context.arc(block_height/2+3*block_height, block_height/2+3*block_height, block_height/10+1, 0, Math.PI*2, true);
    context.closePath();
    context.fill();

    context.beginPath();
    // context.arc(20+11*40,20+11*40,5,0,Math.PI*2,true);
    context.arc(block_height/2+11*block_height, block_height/2+11*block_height, block_height/10+1, 0, Math.PI*2, true);
    context.closePath();
    context.fill();

    context.beginPath();
    // context.arc(20+3*40,20+11*40,5,0,Math.PI*2,true);
    context.arc(block_height/2+3*block_height, block_height/2+11*block_height, block_height/10+1, 0, Math.PI*2, true);
    context.closePath();
    context.fill();

    context.beginPath();
    // context.arc(20+11*40,20+3*40,5,0,Math.PI*2,true);
    context.arc(block_height/2+11*block_height, block_height/2+3*block_height, block_height/10+1, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
}

function drawLine () {//把画线封装成函数
    var chess = document.getElementById("chess") ;//获取canvas
    var context = chess.getContext("2d");
    var block_height = chess.height/15;
    context.strokeStyle = "#000000" ;//画笔的颜色
    context.beginPath();
    for (var i=0; i<=15; i++) {//通过循环画网格
        // context.beginPath();

        // context.moveTo(20,20+i*40);
        context.moveTo(block_height/2, block_height/2+i*block_height);
        // context.lineTo(580,20+i*40);
        context.lineTo(chess.height-block_height/2, block_height/2+i*block_height);
        context.stroke();

        /*
        context.moveTo(20+i*40,20);
        context.lineTo(20+i*40,580);
        */
        context.moveTo(block_height/2+i*block_height, block_height/2);
        context.lineTo(block_height/2+i*block_height, chess.height-block_height/2);
        context.stroke();
    }
}

var oneStep = function(i, j, player){//i,j分别是在棋盘中的定位，me代表白棋还是黑棋
    var chess = document.getElementById("chess");//获取canvas
    var context = chess.getContext("2d");
    var block_height = chess.height/15;
    // alert(block_height);
    context.beginPath() ;
    // context.arc(20+i*40, 20+j*40, 20-1, 0, 2*Math.PI);//圆心会变的，半径改为20-1
    context.arc(block_height/2+i*block_height,block_height/2+j*block_height,block_height/2-1,0,2*Math.PI);
    context.closePath();
    // var gradient = context.createRadialGradient(20+i*40, 20+j*40, 20-1, 20+i*40, 20+j*40, 0);
    var gradient = context.createRadialGradient(block_height/2+i*block_height, block_height/2+j*block_height, block_height/2-1, block_height/2+i*block_height, block_height/2+j*block_height, 0);
    if(player){ // player 为true的时候为黑，player 为false的时候为白。
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    }else{
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient ;
    context.fill();
};

/*
var me = true ;
var chess = document.getElementById("chess");
chess.onclick = function (e){
    var x = e.offsetX ;
    var y = e.offsetY ;
    var i = Math.floor(x/40) ;
    var j = Math.floor(y/40) ;
    oneStep(i,j,me);
    me = !me ;
};
*/

/*
onload = function (){
    drawLine();
    //画棋子
    var chess = document.getElementById("chess") ;//获取canvas
    var context = chess.getContext("2d");
    context.beginPath() ;
    context.arc(200,200,100,0,2*Math.PI);
    context.closePath() ;
    var gradient = context.createRadialGradient(200, 200, 50, 200, 200, 20);
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(1, "#636766");
    context.fillStyle = gradient ;
    context.fill();
};
*/
