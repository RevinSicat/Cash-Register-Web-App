//HTML Elements Variables
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const clearBtn = document.getElementById("clear-btn");
const changeDueDiv = document.getElementById("change-due");
const totalElement = document.getElementById("total");
const cidDiv = document.getElementById("cid-div");
const transactionDiv = document.getElementById("transaction-div");

//Variables
let price = 3.26;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
let backupCid = cid;

//Function
const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
const formatAmount = (amount) => {
    return amount.toFixed(2).replace(/\.?0+$/, '');
};
const updateData = () => {
    totalElement.textContent = `Total: $${price}`;
    cidDiv.innerHTML = `<h2>Change in drawer:</h2>`
    cid.forEach((index)=>{
        cidDiv.innerHTML +=`<p>${formatName(index[0])}: $${index[1]}</p>`;
    });
    
}
const updatechangeDueDiv = (status, arr) => {
    if (status === "open"){
        changeDueDiv.innerHTML =`<p>Status: OPEN</p>`;
        arr.forEach((index)=>{
            changeDueDiv.innerHTML +=`<p>${index}</p>`;
        });
        updateData();
    }
    else if (status === "close"){
        changeDueDiv.innerHTML =`<p>Status: CLOSED</p>`;
        arr.forEach((index)=>{
            changeDueDiv.innerHTML +=`<p>${index}</p>`;
        });
        updateData();
    }
    else if (status === "insufficient"){
        changeDueDiv.innerHTML =`<p>Status: INSUFFICIENT_FUNDS</p>`;
        updateData();
    }
}
const computeChange = (cash, total, arr) => {
    let change = parseFloat((cash - total).toFixed(2));
    let totalCidValue = 0;
    let cidArr = [];

    arr.forEach(innerArr => {
        totalCidValue += innerArr[1];
    });
    let changeHundred = parseInt(change / 100);
    if (changeHundred != 0 && changeHundred * 100 <= arr[8][1]) {
        change = parseFloat((change - changeHundred * 100).toFixed(2));
        arr[8][1] -= changeHundred * 100;
        cidArr.push(`HUNDRED: $${changeHundred * 100}`);
    } 
    else if (changeHundred != 0 && changeHundred * 100 > arr[8][1]) {
        change = parseFloat((change - arr[8][1]).toFixed(2));
        cidArr.push(`HUNDRED: $${arr[8][1]}`);
        arr[8][1] = 0;
    }
    let changeTwenty = parseInt(change / 20);
    if (changeTwenty != 0 && changeTwenty * 20 <= arr[7][1]) {
        change = parseFloat((change - changeTwenty * 20).toFixed(2));
        arr[7][1] -= changeTwenty * 20;
        cidArr.push(`TWENTY: $${changeTwenty * 20}`);
    } 
    else if (changeTwenty != 0 && changeTwenty * 20 > arr[7][1]) {
        change = parseFloat((change - arr[7][1]).toFixed(2));
        cidArr.push(`TWENTY: $${arr[7][1]}`);
        arr[7][1] = 0;
    }
    let changeTen = parseInt(change / 10);
    if (changeTen != 0 && changeTen * 10 <= arr[6][1]) {
        change = parseFloat((change - changeTen * 10).toFixed(2));
        arr[6][1] -= changeTen * 10;
        cidArr.push(`TEN: $${changeTen * 10}`);
    } 
    else if (changeTen != 0 && changeTen * 10 > arr[6][1]) {
        change = parseFloat((change - arr[6][1]).toFixed(2));
        cidArr.push(`TEN: $${arr[6][1]}`);
        arr[6][1] = 0;
    }
    let changeFive = parseInt(change / 5);
    if (changeFive != 0 && changeFive * 5 <= arr[5][1]) {
        change = parseFloat((change - changeFive * 5).toFixed(2));
        arr[5][1] -= changeFive * 5;
        cidArr.push(`FIVE: $${changeFive * 5}`);
    } 
    else if (changeFive != 0 && changeFive * 5 > arr[5][1]) {
        change = parseFloat((change - arr[5][1]).toFixed(2));
        cidArr.push(`FIVE: $${arr[5][1]}`);
        arr[5][1] = 0;
    }
    let changeOne = parseInt(change / 1);
    if (changeOne != 0 && changeOne * 1 <= arr[4][1]) {
        change = parseFloat((change - changeOne * 1).toFixed(2));
        arr[4][1] -= changeOne * 1;
        cidArr.push(`ONE: $${changeOne * 1}`);
    } 
    else if (changeOne != 0 && changeOne * 1 > arr[4][1]) {
        change = parseFloat((change - arr[4][1]).toFixed(2));
        cidArr.push(`ONE: $${arr[4][1]}`);
        arr[4][1] = 0;
    }
    let changeQuarter = parseInt(change / 0.25);
    if (changeQuarter != 0) {
        if (changeQuarter * 0.25 <= arr[3][1]) {
            const deducted = changeQuarter * 0.25;
            change = parseFloat((change - deducted).toFixed(2));
            arr[3][1] -= deducted;
            if (deducted > 0) {
                cidArr.push(`QUARTER: $${formatAmount(deducted)}`);
            }
        } else {
            const deducted = arr[3][1];
            change = parseFloat((change - deducted).toFixed(2));
            if (deducted > 0) {
                cidArr.push(`QUARTER: $${formatAmount(deducted)}`);
            }
            arr[3][1] = 0;
        }
    }

    let changeDime = parseInt(change / 0.10);
    if (changeDime != 0) {
        if (changeDime * 0.10 <= arr[2][1]) {
            const deducted = changeDime * 0.10;
            change = parseFloat((change - deducted).toFixed(2));
            arr[2][1] -= deducted;
            if (deducted > 0) {
                cidArr.push(`DIME: $${formatAmount(deducted)}`);
            }
        } else {
            const deducted = arr[2][1];
            change = parseFloat((change - deducted).toFixed(2));
            if (deducted > 0) {
                cidArr.push(`DIME: $${formatAmount(deducted)}`);
            }
            arr[2][1] = 0;
        }
    }

    let changeNickel = parseInt(change / 0.05);
    if (changeNickel != 0) {
        if (changeNickel * 0.05 <= arr[1][1]) {
            const deducted = changeNickel * 0.05;
            change = parseFloat((change - deducted).toFixed(2));
            arr[1][1] -= deducted;
            if (deducted > 0) {
                cidArr.push(`NICKEL: $${formatAmount(deducted)}`);
            }
        } else {
            const deducted = arr[1][1];
            change = parseFloat((change - deducted).toFixed(2));
            if (deducted > 0) {
                cidArr.push(`NICKEL: $${formatAmount(deducted)}`);
            }
            arr[1][1] = 0;
        }
    }

    let changePenny = Math.round(change / 0.01); // Use Math.round instead of parseInt
    if (changePenny != 0) {
        const pennyValue = changePenny * 0.01;
        if (pennyValue <= arr[0][1]) {
            change = parseFloat((change - pennyValue).toFixed(2));
            arr[0][1] -= pennyValue;
            if (pennyValue > 0) {
                cidArr.push(`PENNY: $${formatAmount(pennyValue)}`);
            }
        } else {
            const deducted = arr[0][1];
            change = parseFloat((change - deducted).toFixed(2));
            if (deducted > 0) {
                cidArr.push(`PENNY: $${formatAmount(deducted)}`);
            }
            arr[0][1] = 0;
        }
    }

    totalCidValue = 0;
    arr.forEach(innerArr => {
        totalCidValue += innerArr[1];
    });
    if (change !== 0 || change < 0) {
        updatechangeDueDiv("insufficient", []);
        cid = backupCid;
    } else if (arr.every(denom => denom[1] === 0)) {
        updatechangeDueDiv("close", cidArr);
        addTransactionHistory(total, cash);
        backupCid = JSON.parse(JSON.stringify(cid));
    } else {
        updatechangeDueDiv("open", cidArr);
        addTransactionHistory(total, cash);
        backupCid = JSON.parse(JSON.stringify(cid));
    }
    console.log(`Change in Drawer: $${totalCidValue.toFixed(2)}`);
    console.log(`Change: $${change.toFixed(2)}`);
    console.log(`Suggested Change: ${cidArr}`);
};
const processPayment = () => {
    const cashNum = Number(cash.value);
    const priceNum = Number(price.toFixed(2));

    const cashLimited = Math.round(cashNum * 100) / 100;
    const priceLimited = Math.round(priceNum * 100) / 100;

    console.log(cashLimited);
    console.log(priceLimited);
    console.log(cashLimited - priceLimited);

    if (cashLimited < priceLimited) {
        alert("Customer does not have enough money to purchase the item");
    }
    else if (cashLimited === priceLimited) {
        changeDueDiv.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    }
    else {
        computeChange(cashLimited, priceLimited, cid);
    } 
};
function getFormattedDateTime() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
}
const clearInput = () => {
    cash.value = "";
    changeDueDiv.innerHTML ="";
}
const addTransactionHistory = (price, cash) => {
    transactionDiv.innerHTML += `
    <hr>
    <p>Date/Time: ${getFormattedDateTime()}</p>
    <p>Total:   $${price}</p>
    <p>Cash:    $${cash}</p>
    <p>Change:  $${(cash-price).toFixed(2)}</p>
    <hr>
    `
}

//Initialization
updateData();

//Eventlisteners
purchaseBtn.addEventListener("click", processPayment);
clearBtn.addEventListener("click", clearInput)
document.querySelectorAll('.value-btn').forEach(button => {
    button.addEventListener('click', () => {
    const valueToAdd = parseFloat(button.value);
    const currentValue = parseFloat(cash.value) || 0;
    cash.value = (currentValue + valueToAdd).toFixed(2);
    });
});