## Blogs API

Nessa projeto foi realizada a construção de uma API rest, que permiti fazer o CRUD de usuários, posts e categorias (relacionadas aos posts). Para o armazenamento das informações foi usado um container docker do mysql, e para salvar as informações nesse banco foi utilizado o sequelize, outro recurso utilizado foi o JWT (json web token) para identificar o usuário que está fazendo as operações para que assim somente quem deve ter acesso aquela operação possa realiza-lá , toda a aplicação foi estruturada no modelo MSC.

<details>
  <summary><strong>Rodando com Docker :whale: </strong></summary>
  
  <br />

  Rode os serviços node e db com o comando `docker-compose up -d --build`.

  Lembre-se de parar o mysql se estiver usando localmente na porta padrão (3306), ou adapte, caso queria fazer uso da aplicação em containers;

  Esses serviços irão inicializar um container chamado blogs_api e outro chamado blogs_api_db;

  A partir daqui você pode rodar o container blogs_api via CLI ou abri-lo no VS Code;

  Use o comando `docker exec -it blogs_api bash`.

  Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
  information_source Instale as dependências [Caso existam] com `npm install`. (Instale dentro do container)

  :warning: Atenção : Caso opte por utilizar o Docker, TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima.

  :warning: Atenção : O git dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas     credenciais do git dentro do container.

  <br/>
</details>


<details>
  <summary><strong>Tecnologias Utilizadas e Funcionalidades 💻 </strong></summary>
  <br />
  <details>
  <summary>
    Funcionalidades
  </summary>

  <ul>
    <br />
   <li> Fazer login com a rota: /login (POST) </li>
   <li> Criar um usuário com a rota: /user (POST) </li>
   <li> Buscar usuários com a rota: /user (GET) </li>
   <li> Buscar usuário pelo id com a rota: /user/:id (GET) </li>
   <li> Criar uma categoria com a rota: /categories (POST) </li>
   <li> Buscar as categorias com a rota: /categories (GET) </li>
   <li> Criar um post com a rota: /post (POST) </li>
   <li> Buscar os posts com a rota: /post (GET) </li>
   <li> Buscar um post com a rota: /post/:id (GET) </li>
   <li> Atualizar um post com a rota: /post/:id (PUT) </li>
   <li> Deletar um post com a rota: /post/:id (DELETE) </li>
   <li> Deletar o usuario logado com a rota: /user/me (DELETE) </li>
   <li> Buscar um post por uma palavra chave com a rota: /post/search?q=:searchTerm (GET) </li>
  </ul>
 </details>
 
 
<details>
  <summary>
    Tecnologias ultizadas
  </summary>
  
  <ul>
    <br />
    <li> Express </li>
     <li> Sequelize </li>
    <li> Json web token (JWT) </li>
    <li> Docker </li>
  </ul>
 </details>

<br />
</details>
