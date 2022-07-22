# Boas-vindas ao repositório do Projeto Store Manager!

Esta é minha primeira API utilizando a arquitetura MSC (model-service-controller) e testada com Jest, Mocha e Chai!

Esta API é um sistema de gerenciamento de vendas em que é possível criar, visualizar, deletar e atualizar produtos e vendas.

Utiliza um banco MySQL para a gestão de dados e Joi para validação dos dados recebidos. Além disso, a API é RESTful.

- Este projeto foi individual e foram `6` dias de projeto.
- Esta aplicação e contemplada por testes unitarios.

---

# Como rodar localmente...

- Para rodar este projeto localmente você vai precisar ter instalado o Docker, GitHub, Node e um gerenciador de banco de dados, e basta seguir o passo a passo abaixo.
1. Clone o repositório com o comando:
  - `git clone git@github.com:caioBatistaDosSantos/Project-Store-Manager.git`;
    - Entre na pasta do repositório:
      - `cd Project-Store-Manager`
2. Instale as dependencia com o comando:
  - `npm install`
3. Suba o container Docker com o comando:
  - `docker-compose up -d`
4. Concte-se a um gerenciador de banco de dados com os seguintes dados:
  - host='localhost',
  - user='root',
  - port='3306',
  - password='password',
  (Essa conexão será nescessária para criar o banco de dados)
5. Entre no terminal do container Docker com o comando:
  - `docker exec -it store_manager bash`
6. Suba o banco de dados com o comando:
  - `npm run restore` (este comando deve ser realizado dentro do terminal do container)
7. Por fim inicie a aplicação com o comando:
  - `npm start` (este comando deve ser realizado dentro do terminal do container)

---

# ROTAS DO PROJETO

## 1 - Endpoint GET /products

- O endpoint retorna um array com todos os produtos cadastrados. Devendo retornar o `status 200`, com os dados no corpo.

## 2 - Endpoint GET /products/:id

- O endpoint retorna um produto com base no id da rota. Devendo retornar o `status 200` ao fazer uma requisição com um produto existente (ex: `/products/1`), com os dados do produto no corpo.

- Caso não seja encontrado um produto com base no id da rota, o endpoint deve retornar o `status 404` com o seguinte corpo:

  ```json
  {
    "message": "Product not found"
  }
  ```

## 3 - Endpoint GET /sales

- O endpoint retorna um array com todas as vendas cadastradas. Devendo retornar o `status 200`, com os dados no corpo.

## 4 - Endpoint GET /sales/:id

- O endpoint retorna uma venda com base no id da rota. Devendo retornar o `status 200` ao fazer uma requisição com uma venda existente (ex: `/sales/1`), com os dados do produto no corpo.

- Caso não seja encontrado umma venda com base no id da rota, o endpoint deve retornar o `status 404` com o seguinte corpo:

  ```json
  {
    "message": "Sale not found"
  }
  ```

## 5 - Endpoint POST /products

- O endpoint adiciona um novo produto ao banco de dados;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "name": "Product example",
    "quantity": 1
  }
  ```

- O campo `name` deverá ter no mínimo 5 caracteres. Ele é obrigatório.
- O campo `quantity` deverá ser um inteiro menor ou igual a 0. Ele é obrigatório.
- Um produto nunca deve ter a quantidade em estoque menor que 0.


- Caso esteja tudo certo, retorna o `status 201`  e o produto cadastrado.

## 6 - Endpoint POST /sales

- O endpoint adiciona uma nova venda ao banco de dados;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  [{
    "productId": 1,
    "quantity": 1
  }]
  ```

- O campo `productId` deve ser um id de um produto válido. Ele é obrigatório.
- O campo `quantity` deverá ser um inteiro menor ou igual a 0. Ele é obrigatório.
- Um produto nunca deve ter a quantidade em estoque menor que 0.


- Caso esteja tudo certo, retorna o `status 201`  e a venda cadastrada.

## 7 - Endpoint PUT /products/:id

- O endpoint atualiza um produto no banco de dados pelo id da rota;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "name": "Product example",
    "quantity": 1
  }
  ```

- O id da rota deve ser um produto válido.
- O campo `name` deverá ter no mínimo 5 caracteres. Ele é obrigatório.
- O campo `quantity` deverá ser um inteiro menor ou igual a 0. Ele é obrigatório.
- Um produto nunca deve ter a quantidade em estoque menor que 0.


- Caso esteja tudo certo, retorna o `status 200`  e o produto atualizado.

## 8 - Endpoint PUT /sales/:id

- O endpoint atualiza uma venda no banco de dados pelo id da rota;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  [{
    "productId": 1,
    "quantity": 1
  }]
  ```

- O id da rota deve ser uma venda válida.
- O campo `productId` deve ser um id de um produto válido. Ele é obrigatório.
- O campo `quantity` deverá ser um inteiro menor ou igual a 0. Ele é obrigatório.


- Caso esteja tudo certo, retorna o `status 200`  e a venda atualizada.

## 9 - Endpoint DELETE /products/:id

- O endpoint deleta um produto cadastrado no banco, passado pelo id da rota. Devendo retornar o `status 204`, com o corpo vazio.

## 10 - Endpoint DELETE /sales/:id

- O endpoint deleta uma venda cadastrada no banco, passada pelo id da rota. Devendo retornar o `status 204`, com o corpo vazio.

---

# Feedback são bem-vindos!!

- Se Possivel, deixe seu feedback ou seu code-review! Muito Obrigado! :)🤝🛠

- Linkedin: https://www.linkedin.com/in/caio-batista-dos-santos/
- Gmail: drcaiosan@gmail.com