
# Interface - Personal Finance

## Sobre o projeto

Esta interface foi desenvolvida para complementar a [API de Finanças Pessoais](https://github.com/kellyfmachado/personal-finance), oferecendo uma experiência prática e intuitiva no gerenciamento financeiro. Com um design focado na organização e clareza, os usuários podem monitorar suas transações, categorias e saldo de maneira eficiente e acessível.

## Tecnologias utilizadas
 
![Html](https://img.shields.io/badge/-Html-000?style=for-the-badge&logo=html5&logoColor=8b2ea9)
![Css](https://img.shields.io/badge/-Css-000?style=for-the-badge&logo=css3&logoColor=8b2ea9)
![Typescript](https://img.shields.io/badge/-Typescript-000?style=for-the-badge&logo=typescript&logoColor=8b2ea9)
![Angular](https://img.shields.io/badge/-Angular-000?style=for-the-badge&logo=angular&logoColor=8b2ea9)
![Node.js](https://img.shields.io/badge/-Node.js-000?style=for-the-badge&logo=node.js&logoColor=8b2ea9)
![Chart.js](https://img.shields.io/badge/-Chart.js-000?style=for-the-badge&logo=chart.js&logoColor=8b2ea9)
![Auth0](https://img.shields.io/badge/-Auth0-000?style=for-the-badge&logo=auth0&logoColor=8b2ea9)

## Estrutura de pastas
  
```
/src
    /app
        /guards          # Proteção de rotas (autenticação e autorização)
        /interceptors    # Manipulação de requisições/respostas HTTP
        /models          # Modelos para tipagem e estruturação de dados
        /pages
            /auth        # Componentes para autenticação (login, registro)
            /index       # Componentes para as páginas principais
        /services        # Serviços para lógica de negócio e comunicação com o backend
    /assets
        /images          # Imagens estáticas usadas na aplicação
        /styles          # Estilos globais (CSS)
    /environments        # Configurações específicas para desenvolvimento e produção
angular.json             # Configurações gerais do Angular CLI
package.json             # Dependências e scripts do projeto
```  

## Rodando localmente

**1º Passo** - Rodar o backend localmente

-   Para acessar todas as funcionalidades da interface, navegue até o [repositório da API de Finanças Pessoais](https://github.com/kellyfmachado/personal-finance) e siga o passo a passo fornecido para configurar e executar o backend em sua máquina.
  
**2º Passo** - Clonar o repositório atual

- Clone o repositório atual em sua máquina local:

```bash
git clone https://github.com/kellyfmachado/front-end-personal-finance
```

**3º Passo** - Navegar até o diretório do projeto
 
- Após o clone, entre no diretório do projeto:

```bash
cd front-end-personal-finance
```

**4º Passo** - Instalar as dependências do projeto

- Execute o seguinte comando para instalar as dependências definidas no `package.json`:

```bash
npm install
```

  **5º Passo** - Iniciar o servidor de desenvolvimento
  
  - Execute o comando para iniciar o servidor localmente:
  
```bash  
npm start
```

  **6º Passo** - Acessar a aplicação 

- Abra o navegador e acesse a URL:

```bash
http://localhost:4200
```

## Interfaces

Autenticação:
- **Registro de usuário**
![Interface de registro de usuário](src/assets/images/register-interface.png)

- **Login**
 ![Interface de login](src/assets/images/login-interface.png)

Usuário:

- **Página inicial**
![Interface principal](src/assets/images/home-interface.png)

- **Logout**
![Interface de logout](src/assets/images/logout-interface.png)

- **Atualizar usuário**
![Interface de atualização de usuário](src/assets/images/update-user-interface.png)

- **Deletar usuário**
![Interface de exclusão de usuário](src/assets/images/delete-user-interface.png)

Transações:
- **Criar e listar transações**
![Interface de registro de transação](src/assets/images/add-transaction-interface.png)

- **Atualizar transação**
![Interface de atualização de transação](src/assets/images/update-transaction-interface.png)

- **Deletar transação**
![Interface de exclusão de transação](src/assets/images/delete-transaction-interface.png)

Categorias:
- **Criar e listar categorias**
![Interface de registro de categoria](src/assets/images/add-category-interface.png)

- **Atualizar categoria**
![Interface de atualização de categoria](src/assets/images/update-category-interface.png)

- **Deletar categoria**
![Interface de exclusão de categoria](src/assets/images/delete-category-interface.png)
