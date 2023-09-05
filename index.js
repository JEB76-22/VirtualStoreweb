const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

// VARIABLES
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// contenedores de producto.
const productList = document.querySelector('.grid');
// console.log(productList);

// variable de arreglo de productos vacio.
let allProducts = [];


const valorTotal = document.querySelector(".total-pagar");

const countProducts = document.querySelector("#contador-productos");

const cartEmpty = document.querySelector('.cart-empty');

const cartTotal = document.querySelector('.cart-total');


productList.addEventListener("click", e => {
//si el elemento clickeado es un boton
    if(e.target.classList.contains("btn-add-cart")){
        //a product le asignamos el elemento clickeado para arriba
        const product = e.target.parentElement;

        const infoProduct = {
            cantidad: 1,
            titulo: product.querySelector("p").textContent,
            precio: product.querySelector("h3").textContent
        };
                 console.log(infoProduct);   

        const existe = allProducts.some(product => product.titulo === infoProduct.titulo);
        //.some() recorre todo el objeto y comprueba si existe.
        
        if(existe){
            const products = allProducts.map(product =>{//map() recorre todo el objeto y devuelve un nuevo arreglo
                if(product.titulo === infoProduct.titulo){//comprobamos que el titulo del producto exista, agregamos la cantidad 1.y retornamos el producto.
                    product.cantidad++;
                    return product;
                }else{
                    return product;
                    //sino retornamos el producto
                }
            });
                allProducts = [...products];
                //asigna una copia del arreglo a la variable allProducts
        }else{
            allProducts = [...allProducts, infoProduct];
            //sino agregamos el objeto infoProduct al final del arreglo allProducts
        }

        showHTML();
        //agregamos showHTML para que se actualice el carrito.
    }
});

    rowProduct.addEventListener("click", e => {// a la variable rowProduct le asignamos el evento click.
        // si el elemento clickeado tiene la clase icon-close
       if(e.target.classList.contains("icon-close")){
    
        const product = e.target.parentElement;//referenciamos al padre
    
         const titulo = product.querySelector(".titulo-producto-carrito").textContent;//obtenemos el titulo del producto 
    console.log(titulo);
         allProducts = allProducts.filter(product => product.titulo !== titulo);
//allProductos le pasamos el metodo filter para mantener los productos que no coincidan con el titulo.
         console.log(allProducts);

         showHTML();  
         //agregamos showHTML para que se actualice el carrito. 
        }

    });

  


// funcion para mostrar HTML


const showHTML = () => {

    if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}
    //si el carrito esta vacio, le quitamos la clase hidden cartEmpt y agregamos la clase hidden a rowProduct y cartTotal. sino agregamos la clase hidden a cartEmpty y removemos la clase hidden a rowProduct y cartTotal. 


    // LimpiarHTML
rowProduct.innerHTML = ''; //Vacio 


let total = 0;
let totalDeProductos = 0;


//recorremos allProducts con forEach, creamos la const containerProduct creando div en html y creamos una clase  cart-product.
    allProducts.forEach(product =>{
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');
//con containerProduct creamos un div con varios productos
        containerProduct.innerHTML = `
        <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.cantidad}</span>
        <span class="titulo-producto-carrito">${product.titulo}</span>
        <h3 class="precio-producto-carrito">${product.precio}</h3>
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
        //a rowProduct le asignamos el div containerProduct
        rowProduct.append(containerProduct);

        //la variable total convertimos a entero y le multiplicamos por el precio, recortando la parte decimal. y la sumamos
        total = total + parseInt(product.cantidad * product.precio.slice(1));
        //la variable totalDeProductos le sumamos la cantidad del producto.
        totalDeProductos = totalDeProductos + product.cantidad;
    });
    //mostramos el total.
    valorTotal.innerText = `$ ${total}`;
    //mostramos el total de productos
    countProducts.innerText = totalDeProductos;
};


