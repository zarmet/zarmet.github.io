let player = 'x';
let selectedSquares = [];


function audio (audioURL) {
    let audio = new Audio(audioURL);
    audio.play ();
}

function disableClick () {
    body.style.pointerEvents = 'none';
    setTimeout( function () {body.style.pointerEvents = 'auto';}, 1000);
}

function resetGame () {
    for (let i = 0; i < 9; i++) {
        let square=document.getElementById(String(i));
        square.style.backgroundImage = '' ;

    }
    selectedSquares = [];
}




function drawWinLine (coordx1, coordy1, coordx2, coordy2, winner) {
    //This line accesses our html canvas element.
    const canvas = document.getElementById('win-lines');
    //This line gives us access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    //This line indicates where the start of a lines x axis is.
    let x1 = coordx1,
    y1 = coordy1,
    x2 = coordx2,
    y2 = coordy2,
    x = x1,
    y = y1;
    

//This function interacts with the cavnas
    function animateLineDrawing () {
        const animationLoop = requestAnimationFrame (animateLineDrawing);
            
        c.clearRect(0, 0, 608, 608)
        c.beginPath();
        c.moveTo (x1, y1)
        c.lineTo(x, y)
        c.lineWidth = 10;
        c.strokeStyle = 'rgb(233, 212, 92, .8)';
        c.stroke();
            
        if (x1 <= x2 && y1 <= y2) {
                if (x < x2) { x += 10; }
                if (y < y2) { y += 10; }
                if (x >= x2 && y >= y2) { cancelAnimationFrame (animationLoop); }
            }
        if (x1 <= x2 && y1 >= y2) {
                if (x < x2) { x += 10; }
                if (y > y2) { y -= 10; }
                if (x >= x2 && y <= y2) { cancelAnimationFrame (animationLoop); }
            }
        }

    function clear () {
            const animationLoop = requestAnimationFrame(clear);
            c.clearRect(0, 0, 608, 608);
            cancelAnimationFrame(animationLoop);
        }

        disableClick ();
        if (winner=='x') {
            audio ('./media/winGame.mp3');}
        else {
            audio ('./media/breath.mp3')
        }
        animateLineDrawing ();
        setTimeout(function () {clear(); resetGame();}, 1000);
    }


function checkWin() {
   
    if (arrayIncludes ('0x', '1x', '2x')) { drawWinLine (50, 100, 558, 100, 'x') ;}
    else if (arrayIncludes ('3x', '4x', '5x')) { drawWinLine (50, 304, 558, 304, 'x'); }
    else if (arrayIncludes ('6x', '7x', '8x')) { drawwinLine (50, 508, 558, 508, 'x'); }
    else if (arrayIncludes ('0x', '3x', '6x')) { drawWinLine (100, 50, 100, 558, 'x'); }
    else if (arrayIncludes ('1x', '4x', '7x')) { drawWinLine (304, 50, 304, 558, 'x'); }
    else if (arrayIncludes ('2x', '5x', '8x')) { drawWinLine (508, 50, 508, 558, 'x'); }
    else if (arrayIncludes ('6x', '4x', '2x')) { drawWinLine (100, 508, 510, 90, 'x'); }
    else if (arrayIncludes ('0x', '4x', '8x')) { drawWinLine (100, 100, 520, 520, 'x'); }
    else if (arrayIncludes ('0o', '1o', '2o')) { drawWinLine (50, 100, 558, 100); }
    else if (arrayIncludes ('3o', '4o', '5o')) { drawWinLine (50, 304, 558, 304); }
    else if (arrayIncludes ('6o', '7o', '8o')) { drawWinLine (50, 508, 558, 508); }
    else if (arrayIncludes ('0o', '3o', '6o')) { drawWinLine (100, 50, 100, 558); }
    else if (arrayIncludes ('1o', '4o', '7o')) { drawWinLine (304, 50, 304, 558); }
    else if (arrayIncludes ('2o', '5o', '8o')) { drawWinLine (508, 50, 508, 558); }
    else if (arrayIncludes ('6o', '4o', '2o')) { drawWinLine (100, 508, 510, 90); }
    else if (arrayIncludes ('0o', '4o', '8o')) { drawWinLine (100, 100, 520, 520); }
    //squares are selected the code executes.
    else if (selectedSquares.length >= 9) {
    //This function playes the tie game sound.
        audio ('./media/wookiee.mp3');
    // This function sets a .3 second timer before the reset Game is called.
        setTimeout(function () { resetGame(); }, 1000);
        }

    function arrayIncludes (squareA, squareB, squareC) {
        const a= selectedSquares.includes(squareA);
        const b= selectedSquares.includes(squareB);
        const c= selectedSquares.includes(squareC);
        
        if (a === true && b === true && c===true) {return true};
        
        }
    }


function placeXorO (squareNum) {
    if (!selectedSquares.some(element=>element.includes(squareNum))) {
        let select = document.getElementById(squareNum);
        if (player === 'x') {
            select.style.backgroundImage ="url('./images/rebels.png')";
        } else {
            select.style.backgroundImage ="url('./images/empire.png')";
        }
        selectedSquares.push(squareNum + player);
        checkWin ();

        if (player === 'x') {
            player = 'o';
        } else {
            player = 'x';
        }

        if (player === 'o') {
            disableClick();
            setTimeout(function () { computersTurn (); }, 1500)
        }
        
        audio('./media/place.mp3');

        return true;

    }
    function computersTurn () {
        let success = false;
        let pickSquare;

        while (!success) {
            pickSquare = String(Math.floor(Math.random()*9));
            if (placeXorO(pickSquare)) {
                placeXorO(pickSquare);

                success = true;
            };
        }
    }


}














