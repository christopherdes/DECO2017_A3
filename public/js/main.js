// Object to store data
let data = JSON.parse(localStorage.getItem('list')) || [];

const itemList = document.querySelector('#itemlist');
const form = document.querySelector('#itemform');
const editFormSection = document.querySelector('#edit-form-section');
const editForm = document.querySelector('#editform');

let currentItemIndex;  // to keep track of which item is being edited

// Function to add new item
function addItem(e) {
    e.preventDefault();
    const name = document.querySelector('#itemName').value;
    const type = document.querySelector('#itemType').value;
    const time = document.querySelector('#itemTime').value;
    const goal = document.querySelector('#itemGoal').value;

    const item = {
        name,
        type,
        time,
        goal
    };

    data.push(item);
    updateData();
    this.reset();
}

function updateData() {
    localStorage.setItem('list', JSON.stringify(data));
    populateList(data, itemList);
}

// Function to display items
function populateList(items = [], itemList) {
    itemList.innerHTML = items.map((item, i) => {
        return `
            <li>
                <span class="item-name">${item.name}</span>
                <span class="item-type">${item.type}</span>
                <span class="item-time">${item.time}</span>
                <span class="item-goal">${item.goal}</span>
                <button class="edit" data-index=${i}>Edit</button>
                <button class="delete" data-index=${i}>Delete</button>
            </li>
        `;
    }).join('');
}

// Function to delete item
function deleteItem(e) {
    if (!e.target.classList.contains('delete')) {
        return;
    }
    const index = e.target.dataset.index;
    data.splice(index, 1);
    updateData();
}

// Edit item event
function editItem(e) {
    if (!e.target.classList.contains('edit')) {
        return;
    }
    currentItemIndex = e.target.dataset.index;
    document.querySelector('#editItemName').value = data[currentItemIndex].name;
    document.querySelector('#editItemType').value = data[currentItemIndex].type;
    document.querySelector('#editItemTime').value = data[currentItemIndex].time;
    document.querySelector('#editItemGoal').value = data[currentItemIndex].goal;
    editFormSection.style.display = 'block';  // show the edit form
}

// handle edit form submission
function submitEdit(e) {
    e.preventDefault();
    data[currentItemIndex].name = document.querySelector('#editItemName').value;
    data[currentItemIndex].type = document.querySelector('#editItemType').value;
    data[currentItemIndex].time = document.querySelector('#editItemTime').value;
    data[currentItemIndex].goal = document.querySelector('#editItemGoal').value;
    updateData();
    editFormSection.style.display = 'none';  // hide the edit form
}

// Add event listeners
form.addEventListener('submit', addItem);
itemList.addEventListener('click', deleteItem);
itemList.addEventListener('click', editItem);
editForm.addEventListener('submit', submitEdit);

// Initialize the list
populateList(data, itemList);
