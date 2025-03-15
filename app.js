let amigos=[];
let sorteoIniciado= false;

function mostrarMensaje(texto,color="red"){
    const mensajeDiv=document.getElementById("mensaje");
    mensajeDiv.textContent=texto;
    mensajeDiv.style.color;
}

function reiniciarSorteo(){
    amigos=[];
    sorteoIniciado=false;
    document.getElementById("listaAmigos").innerHTML="";
    document.getElementById("mensaje").textContent="";
    document.getElementById("mensajeFinal").textContent="";
    document.getElementById("resultado").innerHTML="";
    mostrarMensaje("El sorteo se ha reiniciado¡Comienza a añadir amigos!");
} 

function agregarAmigo(){
    if(sorteoIniciado){
        mostrarMensaje("No puedes agregar más amigos una vez iniciado el sorteo");
        return;
    }
    const inputAmigo= document.getElementById("amigo");
    const nombreAmigo= inputAmigo.value.trim();

    if(nombreAmigo===""){
        mostrarMensaje("Por favor, ingresa un nombre");
        return;
    }
    //Validar si el nombre ya esta en la lista
    if(amigos.includes(nombreAmigo)){
        mostrarMensaje("El nombre ya esta en la lista");
        return;
    }
    //Validar si el nombre no tiene carcteres especiales
    let regex=/^[a-zA-Z\s]+$/;
    if (!regex.test(nombreAmigo)){
        mostrarMensaje("El nombre solo debe contener letras");
        return;
    }
    //Limpiar mensaje final.Reinicio lista
    document.getElementById("mensajeFinal").textContent="";

    amigos.push(nombreAmigo);

    actualizarLista();

    mostrarMensaje( "¡Amigo agregado con éxito!", "green"); //Mensaje de éxito
    inputAmigo.value="";
    inputAmigo.focus();
}

function actualizarLista(){
    const listaAmigoUl=document.getElementById("listaAmigos");
    listaAmigoUl.innerHTML="";

    amigos.forEach(amigo=>{
        const li=document.createElement("li");
        li.textContent=amigo;
        listaAmigoUl.appendChild(li);
    })
}

function sortearAmigo(){
    if (amigos.length===0){
        document.getElementById("mensajeFinal").textContent="No hay más amigos en la lista. El sorteo ha finalizado";
        const resultadoUl=document.getElementById("resultado");
        resultadoUl.innerHTML=""; //Limpia resultados si no hay amigos

        //Reinicio automatico despues de un breve mensaje
        setTimeout(reiniciarSorteo,4000);
        return;
    }
    sorteoIniciado=true;//Actualiza estado sorteo

    const indiceAleatorio=Math.floor(Math.random()*amigos.length);
    const amigoSorteado=amigos[indiceAleatorio];

    const resultadoUl=document.getElementById("resultado");
    resultadoUl.innerHTML= (`El amigo sorteado es :${amigoSorteado}`);

    amigos.splice (indiceAleatorio,1); //Elimina al amigo sorteado
    actualizarLista();
    if (amigos.length===0){

        //Si la lista queda vacia despues del sorteo, limpiar todos los mensajes
        document.getElementById("mensajeFinal").textContent="El sorteo ha finalizado ";
        setTimeout(reiniciarSorteo,4000);
    }
}   

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("btnAdicionar").addEventListener("click",agregarAmigo);
    document.getElementById("btnSortear").addEventListener("click",sortearAmigo);

})


