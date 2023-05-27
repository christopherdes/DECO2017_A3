document.addEventListener('DOMContentLoaded', (event) => {
    // Object to store data
    let data = JSON.parse(localStorage.getItem('list')) || [];

    const itemList = document.querySelector('#itemlist');
    const form = document.querySelector('#itemform');
    const addItemButton = document.querySelector('#addItemButton');
    const addFormSection = document.getElementById('add-form-section');
    const closeAddFormBtn = document.getElementById('closeAddFormBtn');
    const editFormSection = document.querySelector('#edit-form-section');
    const editForm = document.querySelector('#editform');
    const closeAddFormButton = document.querySelector('#closeAddFormButton');
    const closeEditFormButton = document.querySelector('#closeEditFormButton');

    console.log('Data from localStorage:', data);
    populateList(data, itemList);

    let currentItemIndex;  // to keep track of which item is being edited

    // Function to add new item
    function addItem(e) {
        e.preventDefault();
        const name = document.querySelector('#itemName').value;
        const type = document.querySelector('#itemType').value;
        const hours = document.querySelector('#itemHour').value;
        const minutes = document.querySelector('#itemMinute').value;
        const seconds = document.querySelector('#itemSecond').value;
        const time = `${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
        const goal = document.querySelector('#itemGoal').value;

        const item = {
            name,
            type,
            time,
            goal
        };

        data.push(item);
        updateData();

        addFormSection.style.display = 'none';  // Hide the form after submission
        addItemButton.style.display = 'block';  // Show the "Add Item" button after form submission
        addItemButton.disabled = True;  // Re-enable the add item button after form submission
        this.reset();
    }

    function updateData() {
        localStorage.setItem('list', JSON.stringify(data));
        populateList(data, itemList);
        console.log('Data updated and populated:', data); // Add this line
    }

    // Function to display items
    function populateList(items = [], itemList) {
        console.log('Populating list with:', items);
        itemList.innerHTML = items.map((item, i) => {
            return `
                <li>
                    <div class="item-header">
                        <button class="edit" data-index=${i}>Edit</button>
                        <button class="delete" data-index=${i}>Delete</button>
                    </div>

                    <div class="item-body">
                        <div class="item-type"><span>Category:</span> ${item.type}</div>
                        <div class="item-name"><span>Item Name:</span> ${item.name}</div>
                        <div class="item-time"><span>Consumed Time:</span> ${item.time}</div>
                        <div class="item-goal"><span>Daily Goal:</span> ${item.goal}</div>
                    </div>
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

        // If the Add Item Form is open, return and don't open the Edit Form
        if (addFormSection.style.display === 'block') {
            return;
        }

        currentItemIndex = e.target.dataset.index;
        document.querySelector('#editItemName').value = data[currentItemIndex].name;
        document.querySelector('#editItemType').value = data[currentItemIndex].type;
        const timeParts = data[currentItemIndex].time.split(' ');
        document.querySelector('#editItemHour').value = timeParts[0];
        document.querySelector('#editItemMinute').value = timeParts[2];
        document.querySelector('#editItemSecond').value = timeParts[4];
        document.querySelector('#editItemGoal').value = data[currentItemIndex].goal;
        editFormSection.style.display = 'block';  // Save for the "Edit Form" later
        addItemButton.style.display = 'none';  // hide the add item button when edit form is open
    }


    // handle edit form submission
    function submitEdit(e) {
        e.preventDefault();
        data[currentItemIndex].name = document.querySelector('#editItemName').value;
        data[currentItemIndex].type = document.querySelector('#editItemType').value;
        const hours = document.querySelector('#editItemHour').value;
        const minutes = document.querySelector('#editItemMinute').value;
        const seconds = document.querySelector('#editItemSecond').value;
        data[currentItemIndex].time = `${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
        data[currentItemIndex].goal = document.querySelector('#editItemGoal').value;
        updateData();
        editFormSection.style.display = 'none';  // hide the edit form
        addItemButton.style.display = 'block';  // Show the add item button after form submission
        closeEditFormButton.style.display = 'block';  // Show the close button after form submission
    }

    // toggle visibility of add item form
    function toggleAddItemForm() {
        if (form.style.display === 'none') {
            // If the Edit Form is open, return and don't open the Add Item Form
            if (editFormSection.style.display === 'block') {
                return;
            }

            form.style.display = 'block';
            addItemButton.disabled = true;
        }
    }

    // hide add item form
    function hideAddItemForm() {
        addFormSection.style.display = 'none';
        addItemButton.style.display = 'block';  // show the "Add Item" button when the form is hidden
    }

    // hide edit item form
    function hideEditItemForm() {
        editFormSection.style.display = 'none';
        addItemButton.style.display = 'block';  // show the "Add Item" button when the form is hidden
    }

    // Add an event listener to the Add Item Button. When it's clicked, show the Add Item Form
    addItemButton.addEventListener('click', function() {
        addFormSection.style.display = 'block';
        addItemButton.style.display = 'none'; // hide the "Add Item" button when the form is shown
    });
    

    // Add an event listener to the Close button in Add Item Form. When it's clicked, hide the Add Item Form
    closeAddFormBtn.addEventListener('click', function() {
        addFormSection.style.display = 'none';
        addItemButton.disabled = false; // re-enable the "Add Item" button when the form is closed
    });

    // Add an event listener to the Close button in Add Item Form. When it's clicked, hide the Add Item Form
    closeAddFormBtn.addEventListener('click', hideAddItemForm);

    // Add event listeners
    form.addEventListener('submit', addItem);
    itemList.addEventListener('click', deleteItem);
    itemList.addEventListener('click', editItem);
    editForm.addEventListener('submit', submitEdit);
    addItemButton.addEventListener('click', toggleAddItemForm);
    closeAddFormButton.addEventListener('click', hideAddItemForm);
    closeEditFormButton.addEventListener('click', hideEditItemForm);

    // Initialize the list
    populateList(data, itemList);

    // Initially hide forms
    form.style.display = 'none';
    editFormSection.style.display = 'none';

    // Populate the list on page load to show the existing items
    populateList(data, itemList);
});
