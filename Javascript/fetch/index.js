//89265160 cep para teste depois 
//fetch().then().then().catch()
function buscarCEP(event){
    event.preventDefault() //nao recarregar a pagina
      console.log(event)
     // event.target.reset() -- serve para apagar os dados do input

     // .value -> pega o valor do id 
     let cep = document.getElementById("cep").value;
     
   fetch(`https://viacep.com.br/ws/${cep}/json/`)

    .then(response => response.json())

    .then(data => {console.log(data)
     let rua = document.getElementById("rua")
     //innerHTML ira preencher o HTML 
     rua.innerHTML = data.logradouro
    })

    .catch(error => {
        console.log(error)
        alert("boto cep errado sua mula");
    });
}