document.addEventListener('DOMContentLoaded', (event) => {
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

    let currentItemIndex;

    function addItem(e) {
        e.preventDefault();
    
        const name = document.querySelector('#itemName').value;
        const type = document.querySelector('#itemType').value;
        const hours = document.querySelector('#itemHour').value;
        const minutes = document.querySelector('#itemMinute').value;
        const seconds = document.querySelector('#itemSecond').value;
        const time = `${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
        const goal = document.querySelector('#itemGoal').value;
    
        const fileInput = document.querySelector('#itemFile');
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
            const item = {
                name,
                type,
                time,
                goal,
                file: reader.result,
                fileName: file ? file.name : "No File",
            };
            data.push(item);
            updateData();
    
            addFormSection.style.display = 'none';
            addItemButton.style.display = 'block';
            form.reset();
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            reader.onloadend();
        }
    }
    

    function updateData() {
        localStorage.setItem('list', JSON.stringify(data));
        populateList(data, itemList);
        console.log('Data updated and populated:', data);
    }

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
                        <div class="item-file"><span>File:</span> <a href="${item.file}" target="_blank">${item.fileName}</a></div>
                    </div>
                </li>
            `;
        }).join('');
    }

    function deleteItem(e) {
        if (!e.target.classList.contains('delete')) {
            return;
        }
        const index = e.target.dataset.index;
        data.splice(index, 1);
        updateData();
    }

    function editItem(e) {
        if (!e.target.classList.contains('edit')) {
            return;
        }

        const index = e.target.dataset.index;
        currentItemIndex = index;

        const currentItem = data[index];

        document.querySelector('#editItemName').value = currentItem.name;
        document.querySelector('#editItemType').value = currentItem.type;
        document.querySelector('#editItemHour').value = currentItem.time.split(' ')[0];
        document.querySelector('#editItemMinute').value = currentItem.time.split(' ')[2];
        document.querySelector('#editItemSecond').value = currentItem.time.split(' ')[4];
        document.querySelector('#editItemGoal').value = currentItem.goal;

        document.querySelector('#editItemFile').value = '';

        addFormSection.style.display = 'none';
        addItemButton.style.display = 'none';
        editFormSection.style.display = 'block';
    }

    function submitEdit(e) {
        e.preventDefault();

        const name = document.querySelector('#editItemName').value;
        const type = document.querySelector('#editItemType').value;
        const hours = document.querySelector('#editItemHour').value;
        const minutes = document.querySelector('#editItemMinute').value;
        const seconds = document.querySelector('#editItemSecond').value;
        const time = `${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
        const goal = document.querySelector('#editItemGoal').value;

        const fileInput = document.querySelector('#editItemFile');
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
            data[currentItemIndex].name = name;
            data[currentItemIndex].type = type;
            data[currentItemIndex].time = time;
            data[currentItemIndex].goal = goal;
            data[currentItemIndex].file = reader.result;
            data[currentItemIndex].fileName = file ? file.name : "No File";
            updateData();

            editFormSection.style.display = 'none';
            addItemButton.style.display = 'block';
            editForm.reset();
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            reader.onloadend();
        }
    }

    function openAddForm() {
        addFormSection.style.display = 'block';
        addItemButton.style.display = 'none';
    }

    function closeAddForm() {
        addFormSection.style.display = 'none';
        addItemButton.style.display = 'block';
    }

    function closeEditForm() {
        editFormSection.style.display = 'none';
        addItemButton.style.display = 'block';
    }

    form.addEventListener('submit', addItem);
    editForm.addEventListener('submit', submitEdit);
    itemList.addEventListener('click', deleteItem);
    itemList.addEventListener('click', editItem);
    addItemButton.addEventListener('click', openAddForm);
    closeAddFormBtn.addEventListener('click', closeAddForm);
    closeEditFormButton.addEventListener('click', closeEditForm);

    // Initialize the list
    populateList(data, itemList);

    // Initially hide forms
    form.style.display = 'none';
    editFormSection.style.display = 'none';

    // Populate the list on page load to show the existing items
    populateList(data, itemList);
});
