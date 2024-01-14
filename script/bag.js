let CONVENIENCE_FEE = 90;
let bagItemObj;
onload();
function onload(){
    loadBagItemObj();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary(){
    let bagSummaryElement = document.querySelector(".bag-summary");
    let totalItem = bagItemObj.length;
    let totalMRP = 0;
    let totalDiscount = 0;

    bagItemObj.forEach(item=>{
        totalMRP+= item.original_price;
        totalDiscount += item.original_price - item.current_price;
    })
    let finalPrice;
    if(totalMRP != 0 ){
        finalPrice = totalMRP - totalDiscount + CONVENIENCE_FEE ;
    }else {
        finalPrice = 0;
    }
    bagSummaryElement.innerHTML = ` <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem}) items</div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">$${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-$${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">$90</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">$ ${finalPrice}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`;
}

function loadBagItemObj(){
    console.log("bag items: " + bagItems)
    bagItemObj= bagItems.map(itemId =>{
        for(let i = 0; i < items.length; i++){
            if(itemId == items[i].id){
                return items[i];
            }
        }
    })
    console.log(bagItemObj)
}

function displayBagItems(){
    let containerElement = document.querySelector(".bag-items-container")
    let newBagHtml = '';
    bagItemObj.forEach(bagItem => {
        newBagHtml += generateBagHtml(bagItem);
    });
    containerElement.innerHTML = newBagHtml;
}

function removeBagItem(itemId){
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    loadBagItemObj();
    displayBagIcon()
    displayBagItems();
    displayBagSummary()
}

function generateBagHtml(item){
   return ` <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">$ ${item.current_price}</span>
        <span class="original-price">$${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period}</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick= "removeBagItem(${item.id})" >X</div>
  </div>`
}
