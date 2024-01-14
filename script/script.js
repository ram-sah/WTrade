
let bagItems ;
onload();
function onload() {
    let localString = localStorage.getItem('bagItems')
    bagItems = localString ? JSON.parse(localString): []
    displayItemOnPage();
    displayBagIcon();
}

function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems))
    displayBagIcon();
}

function displayBagIcon() {
    let bagItemsElement = document.querySelector(".bag-items")
    if (bagItems.length > 0) {
        bagItemsElement.style.visibility = 'visible';
        bagItemsElement.innerText = bagItems.length;
    } else {
        bagItemsElement.style.visibility = 'hidden';
    }
}

function displayItemOnPage() {
    let containerElement = document.querySelector(".right-container");
    //not show cart value in bag.html because there is not displayItemOnPage() on loading time so return if not below
    if(!containerElement){
    return;
    }
    let newHtml = '';
    items.forEach(item => {
        newHtml +=
            `<div class="container-content">
    <div class="container-item">
        <img class="item-image" src=" ${item.image}" alt="bed image">
        <div class="stars">${item.rating.stars} ⭐️ | ${item.rating.count} </div>
    </div>
    <h2>${item.company}</h2>
    <p>${item.item_name}</p>
    <div class="price-container">
        <span class="current-price">$${item.current_price}</span>
        <span class="original-price">$${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF) </span>
        <button class="btn-bag" onclick= "addToBag(${item.id})" >Add to Bag</button>
    </div>
    </div>`
    })
    containerElement.innerHTML = newHtml;
}
