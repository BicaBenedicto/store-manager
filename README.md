# Store Manager

Criação de API, utilizando Node.js e a biblioteca Express, para gerenciamento de vendas e produtos, com diversas rotas para o gerenciamento e validações. Com testes unitários
## Stack utilizada

**Back-end:** Node.js, Express
**Testes:** Mocha, Sinon, Chai, Jest

## Aprendizados

Criar uma API do 0, com rotas, validações, middleware, serviços, e seus respectivos testes.
## Funcionalidades

- **Products**
    - Rota de criação de produto em `/products`
    - Rota de atualização de produto em `/products/:id`
    - Rota de solicitação de todos produtos em `/products`
    - Rota de solicitação de produto por id em `/products/:id`
    - Rota de remoção de produto em `/products/:id`
- **Sales**
    - Rota de criação de venda em `/sales`
    - Rota de atualização de venda em `/sales/:id`
    - Rota de solicitação de todos vendas em `/sales`
    - Rota de solicitação de venda por id em `/sales/:id`
    - Rota de remoção de venda em `/sales/:id`

- **Validações**
    - Campo vazio ao criar/atualizar/remover `produto` ou `venda`
    - Quantidade minima de 1 para criar/atualizar `produto`
    - Quantidade minima de 1 para estoque não ficar vazio em `venda`
    - Quantidade excessiva ao que possui em estoque em `venda`
    - Busca de nome existente ao criar `produto`
    - Busca de Id existente ao atualizar ou remover `produto` ou `venda`

- **Serviços**
    - Ao criar, atualizar ou remover uma `venda` os `produtos` referente a `venda`são atualizado suas quantidades.
## Instalação

Coloque a pasta store-manager no local desejado, após isso execute o comando abaixo em seu terminal.

```bash
    npm install
```
## Rodando localmente

Execute o seguinte comando no seu terminal, após instalar as dependências.

```bash
    npm start
```

## Rodando os testes

Para rodar os testes, rode o seguinte comando no terminal

```bash
  npm run test
```


## Autores
### Gabriel

| [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gabrielpbenedicto@gmail.com) | [![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrielbenedicto/) | [![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/gabrielbenedicto) |
| ------|-------|-----|
