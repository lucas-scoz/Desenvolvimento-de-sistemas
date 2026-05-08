fetch('http://localhost:3001/usuario')

    .then(response => {
    if  (response.status == 404){
        alert("nenhum usuario encontrado")
    }
    return response.json()
    })
    .then(data => {
        console.log(data)
    const listaUsuario = document.getElementById("listaUsuarios")
    console.log(listaUsuario)
   

    console.log(listaUsuario)
    data.forEach(element => {
        console.log(element)
         listaUsuario.innerHTML += `<li class='list-group-item'>
         Nome :${element.nome}  
         Idade :${element.idade}</li>`
    });
})

    .catch(error => console.log(error));

    