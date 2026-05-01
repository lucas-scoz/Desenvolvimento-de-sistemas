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

app.patch('/produtos/preco/id', async (req , res) => {


    
} )


app.put('/produtos/:id', async (req , res) =>{
  const id = parseInt(req.params.id);
  let{titulo , concluida } = req.body;

  if (isNaN(id)){
    return res.status(400).send("produto nao encontrada")
  }

  if (!titulo || concluida == null){
    return res.status(400).send('titulo e concluida dever ser preenchidos');
  }

  try{
     const [rows] = await db.query("Select * from produtos where id = ?" , [id])
     if(rows.length == 0){
        return res.status(404).send("produto nao encontrado")
      }

      const [result] = await db.query("update produtos set titulo = ? ,concluida = ? where id =? " , [titulo , concluida , id]);

      if(result.affectedRows == 0){
        return res.status(400).send("nenhum dado foi alterado")
      }

      res.status(201).send("produto atualizado com sucesso")

  }catch(e){
    console.log(e)
    res.status(500).send("erro ao atualizar a produto")
  }
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