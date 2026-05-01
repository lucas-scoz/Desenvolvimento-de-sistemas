const express = require('express')
const app = express()
const port = 3003
const db = require('./db')

app.use(express.json())   

app.get('/tarefas', async (req, res) => {
    try{
          const[rows] = await db.query("SELECT * from tarefas")
          res.send(rows)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro ao buscar tarefa!")
    }
})

app.get('/tarefas/:id', async (req,res) =>{
    const id = parseInt(req.params.id)


    if(isNaN(id)){
        return res.status(400).send("o id e invalido")
    }

    try{
        const [rows] = await db.query("Select * from tarefas where id = ?", [id]);
        if(rows.length == 0){
            return res.status(400).send("tarefa nao encontrada")
        }
        res.json(rows)
  

    }catch(e){
        console.log(e)
         res.status(500).send("erro ao fazer busca")
    }
})
app.post('/tarefas' , async (req,res) => {
    let {titulo , concluida} = req.body;

    if (!titulo || concluida == null){
    return res.status(400).send('titulo e concluida dever ser preenchidos');
  }

  try{
 const[result] = await db.query ("insert into tarefas(titulo , concluida) values (? , ?)", [titulo , concluida] );

 const novoUsuario = {id:result.insertId , titulo , concluida}
res.status(201).json(novoUsuario);




  }catch(e){
    console.log(e);
    res.status(500).send("erro ao criar a tarefa")
  }
})


app.put('/tarefas/:id', async (req , res) =>{
  const id = parseInt(req.params.id);
  let{titulo , concluida } = req.body;

  if (isNaN(id)){
    return res.status(400).send("tarefa nao encontrada")
  }

  if (!titulo || concluida == null){
    return res.status(400).send('titulo e concluida dever ser preenchidos');
  }

  try{
     const [rows] = await db.query("Select * from tarefas where id = ?" , [id])
     if(rows.length == 0){
        return res.status(404).send("tarefa nao encontrado")
      }

      const [result] = await db.query("update tarefas set titulo = ? ,concluida = ? where id =? " , [titulo , concluida , id]);

      if(result.affectedRows == 0){
        return res.status(400).send("nenhum dado foi alterado")
      }

      res.status(201).send("tarefa atualizado com sucesso")

  }catch(e){
    console.log(e)
    res.status(500).send("erro ao atualizar a tarefa")
  }
})

app.delete('/tarefas/:id' , async (req, res) => {
    const id = parseInt(req.params.id);

     if(isNaN(id)){
  return res.status(400).send("o id e invalido")
}
try{
  const [rows] = await db.query("select * from tarefas where id = ?", [id])
  if(rows.length == 0){
    return res.status(404).send("tarefa nao encontrado!")
  }
const [result] = await db.query("delete from tarefas where id = ?" , [id])
  
if(result.affectedRows == 0){
    return result.status(400).send("nenhum dado foi excluido")
  }
  res.status(204).send("o usuario foi excluido com sucesso")
}catch(e){
    console.log(e)
    res.status(500).send("erro ao deletar tarefa")
  }
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))