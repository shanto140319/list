// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit",addItem);
//clear items
clearBtn.addEventListener('click',clearItems);
//load items
window.addEventListener('DOMContentLoaded',setupItems);


// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    console.log(value);
    const id = new Date().getTime().toString();
    if(value && !editFlag){
        createListItem(id,value);
        displayAlert("item added to the list","success");
        //show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id,value);
        setBackToDefault();

    }
    else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        //edit local storage;
        editLocalStorage(editID,value);
        setBackToDefault();
    }
    else{
        displayAlert("please enter value","danger")
    }

}

//display alert
function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    },1500)
}

//clear item function
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("Empty list","danger");
    localStorage.removeItem('list');
    setBackToDefault();

}



//delete function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id; 
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert("item removed","danger");
    setBackToDefault();
    //remove from local storage
    removeFromLocalStorage(id);
}
//edit funxtion

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

//set back to default
function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id,value){
    const grocery = {id , value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));

}

function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    });
    localStorage.setItem("list",JSON.stringify(items));

}

function editLocalStorage(id,value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list",JSON.stringify(items));

} 

function getLocalStorage(){
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];

}
// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(item){
            createListItem(item.id,item.value)
        })
        container.classList.add("show-container");
    }

}

function createListItem(id,value){
    const element = document.createElement('article');
        element.classList.add('grocery-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        // element.innerHTML = `<p class="title">${value}</p>
        // <div class="btn-container">
        //   <!-- edit btn -->
        //   <button type="button" class="edit-btn">
        //     <i class="fas fa-edit"></i>
        //   </button>
        //   <!-- delete btn -->
        //   <button type="button" class="delete-btn">
        //     <i class="fas fa-trash"></i>
        //   </button>
        // </div>`;
        if(document.body.className === "dark-mode"){
             element.innerHTML = `<p class="title d">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
        }
        else{
            element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
        }
        const title =  element.querySelector('.title');
        if(title.className === "title d"){
            title.style.color = "#fff";
        }
        else{
            title.style.color = "#0cff08";
        }

        darkBtn.addEventListener('click',function(){
            title.classList.toggle("d");
            if(title.className === "title d"){
                title.style.color = "#fff";
            }
            else{
                title.style.color = "#0cff08";
            }
        })
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);
        //append child
        list.appendChild(element);
}

//auto write text
const text = "learning JavaScript is Fun!...";
const write = document.querySelector(".write-text")
let idx = 0;
function writeText(){
    write.innerHTML = text.slice(0,idx);
    idx++;

    if(idx > text.length - 1){
        idx = 0;
    }

}
setInterval(writeText, 100);


// for dark mode

function isOdd(value) {
	if (value%2 !== 0)
		return true;
	else
		return false;
}
const darkText = document.querySelector(".small");
const sectionCenter = document.querySelector(".section-center");
const darkBtn = document.querySelector(".dark");
darkBtn.addEventListener('click',function(){
    document.body.classList.toggle("dark-mode");
    form.classList.toggle("dark-mode2")
    sectionCenter.classList.toggle("dark-mode");
    darkBtn.classList.toggle("dark-mode");
    if(document.body.className === "dark-mode"){
        changeText("switch light mode");
    }
    else{
        changeText("switch dark mode");
    }

})

function changeText(text){
    darkText.innerHTML = text;
}
