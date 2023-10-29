

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});


const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

const productsList= document.querySelector('.container-products');


let allProductos=[];


const valorTotal = document.querySelector('.total-pagar');	

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');



productsList.addEventListener('click', e => {

	if(e.target.classList.contains('btn-add-cart')){

		const product=e.target.parentElement;
		
		const infoProducts={
			quantity:1,
			title: product.querySelector('h3').textContent,
			price: product.querySelector('p').textContent,
			oferta: product.querySelector('span.descuento').textContent,
		};

		const exits=allProductos.some(product=> product.title === infoProducts.title)
		
		if(exits){
			const products= allProductos.map(product=>{
				if(product.title === infoProducts.title){
					product.quantity++;
					return product;
				}else{
					return product;
				}
			});
			allProductos=[...products]

		}else{
			allProductos=[...allProductos,infoProducts];
		}

		showHTML();

	}
    
});

rowProduct.addEventListener('click', e =>{
		if(e.target.classList.contains('icon-close')){
			const product = e.target.parentElement;
			const title = product.querySelector('p').textContent;

			allProductos=allProductos.filter(product=> product.title !==title
				);

				console.log(allProductos);
				showHTML();
		}
});

const showHTML = () => {


	if (allProductos.length) {
		cartEmpty.classList.remove('hidden');	
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	

	rowProduct.innerHTML='';
	

	let total=0;
	let totalOfProducts=0;


	allProductos.forEach(product =>{
		const containerProduct=document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML= `
		
		<div class="info-cart-product">
				<span class="cantidad-producto-carrito">${product.quantity}</span>

				<p class="titulo-producto-carrito">${product.title}</p>
				<p class="precio-producto-carrito">${product.price}</p>
				<span class="descuento">${product.oferta}</span>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="icon-close"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		`;

		rowProduct.append(containerProduct);

		
		total= total + parseFloat(product.quantity * product.price.slice(2));
		totalOfProducts=totalOfProducts+ product.quantity;

	});

	valorTotal.innerText= `S/${total.toFixed(2)}`;
	countProducts.innerText =totalOfProducts;


};