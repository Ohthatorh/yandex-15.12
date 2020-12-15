const fs = require('fs');
let param = process.argv[2];
const M = 5;
const N = 5;
const ONE_SECOND_FOR_TIMER = 1000;
let matrix = [];

(param) ? fillMatrixFromFile('file.txt') : generateFirstMatrix(M, N);

setInterval(refreshMatrix, ONE_SECOND_FOR_TIMER);

function fillMatrixFromFile(file) {
    const text = fs.readFileSync(file, 'utf8').replace(/[^0-1]/g, '');
    let count = 0;
    for (let i = 0; i < Math.sqrt(text.length); i++) {
        matrix[i] = [];
        for (let j = 0; j < Math.sqrt(text.length); j++) {
            (text[count] === undefined) ? matrix[i][j] = getNumber() : matrix[i][j] = Number(text[count]);
            count++;
        }
    }
}

function refreshMatrix() {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            const nums = getAroundElements(matrix, i, j);
            let count = 0;
            for (let key in nums) {
                if (nums[key] === 1) count++;
            }
            (matrix[i][j] === 0 && count >= 3) ? matrix[i][j] = 1 :
            (matrix[i][j] !== 0 && count < 2) ? matrix[i][j] = 0 :
            (matrix[i][j] !== 0 && count > 3) ? matrix[i][j] = 0 :
            matrix[i][j] = 1;
        }
    }
    console.log(matrix)
}

function generateFirstMatrix(x, y) {
    for (let i = 0; i < x; i++) {
        matrix[i] = [];
        for (let j = 0; j < y; j++) {
            matrix[i][j] = getNumber();
        }
    }
}

function getNumber() {
    const MIN = 0;
    const MAX = 1;
    return Math.round(MIN + Math.random() * (MAX - MIN));
}

function getAroundElements(arr, x, y) {
    const elements = {    
        leftNumber: (y === 0) ? arr[x][arr[y].length-1] : arr[x][y-1],
        rightNumber: (y === arr[y].length-1) ? arr[x][0] : arr[x][y+1],

        topNumber: (x === 0) ? arr[arr[x].length-1][y] : arr[x-1][y],
        botNumber: (x === arr[x].length-1) ? arr[0][y] : arr[x+1][y],

        leftTopNumber: 
            (x === 0 && y === 0) ? arr[arr[x].length-1][arr[y].length-1] : 
            (x !== 0 && y === 0) ? arr[x-1][arr[y].length-1] : 
            (x === 0 && y !== 0) ? arr[arr[x].length-1][y-1] : 
            arr[x-1][y-1],
            
        rightBotNumber: 
            (x === arr[x].length-1 && y === arr[y].length-1) ? arr[0][0] : 
            (x === arr[x].length-1 && y !== arr[y].length-1) ? arr[0][y+1] :
            (x !== arr[x].length-1 && y === arr[y].length-1) ? arr[x+1][0] : 
            arr[x+1][y+1],

        rightTopNumber: 
            (x === 0 && y === arr[y].length-1) ? arr[arr[x].length-1][0] : 
            (x === 0 && y !== arr[y].length-1) ? arr[arr[x].length-1][y+1] : 
            (x !== 0 && y === arr[y].length-1) ? arr[x-1][0] : 
            arr[x-1][y+1],

        leftBotNumber:
            (x === arr[x].length-1 && y === 0) ? arr[0][arr[y].length-1] : 
            (x !== arr[x].length-1 && y === 0) ? arr[x+1][arr[y].length-1] : 
            (x === arr[x].length-1 && y !== 0) ? arr[0][y-1] : 
            arr[x+1][y-1],
    };
    return elements;
}