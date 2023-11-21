//  1) Ingresar Usuario
//      - bonificar al usuario tras ingreso exitoso
function ingresoComprador(){
    let nombreComprador = prompt("Hola bienvenido a Pinturas Monet, Dale Color a tu Mundo!, Ingrese su nombre")
    if(nombreComprador === null ){
        return null; 
    }
    if (!nombreComprador || isNaN(nombreComprador) === false){
        alert("Por favor, ingrese un nombre válido.")
        return ingresoComprador();
    }
    alert ("Bienvenido " + nombreComprador + ". Te Recordamos que por compras arriba de 3, tienes un 10% de descuento en tu compra.");
}
ingresoComprador();
//  2) Ingresar al Inventario
//      - mediante prompts y console.log
let inventario = {
    pinturas: [
        {nombre: " Pintura Cilindro Óleo 37ml Rojo", precio: 2.199, stock:25}, 
        {nombre: " Pintura Cilindro Óleo 37ml Negro", precio: 2.199, stock:25}, 
        {nombre: " Pintura Cilindro Óleo 37ml Verde", precio: 2.199, stock:25}, 
        {nombre: " Pintura Cilindro Óleo 37ml Violeta", precio: 2.795, stock:25}, 
        {nombre: " Pintura Cilindro Óleo 37ml Azul", precio: 2.795, stock:25}, 
    ], 
    instrumento: [
        {nombre: "Brocha 15' ", precio: 6.159, stock:25}, 
        {nombre: "Pincel Lengüeta 8' ", precio: 2.999, stock:25}, 
        {nombre: "Pincel Lengueta 11' ", precio: 3.129, stock:25}, 
        {nombre: "Set de 17 Brochas mas estuche", precio: 15.299, stock:25}, 
        {nombre: "Set de 24 Pinceles mas estuche", precio: 12.189, stock:25}, 
    ], 
    bastidores: [
        {nombre: "Bastidor 15' ", precio: 8.299, stock:25}, 
        {nombre: "Bastidor 20' ", precio: 12.599, stock:25}, 
        {nombre: "Bastidor 40' ", precio: 25.599, stock:25}, 
        {nombre: "Rollo de Lienzo 40x1000", precio: 9.990, stock:25}, 
    ], 
    accesorios: [
        {nombre: "Paleta de Acuarelas ", precio: 5.299, stock:25}, 
        {nombre: "Aguarras Vegetal 100ml ", precio: 2.199, stock:25}, 
        {nombre: "Espatula Metalica ", precio: 2.199, stock:25}, 
        {nombre: "Delantal de Tela Talle Adulto", precio: 8.299, stock:25}, 
        {nombre: "Delantal de Tela Talle Infantil", precio: 4.299, stock:25}, 
    ], 
    filtrarBusqueda: [
        { nombre: "Filtrar por búsqueda", descripcion: "Ingresa el articulo que deseas comprar." }
    ]
}; 

function mostrarCategorias (){
    console.log("Seleccione una categoria:");
    console.log("1. pinturas:");
    console.log("2. pinceles:");
    console.log("3. bastidores:");
    console.log("4. accesorios:");
    console.log("5. filtrar por búsqueda:")
    console.log("0. salir:");
    
}
function iniciarInventario() {
    let seleccion = -1;

    while (seleccion !== 0) {
        mostrarCategorias();
        seleccion = parseInt(prompt("Bienvenido al Inventario de Monet, ingresa tu numero para acceder a: 1. Pinturas, 2. Pinceles, 3. Bastidores, 4. Accesorios, 5. Filtrar por busqueda, 0. Salir del Inventario. :"));
        switch (seleccion) {
            case 1:
                mostrarProductos("pinturas");
                break;
            case 2:
                mostrarProductos("instrumento");
                break;
            case 3:
                mostrarProductos("bastidores");
                break;
            case 4:
                mostrarProductos("accesorios");
                break;
            case 5:
                mostrarFiltrarBusqueda("filtrar por búsqueda");
                break;
            case 0:
                console.log("Saliendo del inventario. ¡Hasta luego!");
                break;
            default:
                console.log("Selección no válida. Intente nuevamente.");
                break;
        }
    if (seleccion !== 0) {
        mostrarProductos(Object.keys(inventario)[seleccion - 1].toLowerCase());
        }
        
    }
}
function mostrarFiltrarBusqueda() {
    let palabraClave = prompt("Ingresa el producto que deseas comprar:");
    mostrarProductosConBusqueda(palabraClave);
}

