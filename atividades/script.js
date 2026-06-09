// EXERCÍCIO 1
function mostrarTexto() {
    const texto = document.getElementById("textoEx1").value;
    document.getElementById("resultadoEx1").textContent = texto;
}

// EXERCÍCIO 2
function saudar() {
    const nome = document.getElementById("nomeEx2").value;
    const resultado = document.getElementById("resultadoEx2");

    if(nome.trim() === ""){
        resultado.textContent = "Digite seu nome.";
    }else{
        resultado.textContent = `Bem-vindo(a), ${nome}!`;
    }
}

// EXERCÍCIO 3
let contador = 0;

function contarClique(){
    contador++;
    document.getElementById("contador").textContent = contador;
}

// EXERCÍCIO 4
function trocarCor(cor){
    document.getElementById("tituloColorido").style.color = cor;
}

// EXERCÍCIO 5
let tamanhoFonte = 16;

function aumentarFonte(){
    tamanhoFonte += 2;
    document.getElementById("textoFonte").style.fontSize =
    tamanhoFonte + "px";
}

function diminuirFonte(){
    tamanhoFonte -= 2;

    if(tamanhoFonte < 10){
        tamanhoFonte = 10;
    }

    document.getElementById("textoFonte").style.fontSize =
    tamanhoFonte + "px";
}

// EXERCÍCIO 6
let visivel = true;

function alternarConteudo(){
    const conteudo = document.getElementById("conteudoEx6");

    if(visivel){
        conteudo.style.display = "none";
    }else{
        conteudo.style.display = "block";
    }

    visivel = !visivel;
}

// EXERCÍCIO 7
let imagemAtual = true;

function trocarImagem(){
    const imagem = document.getElementById("imagemEx7");

    if(imagemAtual){
        imagem.src = "https://th.bing.com/th/id/R.b821c5e402898c28d4e5a6ace4dda131?rik=AqcPO6WKxmWTQw&pid=ImgRaw&r=0";
    }else{
        imagem.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYRRVcCy32xt4l3xNml1-lT-Qg9MxAwD6sA&s";
    }

    imagemAtual = !imagemAtual;
}

// EXERCÍCIO 8
function validarEmail(){
    const email = document.getElementById("emailEx8").value;
    const resultado = document.getElementById("resultadoEmail");

    if(email.includes("@gmail.com")){
        resultado.textContent = "E-mail válido!";
        resultado.style.color = "green";
    }else{
        resultado.textContent = "E-mail inválido!";
        resultado.style.color = "red";
    }
}

// EXERCÍCIO 9
function adicionarTarefa(){
    const tarefa = document.getElementById("tarefaEx9").value;

    if(tarefa.trim() === ""){
        return;
    }

    const item = document.createElement("li");
    item.textContent = tarefa;

    document.getElementById("listaTarefas").appendChild(item);

    document.getElementById("tarefaEx9").value = "";
}

// EXERCÍCIO 10
function gerarCartao(){

    const nome = document.getElementById("nomeCartao").value;
    const idade = document.getElementById("idadeCartao").value;
    const profissao = document.getElementById("profissaoCartao").value;

    const container = document.getElementById("cartaoContainer");

    container.innerHTML = `
        <div class="cartao">
            <h3>${nome}</h3>
            <p><strong>Idade:</strong> ${idade}</p>
            <p><strong>Profissão:</strong> ${profissao}</p>
        </div>
    `;
}