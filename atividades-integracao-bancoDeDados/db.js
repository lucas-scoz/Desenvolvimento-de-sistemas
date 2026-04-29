const mysql = require('mysql2/promise')

const dbConfig = {
      host: 'localhost' ,
      user: 'root',
      password: 'root',
      database: 'atividadeIntegracao',
      waitForConnections: true ,
      connectionLimit: 10,
      queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
.then(connection => {
    console.log('Conexão com o MySQL estabelecida com sucesso!');
    connection.release(); // Libera a conexão de volta para o pool
})
.catch(err => {
        console.error('Erro ao conectar ao MySQL:', err.message);
        // É crítico que a aplicação não continue se não puder se conectar ao DB
        process.exit(1); // Encerra o processo da aplicação
    });

module.exports = pool; // Exporta o pool para ser usado em outras partes da aplicação