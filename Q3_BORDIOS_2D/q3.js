const users = {
    "ticket1": "password517",
    "ticket2": "password715",
    // Add more ticket person users here...
};

const buses = [
    { location: "Cubao", seats: new Array(15).fill(null) },
    { location: "Baguio", seats: new Array(15).fill(null) },
    { location: "Pasay", seats: new Array(15).fill(null) },
];

// Function to authenticate ticket person login.
function authenticateTicketPerson(username, password) {
    return users[username] === password;
}


// Function to display bus information.
function displayBuses(showPassengers = false) {
    buses.forEach((bus, index) => {
        console.log(`\nBus ${index + 1}: ${bus.location}`);
        if (showPassengers) {
            bus.seats.forEach((passenger, seat) => {
                console.log(`Seat ${seat + 1}: ${passenger || "AVAILABLE"}`);
            });
        }
    });
}


// Function to manage bus reservations
function manageBusReservations() {
    const busIndex = prompt("Enter bus number to manage (1-3):") - 1;
    if (busIndex >= 0 && busIndex < buses.length) {
        let action;
        do {
            action = prompt("Choose action: ADD, REMOVE, CANCEL:").toUpperCase();
            switch (action) {
                case "ADD":
                    addReservation(busIndex);
                    break;
                case "REMOVE":
                    removeReservation(busIndex);
                    break;
                case "CANCEL":
                    break;
                default:
                    alert("Invalid action.");
            }
        } while (action !== "CANCEL");
    } else {
        alert("Invalid bus number.");
    }
}

// Function to add a reservation
function addReservation(busIndex) {
    const bus = buses[busIndex];
    const availableSeats = bus.seats.map((passenger, index) => passenger ? null : index + 1);

    if(availableSeats.length === 0){
        alert("Fully Booked");
        return;
    }

    availableSeats.forEach(`seat => console.log(Available seat: ${seat})`);

    const seatNumber = parseInt(prompt("Enter seat number to reserve:"));
    if (seatNumber > 0 && seatNumber <= 15 && bus.seats[seatNumber -1] === null) {
        const customerName = prompt("Enter customer name:");
        bus.seats[seatNumber - 1] = customerName;
        alert("Reservation added successfully!");
    } else {
        alert("Invalid seat number or seat already taken.");
    }
    //Ask if continue to add or not
}


// Function to remove a reservation 
function removeReservation(busIndex) {
    const bus = buses[busIndex];
    const occupiedSeats = bus.seats.map((passenger, index) => passenger ? index + 1 : null).filter(seat => seat !== null);
    if(occupiedSeats.length === 0){
        alert("No reservations to remove");
        return;
    }
    occupiedSeats.forEach(`seat => console.log(Occupied seat: ${seat})`);

    const seatNumber = parseInt(prompt("Enter seat number to remove reservation from:"));
    if (seatNumber > 0 && seatNumber <= 15 && bus.seats[seatNumber - 1] !== null) {
        const customerName = bus.seats[seatNumber - 1];
        if (confirm(`Are you sure you want to remove ${customerName} reservation from seat ${seatNumber}?`)) {
            bus.seats[seatNumber - 1] = null;
            alert("Reservation removed successfully!");
        }
    } else {
        alert("Invalid seat number or seat is not occupied.");
    }
    //Ask if continue to remove or not
}



// Function for customer reservation
function customerReserve() {
    displayBuses();
    const busIndex = parseInt(prompt("Enter bus number to reserve (1-3):")) - 1;
    if (busIndex >= 0 && busIndex < buses.length) {
        const bus = buses[busIndex];
        const availableSeats = bus.seats.map((passenger,index) => passenger ? null : index + 1).filter(seat => seat !== null);
        if (availableSeats.length > 0) {
            availableSeats.forEach(`seat => console.log(Available seat: ${seat})`);
            const seatNumber = parseInt(prompt("Enter seat number to reserve:"));
            if (seatNumber > 0 && seatNumber <= 15 && bus.seats[seatNumber - 1] === null) {
                const customerName = prompt("Enter customer name:");
                bus.seats[seatNumber - 1] = customerName;
                alert("Reservation successful!");
            } else {
                alert("Invalid seat number or seat already taken.");
            }
        } else {
            alert("Fully booked!");
        }
    } else {
        alert("Invalid bus number.");
    }
}

// Function for customer cancellation
function customerCancelReservation() {
    //Implementation for canceling a reservation
}


// Main program loop
let role;
do {
    role = prompt("Are you a TICKET PERSON or CUSTOMER?").toUpperCase();
    if (role === "TICKET PERSON") {
        const username = prompt("Enter username:");
        const password = prompt("Enter password:");
        if (authenticateTicketPerson(username, password)) {
            let action;
            do {
                action = prompt("Choose action: LOGOUT, VIEW, MANAGE:").toUpperCase();
                switch (action) {
                    case "LOGOUT":
                        break;
                    case "VIEW":
                        displayBuses(true);
                        if (confirm("Cancel View?")) break; //Added cancel view functionality
                        break;
                    case "MANAGE":
                        manageBusReservations();
                        break;
                    default:
                        alert("Invalid action.");
                }
            } while (action !== "LOGOUT");
        } else {
            alert("Login failed.");
        }
    } else if (role === "CUSTOMER") {
        let action;
        do {
            action = prompt("Choose action: RESERVE, CANCEL RESERVATION, CANCEL:").toUpperCase();
            switch (action) {
                case "RESERVE":
                    customerReserve();
                    break;
                case "CANCEL RESERVATION":
                    customerCancelReservation();
                    break;
                case "CANCEL":
                    break;
                default:
                    alert("Invalid action.");
            }
        } while (action !== "CANCEL");
    } else {
        alert("Invalid role.");
    }
} while (role !== "CANCEL");
