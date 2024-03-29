
async function load(url, obj) {
	let say = await import('./getResult.js');
	return say.getResult(url,obj);
}
window.addEventListener("load", loadPage,false);

function loadPage()
{	
	let productItem = document.querySelector('.product-item');
	let productRecomend = document.querySelector('.product-recomended');
	let maxDiscountItem = document.querySelector('.max-discount-item');
	load('main')
	.then(res => {
		let template = '';
		for (const iterator of res) {	
			template += getCardItem(iterator);
			productItem.innerHTML = template
		}		
	})
	.then(() =>{
		load('/list/product')
		.then(res => {
			let addCart = document.querySelectorAll('.add-cart');
			addToList(res, addCart)
		})
	})
	.then(() =>{
		load('/items/product')
		.then(res => {
			let compare = document.querySelectorAll('.compare');
			addToList(res, compare)		
		})
	})
	.then(() =>{
		load('/wishlist/items')
		.then(res => {
			let wishlist = document.querySelectorAll('.wishlist');
			addToList(res, wishlist)
		})
	})




	
	load('main/recomend')	
	 .then(res => {
	 	let template = '';
	 	for (const iterator of res) {	
	 		template += getRecomendedItem(iterator);
	 		productRecomend.innerHTML = template
	 	}
	 });
	load('main/maxdiscount')	
	.then(res => {
	 	let template = getMaxDiscountItem(res[0]);
	 	maxDiscountItem.innerHTML = template;
	});	
}
function getCardItem(obj){
	let productCard = `
	<div class="col-3 item-col">
		<div class="card">
			<img class="card-img-top item-card" src="/template/images/${obj.id}.jpg" alt="Card image cap">
			${getSaleStatus(obj.discount)}
			<div class="card-body text-center item-body">
				<a href="/product/view/${obj.id}" class="h6 item-name">${obj.descr}</a>
				<div class="col-6">
					<div class="input-group-append">
						<span class="input-group-text my-3 mx-5 star-card" data-productId="${obj.id}">
							${getRatingStars(obj.rating,obj.id)}
						</span>
					</div>
					<nav class=" navbar-expand-lg navbar-light input-group-append home-inputs">
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav mr-auto">
								<li class="nav-link pr-0">
									<a href="/cart/add/${obj.id}/1">
										<input class="btn btn-outline-dark add-cart" data-id="${obj.id}" type="submit" value="🛒">
									</a>
								</li>
								<li class="nav-link pl-0 pr-0">
									<a href="/compare/add/${obj.id}">
										<input class="btn btn-outline-dark compare" data-id="${obj.id}" type="submit" value="&#8644;">
									</a>
								</li>
								<li class="nav-link pl-0 pr-0">
									<a href="/wishlist/add/${obj.id}">
										<input class="btn btn-outline-dark wishlist" data-id="${obj.id}" type="submit" value="&#x2661;">
									</a>
								</li>
								<li class="nav-link pr-0">
									<span class="btn  my-2 my-sm-0 bg-light text-dark item-cost" for="inputGroupSelect02"><del>${obj.cost}&#1423;</del></span>
								</li>
								<li class="nav-link pl-0">
									<span class="btn btn-outline-success my-2 my-sm-0 bg-secondary text-light item-cost" for="inputGroupSelect02">${obj.cost * (1-obj.discount/100)}</span>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</div>
	</div>
`;
	return productCard;
}



function getRecomendedItem(obj){
	let month = new Date(+obj.time_add).getMonth() + 1;
	let date = new Date(+obj.time_add).getDate();
	if (month > 0 && month < 9) {
		month = `0${month}`
	}
	if (date > 0 && date < 9) {
		date = `0${date}`
	}
	let recomendProducts = `
		<div class="col-4">
			<div class="card card-comment" style="width: 18rem;">
				<img class="card-img" src="/template/images/${obj.id}.jpg" alt="Card image cap">
				
				<div class="card-body text-center">
					<a href="/product/${obj.id}"><h5  class="card-title">${obj.descr}</h5></a>
					<span class=" mx-auto">
					${new Date(+obj.time_add).getFullYear()}-${month}-${date}
					</span>
					<p class="card-text"></p>
					
					<a href="#" class="btn btn-warning">Read More </a>
				</div>
			</div>
		</div>`;
	return recomendProducts;
}

function getMaxDiscountItem(obj) {
	
	let maxDiscountItem = `<div class="card text-white text-center  mb-3" style="max-width: 18rem;">
	<div class="card-header bg-dark">ԹԵԺ ԱՌԱՋԱՐԿ</div>
	<div class="card-body left-side">
	<img class="card-img-top item-card" src="/template/images/${obj.id}.jpg" alt="Card image cap">
	<img class="card-img-top sale sale-home" src="/template/images/other/sale.png" alt="Card image cap">						
	<h5 class="card-title">Dark card title</h5>
	<a href="/product/${obj.id}"><h6 class="text-dark text-center" id="min-name">${obj.descr}</h6></a>
	<div class="input-group-append ">
	<span class="input-group-text my-3 mx-5 star-card">
		${getRatingStars(obj.rating,obj.id)}
	</span>
	</div>
	<nav class=" navbar-expand-lg navbar-light input-group-append home-inputs">
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-link  pr-0">
						<a href="/cart/add/">
							<input class="btn btn-outline-dark add-cart" data-id="" type="submit" value="🛒">
						</a>
					</li>
					<li class="nav-link pl-0 pr-0">
						<a href="/compare/add/">
							<input class="btn btn-outline-dark compare" data-id="" type="submit" value="&#8644;">
						</a>
					</li>
					<li class="nav-link pr-0">
						<span class="btn  my-2 my-sm-0 bg-light text-dark item-cost" for="inputGroupSelect02">${obj.cost}</span>
					</li>
					<li class="nav-link pl-0">
						<span class="btn btn-outline-success my-2 my-sm-0 bg-secondary text-light item-cost" for="inputGroupSelect02">${obj.new_cost}</span>
					</li>
				</ul>
			</div>
		</nav>
	</div>`;
	return maxDiscountItem
}




