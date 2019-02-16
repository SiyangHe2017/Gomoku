var board_length = 15;
var chessBoard = [];
var black = 1;
var white = -1;
var color_none = 0;
var board_boundary = 11;
var game_status = 0; // 0代表未开始，1代表开始。
var total_steps = 0; // 当step到达225时，平局。

// true 代表黑棋，false 代表白棋。
var human ;
var human_color;
var AI ;
var AI_color ;

for (var i = 0; i < board_length; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < board_length; j++) {
        chessBoard[i][j] = 0;
    }
}

var chess = document.getElementById("chess"); // 此时的chess.height为600px,
// 只有完成onload以后才可能变化

chess.onclick = function (e) {
    if (game_status === 1) {

        var block_length = chess.height/board_length;

        var x = e.offsetX;
        var y = e.offsetY;

        var i = Math.floor(x / block_length);
        var j = Math.floor(y / block_length);

        if (chessBoard[i][j] === color_none) {
            // alert(chessBoard.length);
            oneStep(i, j, human);
            check_draw();
            if (human) {
                chessBoard[i][j] = black;
            } else {
                chessBoard[i][j] = white;
            }

            if (check_win(i, j, human_color)) {
                setTimeout(function () {
                    alert("YOU WIN!!!")
                }, 500);
                game_status = 0;
                reverse_button();
            } else {
                AI_move();
            }
        }
    }
};

function check_draw(){
    total_steps += 1;
    if(total_steps===225){
        setTimeout(function(){alert("TIE GAME!!!")}, 500);
        game_status = 0;
        reverse_button();
    }
}

function AI_move() {
    if (game_status === 1) {
        var max_position = AI_position();
        var position_x = max_position[0];
        var position_y = max_position[1];
        oneStep(position_x, position_y, AI);
        check_draw();
        chessBoard[position_x][position_y] = AI_color;
        if (check_win(position_x, position_y, AI_color)) {
            setTimeout(function () {
                alert("YOU LOSE!!!")
            }, 500);
            game_status = 0;
            reverse_button();
        }
    }
}

function startblack() {
    if (game_status === 0) {
        game_status = 1;
        change_button();
        human = true;
        human_color = black;
        AI = !human;
        AI_color = white;
        refresh();
    }
}

function startwhite() {
    if (game_status === 0) {
        game_status = 1;
        change_button();
        human = false;
        human_color = white;
        AI = !human;
        AI_color = black;
        refresh();
        AI_move();
    }
}

function change_button(){
    document.getElementById("blackbutton").style.opacity = "0.4";
    document.getElementById("whitebutton").style.opacity = "0.4";
    document.getElementById("blackbutton").style.cursor = "not-allowed";
    document.getElementById("whitebutton").style.cursor = "not-allowed";
}

function reverse_button(){
    document.getElementById("blackbutton").style.opacity = "1";
    document.getElementById("whitebutton").style.opacity = "1";
    document.getElementById("blackbutton").style.cursor = "default";
    document.getElementById("whitebutton").style.cursor = "default";
}

function AI_position() {
    var max_value = 0;
    var current_value = 0;
    var max_position = [0, 0];
    var current_position = [0, 0];
    var current_value_AI_color = 0;
    var current_value_non_AI_color = 0;


    if (chessBoard[Math.floor(board_length / 2)][Math.floor(board_length / 2)] === color_none) {
        max_position = [Math.floor(board_length / 2), Math.floor(board_length / 2)];
        return max_position;
    }
    if ((chessBoard[Math.floor(board_length / 2)][Math.floor(board_length / 2)] !== AI_color) &&
        (chessBoard[Math.floor(board_length / 2)][Math.floor(board_length / 2) + 1] === color_none)) {
        max_position = [Math.floor(board_length / 2), Math.floor(board_length / 2) + 1];
        return max_position;
    }

    for (var i = 0; i < board_length; i++) {
        for (var j = 0; j < board_length; j++) {
            if (chessBoard[i][j] === color_none) {
                current_position = [i, j];
                current_value_AI_color = evaluate(current_position, AI_color);
                current_value_non_AI_color = evaluate(current_position, human_color);
                if (current_value_non_AI_color < 0) {
                    current_value_non_AI_color = 0;
                }
                current_value = current_value_AI_color + current_value_non_AI_color;
                if (current_value > max_value) {
                    max_value = current_value;
                    max_position = current_position;
                }
            }
        }
    }
    return max_position;
}



function refresh() {
    refresh_canvas();
    drawLine();
    drawPoint();
    refresh_chessboard();
}

function refresh_canvas() {
    var context = chess.getContext("2d");
    context.fillStyle = "#cd9a5b";
    context.fillRect(0, 0, 600, 600);
}

function refresh_chessboard() {
    for (var i = 0; i < board_length; i++) {
        for (var j = 0; j < board_length; j++) {
            chessBoard[i][j] = color_none;
        }
    }
}

function check_win(i, j, color) {
    var current_position = [i, j];
    for (var direction = 0; direction < 4; direction++) {
        // ----------(1) 连五 11111 50000分
        // 连五 1111*
        if ((new_position_color(current_position, direction, -1) === color &&
            new_position_color(current_position, direction, -2) === color &&
            new_position_color(current_position, direction, -3) === color &&
            new_position_color(current_position, direction, 0) === color &&
            new_position_color(current_position, direction, -4) === color) ||
            (new_position_color(current_position, direction + 4, -1) === color &&
                new_position_color(current_position, direction + 4, -2) === color &&
                new_position_color(current_position, direction + 4, -3) === color &&
                new_position_color(current_position, direction + 4, 0) === color &&
                new_position_color(current_position, direction + 4, -4) === color)) {
            return true;
        }
        // 连五 111*1
        if ((new_position_color(current_position, direction, -1) === color &&
            new_position_color(current_position, direction, -2) === color &&
            new_position_color(current_position, direction, -3) === color &&
            new_position_color(current_position, direction, 0) === color &&
            new_position_color(current_position, direction, 1) === color) ||
            (new_position_color(current_position, direction + 4, -1) === color &&
                new_position_color(current_position, direction + 4, -2) === color &&
                new_position_color(current_position, direction + 4, -3) === color &&
                new_position_color(current_position, direction, 0) === color &&
                new_position_color(current_position, direction + 4, 1) === color)) {
            return true;
        }
        // 连五 11*11
        if (new_position_color(current_position, direction, -1) === color &&
            new_position_color(current_position, direction, -2) === color &&
            new_position_color(current_position, direction, 0) === color &&
            new_position_color(current_position, direction, 1) === color &&
            new_position_color(current_position, direction, 2) === color) {
            return true;
        }
    }
    return false;
}








