// 1: Despot some money
// 2: Determine number of lines to bet on
// 3: Collect a bet amount
// 4: pin the slot machine
// 5: check if the user won
// 6: Give the user their winnings
// 7: play again


/*
Last Updated: 13th July 2023
Now will have to work on checking if the user won or not, and if won, then give their winnings to them.

Latest: Just the last 2 steps are left, that's it
Latest: They are finished (13th July 2023)
*/
function deposit_olderSyntax(){
    return 1;
}

// Importing prompt( something ;) to get the input of the user from the prompt
const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;


// In the object, we can also omit the '' in the keys, cause that's required in Python but not necessary in JavaScipt...
const SYMBOLS_COUNT = {
    'A': 2,
    'B': 4,
    'C': 6,
    'D': 8
};

const SYMBOL_VALUES = {
    'A': 5,
    'B': 4,
    'C': 3,
    'd': 2
};











const deposit = () => {
    // both the function are the same, it's just the difference of the syntax, that's it
    while(true){
        // By default an input is string, just like in Python
        const depositAmount = prompt("Enter a deposit amount: ");

        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log(`Invalid Deposit amount, try again ;(--> ${typeof numberDepositAmount}`);
        }
        else{
            return numberDepositAmount;
            // console.log(`${typeof numberDepositAmount}`)
        }
    }
}

const getNumberOfLines = () => {
    // both the function are the same, it's just the difference of the syntax, that's it
    while(true){
        // By default an input is string, just like in Python
        const lines = prompt("Enter the number of lines: ");

        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines>3){
            console.log(`Invalid number of lines, try again ;(--> ${typeof numberOfLines}`);
        }
        else{
            return numberOfLines;
            // console.log(`${typeof numberDepositAmount}`)
        }
    }
}


const getBet = (balance,lines) => {
        // both the function are the same, it's just the difference of the syntax, that's it
        while(true){
            // By default an input is string, just like in Python
            const bet = prompt("Enter the total Bet per line: ");
    
            const numberBet = parseFloat(bet);
            
            // The max bet can be the balance/numberOfLines
            if(isNaN(numberBet) || numberBet <= 0 || numberBet > (balance/ lines)){
                console.log(`Invalid Deposit amount, try again ;(--> ${typeof numberBet}`);
            }
            else{
                return numberBet;
                // console.log(`${typeof numberDepositAmount}`)
            }
        }
    
}

const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT) ){
        // console.log(`${symbol} and ${count}`)
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
    // const reels = [[],[],[]]
    const reels = []
    for(let i=0;i<COLS;i++){
        reels.push([]);
        // the below syntax is to copy an array to other array
        // to copy the contents of symbols array to reelSymbols
        const reelSymbols = [...symbols];

        for(let j=0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    // const rows=[];
    let ROWS = reels[0].length;
    let COLS = reels.length; 
    let newReels=[...reels];
    for(let i=0;i<ROWS;i++){
        for(let j=i;j<COLS;j++){
            let temp=newReels[i][j];
            newReels[i][j]=newReels[j][i];
            newReels[j][i]=temp;
        }
    }
    // const newReels= [1,2,3,4];
    return newReels;
}

const printReels = (reels) => {
    reelString="";
    for(const [ind1,ls] of reels.entries()){
        for(const [ind2,symbol] of ls.entries()){
            reelString+=symbol;
            if(ind2!=ls.length-1){
                reelString+= " | ";
            }
        }
        if(ind1!=reels.length-1){
            reelString+="\n";
        }
        
    }
    return reelString;
}

const getWinnings = (reels,bet) => {
    
    let noOfLinesWon=0,amountWon=0;
    for(const ls of reels){
        // If i will find that some symbol is not the same as the 1st one, then just make this var false and break
        let won=true;
        // console.log(`${ls}`);
        for(const symb of ls){
            if(symb!=ls[0]){
                won=false;
                break;
            }
        }
        if(won==true){
            noOfLinesWon+=1;
            amountWon += bet * SYMBOL_VALUES[ls[0]];
        }
    }
    console.log(`Return amountWon: ${amountWon}`)
    return [noOfLinesWon,amountWon];
}

    
const game = () => {
    // for simplicity sake starting the balance of the user from 1245
    balance = 1245;
    while(true){
        // let balance = deposit();
        
        console.log(`You have a balance of : ${balance}`);

        const numberOfLines = getNumberOfLines();
        // console.log(`No. Of Lines: ${numberOfLines}`);

        const bet=getBet(balance,numberOfLines);
        console.log(`Bet is: ${bet}`)

        // Update the balance of the user
        balance -= bet*numberOfLines

        console.log(`${SYMBOL_VALUES}`)

        var reels = spin();
        console.log(`${reels}`);

        const newReels = transpose(reels)
        console.log(`${newReels}`)

        reelString = printReels(newReels)
        console.log(`${reelString}`)

        const [noOfWinnings,totalAmountWon] = getWinnings(newReels,bet);

        // Will print(or clog, whatever, happens when you code everytime in python...) ';)' when the user wins > 0 else will print :( using the ternary operator stuff of JS which is all same as cpp
        console.log(`Won on  ${noOfWinnings} rows `+((noOfWinnings>0)?';)':':(')+` and Total Amount won: ${totalAmountWon} your total bet was ${bet*numberOfLines}`);

        balance += totalAmountWon;

        if(balance<=0){
            console.log("You don't have any money left in your balance, exiting the game ;( ")
            break;
        }
        choice = prompt("Do you wanna play again? (Yes/No): ")

        if(choice=="No") break;
    }
}

game();