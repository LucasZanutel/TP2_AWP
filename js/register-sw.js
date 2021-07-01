
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js')
      .then(reg => {
        console.log("Service worker esta listo!");
      });
}
else {
  console.log("Service worker no soportado.");
}


const main = document.getElementsByTagName('main')[0];
const msj = document.getElementById('msj');
const botones = document.getElementsByClassName('links');
const tabla = document.getElementById('tabla');
const america = [];
const resto = [];

for(var i = 0; i < botones.length; i++){

  botones[i].onclick = consulta;

}


window.addEventListener('offline', event => {

  offline();
  for(var i = 0; i < botones.length; i++){

    botones[i].onclick = hola;
  
  }

});

window.addEventListener('online', event => {
  msj.innerHTML ='';
  for(var i = 0; i < botones.length; i++){

    botones[i].onclick = consulta;
  
  }


});

if (!navigator.onLine) {

  for(var i = 0; i < botones.length; i++){

    botones[i].onclick = hola;
  
  }
  offline();
}

/*
for(var i = 0; i < botones.length; i++){

  botones[i].onclick = consulta;

}*/

function hola(){

  msj.innerHTML='';
  
  let hDos = document.createElement('h2');
  hDos.innerHTML = "Por mas que hagas click, seguimos estando Offline ; )";
  hDos.setAttribute('class','h2off');
  msj.appendChild(hDos);

}
function offline(){

  tabla.innerHTML='';
  
  let hDos = document.createElement('h2');
  hDos.innerHTML = "Estamos Offline... Inténtalo más tarde!";
  hDos.setAttribute('class','h2offl');
  msj.appendChild(hDos);	

};

function consulta(competencia){

	const fetchPromise = fetch('https://www.scorebat.com/video-api/v1/');
	
	fetchPromise.then(response => {

		const partidos = response.json();
    
  	return partidos

	}).then(result => {
    
    for( var i = 0 ; i < result.length; i++){
      
      if (result[i].competition.name.includes('COPA AMERICA')){
        
        america.push(result[i]);
        
      }else{
        
        resto.push(result[i]);

      }
    }

    if(competencia.path[0].innerHTML == 'Copa América'){

      listaPartidos(america);

      america.splice(0, america.length);
      resto.splice(0, resto.length);

    }else{

      listaPartidos(resto);

      america.splice(0, america.length);
      resto.splice(0, resto.length);

    }

	}).catch(err =>{

		console.log("falló: ", err);

	});

}

function listaPartidos(lista){
  
  tabla.innerHTML=''

    for(var i = 0 ; i < lista.length ; i++){

      let filaTr = document.createElement('tr');
      tabla.appendChild(filaTr);
      
      let td1 = document.createElement('td');
      td1.innerHTML = lista[i].side1.name;
      filaTr.appendChild(td1);
      
      let td2 = document.createElement('td');
      td2.innerHTML = 'vs.';
      filaTr.appendChild(td2);
      
      let td3 = document.createElement('td');
      td3.innerHTML = lista[i].side2.name;
      filaTr.appendChild(td3);
      
      let td4 = document.createElement('td');
      filaTr.appendChild(td4);

        let aVer = document.createElement('button');
        aVer.innerHTML='Play';
        aVer.setAttribute('class','botonPlay');
        aVer.onclick = verVideo;
        aVer.dataset.video = lista[i].embed;
        td4.appendChild(aVer);
      
    }
}

function verVideo(algo){
  console.log('hola!!')
  console.log(algo)
    let divModal = document.createElement('div');
    divModal.setAttribute('class','modal');
    main.appendChild(divModal);

      let aModal = document.createElement('a');
      aModal.href = "javascript:void(0)";
      aModal.innerHTML = "X";
      aModal.onclick = cerrarModal;
      divModal.appendChild(aModal);

      let divDiv = document.createElement('div');
      divDiv.setAttribute('id','video');
      divDiv.innerHTML = this.dataset.video;
      divModal.appendChild(divDiv);

}

function cerrarModal(){
	
	this.parentNode.remove();
	
}
