window.addEventListener("load", loadPage,false);
async function load(url, obj) {
	let say = await import('./getResult.js');
	return say.getResult(url,obj);
}

function loadPage() {
    let compareItem = document.querySelector('.compare-item');
    load('/items/product')
    .then(res => {
        console.log(res);
        if(res){
            compareItem.innerHTML = renderCompare(res);
        }
    }).then(() => {
        let compareItem = document.querySelector('.compare-item');
        console.log("馃殌 ~ file: items.js ~ line 18 ~ loadPage ~ compareItem", compareItem)
        compareItem.addEventListener('click', function (e) {
            e.preventDefault();
            let target = e.target;
            if (target.tagName === 'A') return
            if(target.classList.contains('close-item')){
                let id = target.dataset.id;
                        
                
                load(`/items/delete/${id}`)
                .then(res => {
                        load(`/items/productCount`).then(count =>{
                        let compareItems = document.querySelector('#compare-items');
                        console.log("馃殌 ~ file: items.js ~ line 20 ~ compareItems", compareItems)
                        console.log(count);
                        if(res == 0){
                            compareItems.innerHTML = count;
                            compareItem.innerHTML = getEmptyList();
                        }else{

                            compareItems.innerHTML = count;
                            compareItem.innerHTML = renderCompare(res);
                        }
                    })
                })
            }
        })

    })
}
function getEmptyList() {
    return '<div class="total-price">员諑缘约员諔諑员跃 员諍諓员諉諗諉缘諓 諌钥员諉</div>';
}
function getCompareItem(obj) {
    let compareItem = 
    `<div class="col-3">
        <div class="card text-center" >
            <img class="card-img-top sale-img" src="/template/images/${obj.id}.jpg" alt="Card image cap">
            <a href="/compare/delete/${obj.id}"><button class="btn btn-outline-dark close-item position-absolute fa fa-close" data-id="${obj.id}" type="submit"></button></a>
            <div class="card-body">
                <h5 class="card-title">${obj.descr}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${obj.cost}&#1423;</li>
                <li class="list-group-item">${getAvailableStatus(obj.cost)}</li>
                <li class="list-group-item">${obj.main}</li>
            </ul>
        </div>
    </div>`;
    return compareItem;
}
function getAvailableStatus(num) {
    return +num === 0 ? '员諏钥员 諌苑' : '员諏钥员 苑';
}

function getCompareDescription() {
    let compareDescription = `			
    <div class="col-3 compare-description">
        <div class="card" >
            <div class="card-body">
                <h5 class="card-title">諃员談缘談员諒諑請諅 员諍諓员諉諗諉缘諓</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">员諉諑员諉請諕談</li>
                <li class="list-group-item">猿曰諉愿</li>
                <li class="list-group-item">员諏钥员諈請諕怨諈請諕諉</li>
                <li class="list-group-item">諉钥员諓员猿諓請諕怨諈請諕諉</li>
            </ul>
        </div>
    </div>`;
    return compareDescription;
}
function renderCompare(obj){
    console.log(obj);
    let compareTemplate = ``;
    if(obj != 0){
        compareTemplate += getCompareDescription();
        for (const iterator of obj) {
            compareTemplate += getCompareItem(iterator)
        }
    }else{
        compareTemplate = getEmptyList();
    }
    return compareTemplate;
}