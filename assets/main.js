let cantidadPasajero = document.getElementById('cantidadPasajero')
let destino = document.getElementById('destino')
let id = document.getElementById('id')
let nombre = document.getElementById('nombre')
let pesoKg = document.getElementById('pesoKg')
let tipoSilla = document.getElementById('tipoSilla')
let agregar = document.getElementById('btnAgregar')
let cardBody = document.getElementById('cardBody')

const db = window.localStorage

agregar.addEventListener('click',()=>{

    let valorPeso=0;
    let valorTiquete = calcularTiquete()
    let valorSilla = calcularSilla()
    
    if(pesoKg.value>50){
    valorPeso = calcularPeso()
    }

    let total = valorTiquete+valorSilla+valorPeso
    let datos ={
        id:id.value,
        nombre:nombre.value,
        destino:destino.value,
        valorTiquete:valorTiquete,
        pesoKg:pesoKg.value,
        valorPeso:valorPeso,
        tipoSilla:tipoSilla.value,
        valorSilla:valorSilla,
        total:total
    }
    db.setItem(Math.round(Math.random()*(1000-1)+1),JSON.stringify(datos))
    mostrarFactura()

})

const mostrarFactura = ()=>{
cardBody.innerHTML=''
let keys = Object.keys(db)
keys.map((key)=>{
    let array = JSON.parse(db.getItem(key))
    let fila = `<p>Numero Identificacion: ${array.id}</p>
    <br>
    <p>Nombre Completo: ${array.nombre} </p>
    <br>
    <p>Destino: ${array.destino} </p>
    <br>
    <p>Valor Tiquete por persona: ${array.valorTiquete} </p>
    <br>
    <p>Peso de Maleta: ${array.pesoKg} </p>
    <br>
    <p>Valor Por KG superado: ${array.valorPeso} </p>
    <br>
    <p>Tipo de Silla: ${array.tipoSilla} </p>
    <br>
    <p>Valor por tipo de silla: ${array.valorSilla} </p>
    <br>
    <p>Total  A pagar: ${array.total} </p>
    <button class = "btn btn-warning">Pagar</button>
    <button class= "btn btn-warning" onclick= "limpiarCard()">Limpiar</button>`
    cardBody.innerHTML += fila
    
})
db.clear();
}

const calcularPeso = ()=>{
    let valor = (pesoKg.value-50)*15000
    return valor
}
const calcularSilla = ()=>{
    let valor = 0;

    switch(tipoSilla.value){
        case "1":
            valor = 0;
            break;
        case "2":
            valor = 20000;
            break;
        case "3":
            valor = 40000;
            break;
    }
    return valor;
}
const calcularTiquete = ()=>{
    let valor = 0;
    switch(destino.value){
        case "1":
            valor = 300000/cantidadPasajero.value
            break;
        case "3":
            valor = 250000/cantidadPasajero.value
            break;
        case "2":
            valor = 20000/cantidadPasajero.value
            break;
        case "4":
            valor = 100000/cantidadPasajero.value
            break;
        case "5":
            valor = 30000/cantidadPasajero.value
            break;
    }
    return valor
}

const limpiarCard = ()=>{
    cardBody.innerHTML= '';
}
