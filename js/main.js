// INICIO ESTADO

const div3 = document.querySelector('#div3')
const modalInicio = document.querySelector('.modalInicio')
setTimeout(()=>{
modalInicio.classList.remove('modalInicio--active')
},2000)


// FUNCION PUSHEAR SABORES

const pushearSabores = (sabor) =>{
    const div = document.createElement('div')
    div.innerHTML = `
    <img id="imagenHelado" src="${sabor.imagen}" width="50px">
    <h3 id="nombreHelado">${sabor.nombre}</h3>
    <h3 id="precioHelado">$${sabor.precioPorLitro}</h3>
    <h3 id="litroHelado">1 KILO</h4>`
    div.classList.add('divHeladoInfo')
    modal.prepend(div)
    
    div.onclick = () => {
        const li = document.createElement('li')
        li.innerHTML = `${sabor.nombre} $${sabor.precioPorLitro}`
        divInfoCarrito.prepend(li)
        totalPedidoValue += sabor.precioPorLitro
        console.log(totalPedidoValue)
        totalPedido.innerHTML = `<p>TOTAL: $${totalPedidoValue}</p>`
        li.classList.add('liashei')
        carrito.push(sabor)
        const carritoJSON = JSON.stringify(carrito)
        localStorage.setItem('compra',carritoJSON)        
        if(carrito.length >= 2){
            crearEstadoOk()
        }
        else{
            crearEstadoX()
        }
        Toastify({
            text: 'Pedido agregado!🍦',
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style:{
        background: 'orange'
            },
            className:'toast',
        }).showToast()        
    }
}

// CONDICIONAL PARA SECCION 'PEDIDO'

const crearEstadoOk = () => {
    div3.innerHTML=`
        <div class="divEstado1">ESTADO</div>
        <div class="divEstado2"><img src="./imgs/tildeok.png" width="50px"></div>
        <div class="divEstado3">Pedido Ok</div>`
}

const crearEstadoX = () => {
    div3.innerHTML=`
    <div class="divEstado1">ESTADO</div>
    <div class="divEstado2"><img src="./imgs/tildex.png" width="50px"></div>
    <div class="divEstado3">Pedido mínimo: 2k</div>`
}

const modal = document.querySelector('.contenedorModal__modal')
const divInfoCarrito = document.querySelector('.divInfoCarrito')
const totalPedido = document.querySelector ('.totalPedido')
const sabores = []
let carrito = []
let totalPedidoValue = 0
const carritoLS = localStorage.getItem('compra')
let carritoGuardado = localStorage.getItem('compra')

// traer del ls el carrito

if (carritoGuardado){
    carritoGuardado = JSON.parse(carritoGuardado)
    for (let saborGuardado of carritoGuardado){
        carrito.push(saborGuardado)
    }
}

if (carritoLS){
    const carrito = JSON.parse(carritoLS)
    if (carrito.length >= 2){
        crearEstadoOk()
    }
    else{
        crearEstadoX()
    }
    
    for (sabor of carrito){
        const li = document.createElement('li')
        li.innerHTML = `
        ${sabor.nombre} $${sabor.precioPorLitro}`
        divInfoCarrito.append(li)
        totalPedidoValue += sabor.precioPorLitro
        totalPedido.innerHTML = `<p>TOTAL: $${totalPedidoValue}</p>`
        li.classList.add('liashei')
    }
} 
else{
    console.log('No hay nada guardado en el carrito')
}

class Helados{
    constructor (nombre, precio, imagen){
        this.nombre = nombre
        this.precioPorLitro = precio
        this.imagen = imagen
    }
}

// MOCK API

fetch("https://631146e019eb631f9d7010a3.mockapi.io/helados")
    .then (res=> res.json())
    .then ( (datos) => {
        for (let sabor of datos){
        pushearSabores(sabor)
        }
    })

sabores.push(new Helados ('Crema del Cielo', 1300, 'imgs/cremadelcielo.png'))
sabores.push(new Helados ('Dulce de Leche', 1700, 'imgs/ddl.png'))
sabores.push(new Helados ('Flan', 1200, 'imgs/flan.png'))
sabores.push(new Helados ('Frambuesa', 1460, 'imgs/frambuesa.png'))
sabores.push(new Helados ('Frutilla', 1380, 'imgs/frutilla.png'))
sabores.push(new Helados ('Frutos del Bosque', 1280, 'imgs/frutosdelbosque.png'))
sabores.push(new Helados ('Limón', 1640, 'imgs/limon.png'))
sabores.push(new Helados ('Mascarpone', 1560, 'imgs/mascarpone.png'))
sabores.push(new Helados ('Tramontana', 1510, 'imgs/tramontana.png'))
sabores.push(new Helados ('Vainilla', 1490, 'imgs/vainilla.png'))

sabores.forEach((sabor)=>{
    pushearSabores(sabor)
})

// MODAL PEDIDOS

const buttonRealizarPedido = document.querySelector('#button1')
const buttonAtrasPedido = document.querySelector('#button2')
const contenedorModal = document.querySelector('.contenedorModal')

buttonRealizarPedido.onclick = () => {
    contenedorModal.classList.toggle('contenedorModal--active')
}

buttonAtrasPedido.onclick = () => {
    contenedorModal.classList.toggle('contenedorModal--active')
}

// cleanear carrito

const clearCarrito = document.querySelector('.clearCarrito')
clearCarrito.onclick = () => {
    carrito.length = 0
    totalPedidoValue = 0
    totalPedido.innerHTML = `<p>TOTAL: </p>`
    divInfoCarrito.innerHTML = ``
    div3.innerHTML=`
    <div class="divEstado1">ESTADO</div>
    <div class="divEstado2"><img src="./imgs/tildex.png" width="50px"></div>
    <div class="divEstado3">Pedido mínimo: 2 kilos</div>`
localStorage.clear()
}

// MODAL PAGAR

const pagar = document.querySelector('#button6')
const modalPagar = document.querySelector('.modalPagar')

pagar.onclick=()=>{
    if(totalPedidoValue > 0){
        modalPagar.classList.toggle('modalPagar--active')
    }
    else{
        Toastify({
            text: 'Tu carrito está vacío 🛒',
            duration: 4000,
            gravity: 'bottom',
            position: 'right',
            style:{
                background: 'blue'
            },
            className:'toast',
        }).showToast()
    }
}

const button7 = document.querySelector('.button7')
button7.onclick = () => {
    modalPagar.classList.toggle('modalPagar--active')
}
const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const dni = document.querySelector('#dni')
const tipotarjeta = document.querySelector('#tipotarjeta')
const numtarjeta = document.querySelector('#numtarjeta')
const botonPagar = document.querySelector('#botonPagar')

botonPagar.onclick=()=>{
    if(nombre.value.length != 0 && apellido.value.length != 0 && dni.value.length >= 8 && numtarjeta.value.length >= 8){
        formulario.reset();
        Toastify({
        text: 'Pago procesado ✅',
        duration: 4000,
        gravity: 'bottom',
        position: 'right',
        style:{
        background: 'green'
        },
        className:'toast',
        }).showToast()
        Toastify({
        text: 'Gracias por tu compra!',
        duration: 4000,
        gravity: 'bottom',
        position: 'right',
        style:{
        background: 'green'
        },
        className:'toast',
        }).showToast()
    }
    else{
        Toastify({
        text: 'Datos incorrectos ❌',
        duration: 4000,
        gravity: 'bottom',
        position: 'right',
        style:{
        background: 'red'
        },
        className:'toast',
        }).showToast()
    }
}