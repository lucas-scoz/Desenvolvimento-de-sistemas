const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id")
console.log(id)

const nome = document.getElementById("nomeUsuario")
const idade= document.getElementById("idadeUsuario")

fetch(`http://localhost:3001/usuario/${id}`)

    .then(response => response.json())

    .then(data => {
        nome.value = data.nome
        idade.value = data.idade
    })
    .catch(error => console.log(error));

function atualizarUsuario(event){
 event.preventDefault() // Não recarregar a pagina ao submeter o formulario

// const nome  = document.getElementById("nomeUsuario").value
// const idade = document.getElementById("idadeUsuario").value
 
 const usuario = {
    "nome": nome.value,
    "idade": parseInt(idade.value)
 }
/*

  const usuario = {
    "nome" : nome , 
    "idade" : parseInt(idade)
 }
   */ 
console.log(usuario)


fetch(`http://localhost:3001/usuario/${id}`, {

    method: 'PUT',

    headers: {

        'Content-Type': 'application/json'

    },

    body: JSON.stringify(usuario)

})

    .then(response =>{
        if(response.ok){
            return response
        }
         return response.json()})

    .then(data => {
        alert("usuario foi atualizado com sucesso!")
        window.location.href = "../index.html"
    })

    .catch(error => console.log(error));
}