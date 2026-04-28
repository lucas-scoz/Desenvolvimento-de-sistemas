const express = require('express')
const app = express()
const port = 3001
const db = require('./db')

app.use(express.json())

app.get('/usuario', async (req, res) => {
    try{
          const[rows] = await db.query("SELECT * from usuario")
          res.send(rows)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro ao buscar tarefa!")
    }
})

app.get('/usuario/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if(isNaN(id)){
    return res.status(400).send("o id e invalido")
  }

  try{
      const [rows] = await db.query("Select * from usuario where id = ?" , [id])
      if(rows.length == 0){
        return res.status(404).send("usuario nao encontrado")
      }
      res.json(rows)
  }catch(e){
    console.log(e)
    res.status(500).send("erro ao buscar tarefa!")
  }
})
app.post('/usuario',async (req , res) => {
  let {nome , idade} = req.body;

  if(!nome || !idade){
      res.status(400).send("Nome ou idade devem ser preenchidos")
  }

  try{
   const [result] =await db.query("INSERT INTO usuario (nome,idade) values (? ,?)", [nome , idade])
   // result -> retorna o id(insertId)
   const novoUsuario = {id: result.insertId, nome, idade}
   res.status(201).json(novoUsuario)
  }catch(e){
    console.log(e)
    res.status(500).send("erro ao criar usuario!")
  }
  res.send('POST request to the homepage')

} )

app.put("/usuario/:id" , async (req , res) => {
 const id = parseInt(req.params.id)
 let{nome , idade} = req.body;

 
  if(isNaN(id)){
    return res.status(400).send("o id e invalido")
  }
 if(!nome || !idade){
      return res.status(400).send("Nome ou idade devem ser preenchidos")
  }
   try{
      const [rows] = await db.query("Select * from usuario where id = ?" , [id])
      if(rows.length == 0){
        return res.status(404).send("usuario nao encontrado")
      }

      const[result] =await db.query("update usuario set nome = ?, idade= ?  where id = ?", [nome ,idade , id])
      res.status(201).send("usuario atualizado com sucesso")

      if (result.affectedRows == 0){
        return res.status(400).send("nenhum dado foi alterado")
      }
    }catch(e){
        console.log(e)
        res.status(500).send("Erro ao atualizar usuario!")
    }

})

app.delete("/usuario/:id" , async(req , res) => {
  const id = parseInt(req.params.id)
  if(isNaN(id)){
  return res.status(400).send("o id e invalido")
}
try{
  const [rows] = await db.query("select * from usuario where id = ?", [id])
  if(rows.length == 0){
    return res.status(404).send("usuario nao encontrado!")
  }
  const [result] = await db.query("delete from usuario where id = ?", [id])

  if(result.affectedRows == 0){
    return result.status(400).send("nenhum dado foi excluido")
  }
    res.status(204).send("o usuario foi excluido com sucesso")
}catch(e){
  console.log(e)
  res.status(500).send("erro ao deletar usuario")
}
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

