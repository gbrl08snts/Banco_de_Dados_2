// QUESTÃO 6
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('empresa_db', 'taciano', 'password', {
  host: 'localhost',
  port: 5400,
  dialect: 'postgres'
});

// Definindo os modelos
const Projeto = sequelize.define('Projeto', { /* definição do modelo */ }, { tableName: 'projeto' });
const Atividade = sequelize.define('Atividade', { /* definição do modelo */ }, { tableName: 'atividade' });

// a. Inserir uma atividade em algum projeto
Atividade.create({ /* dados da atividade */ })
  .then(() => console.log('Atividade inserida com sucesso'))
  .catch(error => console.error('Erro ao inserir atividade', error));

// b. Atualizar o líder de algum projeto
Projeto.update({ codResponsavel: 2 }, { where: { codigo: 1 } })
  .then(() => console.log('Líder do projeto atualizado com sucesso'))
  .catch(error => console.error('Erro ao atualizar líder do projeto', error));

// c. Listar todos os projetos e suas atividades
Projeto.findAll({ include: Atividade })
  .then(projetos => {
    projetos.forEach(projeto => {
      console.log(`Projeto: ${projeto.nome}`);
      projeto.atividades.forEach(atividade => {
        console.log(`Atividade: ${atividade.descricao}`);
      });
    });
  })
  .catch(error => console.error('Erro ao listar projetos e atividades', error));
