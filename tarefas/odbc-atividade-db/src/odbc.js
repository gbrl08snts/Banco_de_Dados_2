// QUESTÃO 5
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5400,
  user: 'taciano',
  password: 'password',
  database: 'empresa_db'
});

client.connect()
  .then(() => console.log('Conectado com sucesso ao banco de dados empresa_db'))
  .catch(e => console.error('Falha ao conectar ao banco de dados empresa_db', e.stack));

// a. Inserir uma atividade em algum projeto
client.query("INSERT INTO atividade (descricao, codProjeto, dataInicio, dataFim) VALUES ('Nova Atividade', 1, '2022-01-01', '2022-12-31')", (error, results) => {
  if (error) {
    throw error;
  }
  console.log('Atividade inserida com sucesso');
});

// b. Atualizar o líder de algum projeto
client.query("UPDATE projeto SET codResponsavel = 2 WHERE codigo = 1", (error, results) => {
  if (error) {
    throw error;
  }
  console.log('Líder do projeto atualizado com sucesso');
});

// c. Listar todos os projetos e suas atividades
client.query("SELECT p.nome AS projeto, a.descricao AS atividade FROM projeto p JOIN atividade a ON p.codigo = a.codProjeto", (error, results) => {
  if (error) {
    throw error;
  }
  console.log(results.rows);
});

client.end();
