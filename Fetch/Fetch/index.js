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
   
    data.forEach(element => {
        console.log(element)
         listaUsuario.innerHTML += 
         `<li class='list-group-item'>
         <h5> Nome: ${element.nome}  Idade: ${element.idade} </h5>
         <div>
         <button onclick="deletarUsuario(${element.id}, '${element.nome}')" type="button" class="btn btn-danger">Deletar</button>
         <a href="./editarUsuario/index.html?id=${element.id}" class="btn btn-primary">Atualizar</a>
         </div>
         </li>`
    });
})

    .catch(error => console.log(error));

    function deletarUsuario(usuarioId , usuarioNome){
    
        const confirmar = confirm(`voce deseja deletar o usuario ${usuarioNome}?`)
    
        if (!confirmar){
            return
        }
    
        fetch(`http://localhost:3001/usuario/${usuarioId}`, {
        
            method: 'DELETE',
        
            headers: {
        
                'Content-Type': 'application/json'
        
            },
        
        })
        
            .then(response => {
                if(response.ok){
                    return response 
                }
                return response.json()
            })
        
            .then(data => {
                alert(`o usuario ${usuarioNome} foi deletado com sucesso!`)
                window.location.reload()
            })
        
            .catch(error => console.log(error));
    
    }