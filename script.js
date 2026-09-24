let items = JSON.parse(localStorage.getItem("items")) || [];

function saveItems(){
    localStorage.setItem("items", JSON.stringify(items));
}

function renderItems(filter = "All"){

    const itemList = document.getElementById("itemList");

    itemList.innerHTML = "";

    let filteredItems = items;

    if(filter !== "All"){
        filteredItems = items.filter(item => item.type === filter);
    }

    if(filteredItems.length === 0){
        itemList.innerHTML = "<p style='text-align:center;color:gray;'>No items found</p>";
        return;
    }

    filteredItems.forEach((item,index)=>{

        const div = document.createElement("div");

        div.className = "item-card";

        div.innerHTML = `
        
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>Dscription:${item.desc}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                
                <br>
                <span class="tag ${item.type.toLowerCase()}">
                    ${item.type}
                </span>
            </div>

            <button class="delete-btn" onclick="deleteItem(${index})">
                Delete
            </button>
        
        `;

        itemList.appendChild(div);

    });

}

function addItem(){

    const itemName = document.getElementById("itemName").value;

    const itemDesc = document.getElementById("itemDesc").value;

    const itemType = document.getElementById("itemType").value;


    const location = document.getElementById("location").value;

    if(itemName === "" || itemDesc===""|| itemType === "" || location === ""){

        alert("Please fill all fields");

        return;
    }

    const item = {
        name:itemName,
        desc:itemDesc,
        type:itemType,
        location:location
    };

    items.push(item);

    saveItems();

    renderItems();

    document.getElementById("itemName").value = "";
    document.getElementById("itemDesc").value = "";

    document.getElementById("itemType").value = "";

    document.getElementById("location").value = "";

}

function deleteItem(index){

    items.splice(index,1);

    saveItems();

    renderItems();

}

function filterItems(type){

    renderItems(type);

}

renderItems();