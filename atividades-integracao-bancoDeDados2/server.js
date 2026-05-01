const express = require('express')
const app = express()
const port = 3004
const db = require('./db')

app.use(express.json())

app.get('/produtos', async (req, res) => {
    try{
          const[rows] = await db.query("SELECT * from produtos where estoque > 0")
          res.send(rows)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro ao buscar produto!")
    }
})

app.get('/produtos/:id', async (req,res) =>{
    const id = parseInt(req.params.id)


    if(isNaN(id)){
        return res.status(400).send("o id e invalido")
    }

    try{
        const [rows] = await db.query("Select * from produtos where id = ?", [id]);
        if(rows.length == 0){
            return res.status(400).send("produto nao encontrada")
        }
        res.json(rows)
  

    }catch(e){
        console.log(e)
         res.status(500).send("erro ao fazer busca")
    }
})

app.patch('/produtos/preco/:id', async (req , res) => {
    const id = parseInt(req.params.id);
    const { preco } = req.body;

    if (isNaN(id)) {
        return res.status(400).send("ID inválido");
    }

    if (preco === undefined) {
        return res.status(400).send("O campo preco é obrigatório");
    }

    try {
        const [result] = await db.query(
            "UPDATE produtos SET preco = ? WHERE id = ?",
            [preco, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send("Produto não encontrado");
        }

        res.status(200).send("Preço atualizado com sucesso");

    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao atualizar preço");
    }
})





app.put('/produtos/:id', async (req , res) =>{
    const id = parseInt(req.params.id);
    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || !preco || !estoque || !categoria) {
        return res.status(400).send("As variáveis nome, preco , estoque e categoria precisam existir e conter informação");
    }

    const produto = { id , nome, preco, estoque , categoria };
    produtos.put(produto);

    res.status(201).send(produto);  
})

app.delete('/produtos/:id' , async (req, res) => {
    const id = parseInt(req.params.id);

     if(isNaN(id)){
  return res.status(400).send("o id e invalido")
}
try{
  const [rows] = await db.query("select * from produtos where id = ?", [id])
  if(rows.length == 0){
    return res.status(404).send("produto nao encontrado!")
  }
const [result] = await db.query("delete from produtos where id = ?" , [id])
  
if(result.affectedRows == 0){
    return result.status(400).send("nenhum dado foi excluido")
  }
  res.status(204).send("o usuario foi excluido com sucesso")
}catch(e){
    console.log(e)
    res.status(500).send("erro ao deletar produto")
  }
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))