function mostrarProductosConBusqueda(palabraClave) {
    let productosFiltrados = [];
    for (let categoria in inventario) {
        productosFiltrados = productosFiltrados.concat(
            inventario[categoria].filter(producto => producto.nombre.toLowerCase().includes(palabraClave.toLowerCase()))
        );
    }

    console.log(`Productos que contienen "${palabraClave}":`);

    if (productosFiltrados.length > 0) {
        productosFiltrados.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Stock: ${producto.stock}`);
        });

        let articuloInventario = parseInt(prompt("Ingresa el número del artículo que deseas comprar (0 para volver atrás):"));
        if (articuloInventario > 0 && articuloInventario <= productosFiltrados.length) {
            let articulo = productosFiltrados[articuloInventario - 1];
            let precioUnitario = articulo.precio;
            let cantidadIndicada = parseInt(prompt(`Indica la cantidad de ${articulo.nombre} que deseas comprar. Precio unitario: $${precioUnitario}.`));

            if (!isNaN(cantidadIndicada) && cantidadIndicada > 0) {
                let subtotal = precioUnitario * cantidadIndicada;

                if (cantidadIndicada >= 3) {
                    let descuento = subtotal * 0.1;
                    let total = subtotal - descuento;
                    alert(`Has obtenido un descuento del 10%. El precio de tu compra es: $${total.toFixed(3)}`);
                } else {
                    alert(`Precio total: $${subtotal.toFixed(3)}`);
                }

                if (confirm("Gracias por tu compra. ¿Deseas realizar otra operación?")) {
                    return iniciarInventario();
                }
            } else {
                alert("Por favor, ingresa un número válido para la cantidad.");
            }
        } else if (articuloInventario !== 0) {
            console.log("Selección no válida. Intente nuevamente.");
        }
    } else {
        console.log("No hay productos que contengan la palabra clave especificada.");
    }
}

iniciarInventario();

//  3) Elegir Producto
function mostrarProductos(categoria) {
    let cantidadIndicada;
    console.log(`Productos en la categoría ${categoria}:`);
    if (inventario[categoria]) {
        inventario[categoria].forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Stock: ${producto.stock}`);
        });
    let articuloInventario = parseInt(prompt("Ingresa el número del artículo que deseas comprar (0 para volver atrás):"));
    if (articuloInventario > 0 && articuloInventario <= inventario[categoria].length) {
        let articulo = inventario[categoria][articuloInventario - 1];
        let precioUnitario = articulo.precio;
        cantidadIndicada = parseInt(prompt(`Indica la cantidad de ${articulo.nombre} que deseas comprar. Precio unitario: $${precioUnitario}.`));

        if (!isNaN(cantidadIndicada) && cantidadIndicada > 0) {
            let subtotal = precioUnitario * cantidadIndicada;

            if (cantidadIndicada >= 3) {
                let descuento = subtotal * 0.1;
                let total = subtotal - descuento;
                alert(`Has obtenido un descuento del 10%. El precio de tu compra es: $${total.toFixed(3)}`);
            } else {
                alert(`Precio total: $${subtotal.toFixed(3)}`);
            }

            if (confirm("Gracias por tu compra. ¿Deseas realizar otra operación?")) {
                return iniciarInventario(); 
            }
        } else {
            alert("Por favor, ingresa un número válido para la cantidad.");
        }
    } else if (articuloInventario !== 0) {
        console.log("Selección no válida. Intente nuevamente.");
    }
}
}

