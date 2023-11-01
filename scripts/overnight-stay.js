"use strict"

function init() {

const costForm = document.getElementById("signupForm");
    costForm.onsubmit = function(event) {
        event.preventDefault();
        calculateCost();
    };
};

//TODO create a function to return the room rate passing: _userDate, _roomType
function getRoomRate(_userDate, _roomType,) {
    let roomRate = 0;
    if (_userDate >= 5 && _userDate <= 7){
        if (_roomType === "two-bedroom") {
            roomRate = 350;
        } else if (_roomType === "kingRoom" || _roomType === "queenRoom") {
            roomRate = 250;
        };
    } else if (_roomType === "two-bedroom") {
        roomRate = 210;
    } else {
        roomRate = 150;
    };
    return roomRate;
}
//TODO function to when its called it will return the discount
function getDiscount(_discount) {
    let currentDiscount;
    if (_discount === "senior") {
        currentDiscount = 0.1;
    } else if (_discount === "military") {
        currentDiscount = 0.2;
    } else {
        currentDiscount = 0;
    };
    return currentDiscount;
};

function calculateCost() {
    // declare input variables
    const checkInDate = document.getElementById("check-in").value; // check-in date stored
    const numberOfNights = document.getElementById('numbOfNights').value; // number of nights stored
    // inputs variables for number of adults/childrens
    const numberOfAdults = parseFloat(document.getElementById('numOfAdults').value);
    const numberOfChilds = parseFloat(document.getElementById('numOfChilds').value);
    // fetched all radios with querySelector of the name and value
    let selectedDiscount = document.querySelector('input[name="discountRadio"]:checked').value;
    let selectedRoomType = document.querySelector('input[name="roomType"]:checked').value;
    // date inputs
    const userDate = new Date(checkInDate); 
    const month = userDate.getMonth(); // gets the month from the value.
    const totalPeopleSize = numberOfAdults + numberOfChilds;


    //* Calling the functions
    maxOccupancy(totalPeopleSize, selectedRoomType);
    let newRoomRate = getRoomRate(month, selectedRoomType);
    let newDiscount = getDiscount(selectedDiscount);


    // tax rate after discount room cost
    const taxRate = 0.12;

    //* Calculations
    let discountAmount = Math.round(newRoomRate * newDiscount); // discount amount
    let costIfDiscount = Math.round(newRoomRate - discountAmount); // applied new discount amount to roomRate
    let taxAmount = Math.round(costIfDiscount * taxRate); // calculated taxAmount after applying discounts

    let newTotalCost = costIfDiscount + taxAmount; // returns total cost to stay
    let totalCostWithDays = newTotalCost * numberOfNights;

    //! test output: display on HTML
        document.getElementById('orgRoomCost').innerHTML = `$${newRoomRate}`;
        document.getElementById('appliedDiscounts').innerHTML = `$${discountAmount}`;
        document.getElementById('discountedRoomPrice').innerHTML = `$${costIfDiscount}`
        document.getElementById('taxAmount').innerHTML = `$${taxAmount}`
        document.getElementById('totalCostPerDay').innerHTML = `$${newTotalCost}`
        document.getElementById('totalCost').innerHTML = `$${totalCostWithDays}`
};

//TODO function maxOccupency(_totalPeople, roomType)

function maxOccupancy(_totalPeople, _roomType) {
    switch (_roomType) {
        case 'queenRoom':
          if (_totalPeople > 5) {
            alert('The room you selected will not hold your party.')
            throw new Error('The room you selected will not hold your party.')
          }
          break;
        case 'kingRoom':
          if (_totalPeople > 2) {
            alert('The room you selected will not hold your party.')
            throw new Error('The room you selected will not hold your party.')
          }
          break;
        case 'two-bedroom':
          if (_totalPeople > 6) {
            alert('The room you selected will not hold your party.')
            throw new Error('The room you selected will not hold your party.')
          }
          break;
        }
};

// calling the function to initilize when button is pressed
init();
