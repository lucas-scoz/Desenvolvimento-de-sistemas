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
    res.status(400).send("o id e invalido")
  }

  try{
      const [rows] = await db.query("Select * from usuario where id = ?" , [id])
      if(rows.lenght() == 0){
        return res.status(404).send("usuario nao encontrado")
      }
      res.json(rows)
  }catch(e){
    res.status(500).send("erro ao buscar tarefa!")
  }
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

