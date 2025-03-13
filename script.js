function GameBoard(){
    // const board = [
    //     ['', '', ''],
    //     ['', '', ''],
    //     ['', '', '']
    // ];
    const row = 3;
    const column = 3;
    const board = [];
    const value = getPlayerInfo();

    for(let i = 0; i < row; i++ ){
        board[i] = [];
        for(let j = 0; j < column;j++){
            board[i].push(value.getValue());
        }
    }

    const getBoard = () => board;


    const printBoard = () => {
        // console.log(getBoard());
        const updatedBoard = board.map(row => row.map(cell => cell));
        console.log(updatedBoard);
    }

    const checkMove = (row, col, token) => {
        if (board[row][col] === '') {
          board[row][col] = token;

          return true;
        }
        return false;
      };

    return {
        getBoard,
        checkMove,
        printBoard
    }
};


function getPlayerInfo(playerOneName = `Player One`, playerTwoName = `Player Two`) {
    let value = '';


    const players = [
        {
            name: playerOneName,
            token: `X`
        },
        {
            name: playerTwoName,
            token: `O`
        }
    ];


    const getValue = () => value;

    return {
        players,
        getValue
    }
}



function GameController(){
    const board = GameBoard();
    const players = getPlayerInfo().players;
    
    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const checkWin = (token) => {
        const winCombinations = [
        //3 Horizontal
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        //3 Vertical
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        //2 Diagonal
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
        ];
        return winCombinations.some(combination =>
            combination.every(cell => cell === token));
    };

    const checkDraw = (board) => {
       board.every(row => row.every(cell => cell !== ''));
    };

    
    const playNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn.`);
    };

    const playRound = (row,column,activePlayer) => {
             console.log(
                `Dropping ${activePlayer.name}'s token ${activePlayer.token} into row ${row} and column ${column}`
              );
            board.checkMove(row,column,activePlayer.token);
            switchPlayer();
            playNewRound();
    }

    playNewRound();
    playRound(1,1,activePlayer);
    playRound(1,2,activePlayer);
    playRound(1,0,activePlayer);
    playRound(2,1,activePlayer);
    playRound(0,0,activePlayer);
    playRound(2,2,activePlayer);
    playRound(2,0,activePlayer);
    playRound(0,1,activePlayer);


    return {
        switchPlayer,
        playRound
    };
}

const game = GameController();
