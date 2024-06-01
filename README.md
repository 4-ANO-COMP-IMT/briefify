### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente:

- [Node.js](https://nodejs.org/) 
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

### Passo a Passo

1. **Instale as dependências do projeto:**

Abra um terminal na raiz do projeto e execute o comando abaixo para instalar todas as dependências necessárias:

```sh
pnpm install
```

2. **Execute o servidor de desenvolvimento:**

Após a instalação das dependências, inicie o servidor de desenvolvimento com o comando:

```sh
pnpm run back:dev
```

3. **Execute as migrações do Prisma:**

Para configurar o banco de dados e aplicar todas as migrações necessárias, execute:

```sh
pnpm run back:prisma:run
```
