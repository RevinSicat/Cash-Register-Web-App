//HTML Elements Variables
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDiv = document.getElementById("change-due");
const totalElement = document.getElementById("total");
const cidDiv = document.getElementById("cid-div");

//Variables
let price = 1.87;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

//Function
const updateData = () => {
    totalElement.textContent = `Total: $${price}`;
    cidDiv.innerHTML = `<h2>Change in drawer:</h2>`
    cid.forEach((index)=>{
        cidDiv.innerHTML +=`<p>${formatName(index[0])}: $${index[1]}</p>`;
    });
    
}
const updatechangeDueDiv = (status) => {
    if (status === "open"){
        changeDueDiv.innerHTML =`<p>Status: OPEN</p>`;
    }
    else if (status === "close"){
        changeDueDiv.innerHTML =`<p>Status: CLOSED</p>`;
    }
    else if (status === "insufficient"){
        changeDueDiv.innerHTML =`<p>Status: INSUFFICIENT_FUNDS</p>`;
    }
}
const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
const computeChange = (cash, total, arr) => {
    const change = cash - total;
    let totalCidValue = 0;
    arr.forEach(innerArr => {
        totalCidValue += innerArr[1];
    });
    if (totalCidValue === change){
        updatechangeDueDiv("close");
    }
    else if (totalCidValue < change){
        updatechangeDueDiv("insufficient");
    }else {
        updatechangeDueDiv("open");
    }
    console.log(totalCidValue.toFixed(2));
};

const processPayment = () => {
    const cashLimited = Number(cash.value).toFixed(2);
    const priceLimited = price.toFixed(2);
    console.log(cashLimited);
    console.log(priceLimited);
    if (cashLimited < priceLimited) {
        alert("Customer does not have enough money to purchase the item");
    }
    else if (cashLimited === priceLimited) {
        changeDueDiv.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    }
    else{
        computeChange(cashLimited, priceLimited, cid);
    } 
};

//Initialization
updateData();

//Eventlisteners
purchaseBtn.addEventListener("click", processPayment);