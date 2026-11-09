document.addEventListener('DOMContentLoaded', function() { 
    const newAccountNameInput = document.getElementById('newAccountName'); 
    const addAccountButton = document.getElementById('addAccountBtn'); 
    const accountListElement = document.getElementById('accountList'); 

// Function to create a new account list item 
function createAccountItem(accountName) { 
    const listItem = document.createElement('li'); 
    listItem.textContent = accountName; 

const deleteButton = document.createElement('button'); 
deleteButton.textContent = 'Delete'; 
deleteButton.addEventListener('click', function() { 
    // 'this' refers to the delete button that was clicked 
    // this.parentNode is the parent li element of the delete button 
    this.parentNode.remove(); 
}); 

listItem.appendChild(deleteButton); 
accountListElement.appendChild(listItem); 
} 

// Add event listener for the "Add Account" button 
addAccountButton.addEventListener('click', function() { 
    const accountName = newAccountNameInput.value.trim(); // .trim() to remove leading/trailing whitespace  
    if (accountName !== "") { 
    createAccountItem(accountName); 
    newAccountNameInput.value = ""; // Clear the input after adding 
} else { 
    alert("Account name cannot be empty!"); // Will be improved in Chapter 8 
} 
}); 

// Add Delete buttons for existing (static) accounts when the page loads 
const staticAccounts = accountListElement.querySelectorAll('li'); 
staticAccounts.forEach(function(item) { 
    const deleteButton = document.createElement('button'); 
    deleteButton.textContent = 'Delete'; 
    deleteButton.addEventListener('click', function() { 
        this.parentNode.remove(); 
        }); 
        item.appendChild(deleteButton); 
    }); 
});