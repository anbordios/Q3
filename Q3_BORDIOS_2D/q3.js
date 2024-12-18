// Object to store seller usernames and passwords.
const users = {  
    "seller": "pass777", 
    // Add more sellers here...
};

// Object to hold the menu items in each categorized food according to their name and price
const menu = { 
    "Pasta": [
        { name: "Carbonara", price: 130 },
        { name: "Spaghetti", price: 100 },
        { name: "Ravioli", price: 150 },
    ],
    "Desserts": [
        { name: "Muffins", price: 50 },
        { name: "Chocolate Cake", price: 70 },
        { name: "Ice Cream", price: 30 },
    ],
    "Drinks": [
        { name: "Coca-Cola", price: 53 },
        { name: "Blueberry Fruit Tea", price: 90 },
        { name: "Lemonade", price: 50 },
    ],
};

// Array to store the customer's cart.
let cart = []; 

// Function for seller authentication.
function sellerLogin() { 
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");
    return users[username] === password; // Returns true if login is successful
}

// Function to add a new item to the menu.
function addItem() { 
    const category = prompt("Enter category to add item to:");
    if (menu[category]) { // To check if the category exists
        const name = prompt("Enter item name:");
        const price = parseFloat(prompt("Enter price:"));
        menu[category].push({ name, price }); // Add the new item to the category
        alert("Item added successfully!");
    } else {
        alert("Not found.");
    }
}

// Function to remove an item from the menu.
function removeItem() { 
    const category = prompt("Enter category to remove item from: ");
    if (menu[category]) { // Check if category is exist
        const name = prompt("Enter item name to remove:");
        menu[category] = menu[category].filter(item => item.name !== name); // Remove the item using filter
        alert("Item removed successfully!");
    } else {
        alert("Category not found.");
    }
}

// Function to display the menu to the user.
function displayMenu() { 
    for (const category in menu) {
        console.log(`\n--- ${category} ---`);
        menu[category].forEach((item, index) => {
            console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
        });
    }
}

// Function to add an item to the customer's cart.
function addToCart() { 
    displayMenu();
    const category = prompt("Enter category:");
    if (menu[category]) {
        const itemIndex = parseInt(prompt(`Enter item number from ${category}:`)) - 1; 
        if (itemIndex >= 0 && itemIndex < menu[category].length) { // Validate item index
            const quantity = parseInt(prompt("Enter quantity:"));
            const item = menu[category][itemIndex];
            cart.push({ ...item, quantity }); // Add item to cart with quantity
            alert("Item added to cart!");
        } else {
            alert("Invalid item number.");
        }
    } else {
        alert("Category not found.");
    }
}

// Function to remove an item from the customer's cart.
function removeFromCart() { 
    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }
    cart.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`);
    });
    const itemIndex = parseInt(prompt("Enter item number to remove:")) - 1;
    if (itemIndex >= 0 && itemIndex < cart.length) { // Validate item selection
        cart.splice(itemIndex, 1); // Remove item from cart
        alert("Item removed from cart!");
    } else {
        alert("Invalid item number.");
    }
}

// Function to display the contents of the customer's cart.
function printCart() { 
    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }
    let total = 0;
    console.log("\nCart Contents");
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        console.log(`${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}`);
        total += itemTotal;
    });
    console.log(`\nTotal: $${total.toFixed(2)}`);
}


// Main Program Loop
let role; // Variable to store the user's role if it is a seller or customer
do { // Main loop to handle user interaction
    role = prompt("Are you a SELLER or CUSTOMER?").toUpperCase();
    if (role === "SELLER") {
        if (sellerLogin()) { // Check if  the seller is login successfully
            let action;
            do { // Loop for seller actions
                action = prompt("Select action: LOGOUT, ADD, REMOVE:").toUpperCase();
                switch (action) {
                    case "LOGOUT":
                        break;
                    case "ADD":
                        addItem();
                        break;
                    case "REMOVE":
                        removeItem();
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
        do { // Loop for customer actions
            action = prompt("Select action: ORDER, CART, CANCEL:").toUpperCase();
            switch (action) {
                case "ORDER":
                    addToCart();
                    break;
                case "CART":
                    let cartAction;
                    do { // Loop for cart actions
                        cartAction = prompt("Select action: PRINT, ADD, REMOVE, CANCEL:").toUpperCase();
                        switch (cartAction) {
                            case "PRINT":
                                printCart();
                                break;
                            case "ADD":
                                addToCart();
                                break;
                            case "REMOVE":
                                removeFromCart();
                                break;
                            case "CANCEL":
                                break;
                            default:
                                alert("Invalid action.");
                        }
                    } while (cartAction !== "CANCEL");
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
