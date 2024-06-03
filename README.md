
## Briefify: Simplificando a Gestão de Reuniões

### Resumo do Projeto

A Briefify é uma empresa inovadora que oferece um aplicativo para transformar áudios de reuniões em atas detalhadas e precisas automaticamente. Focada em aumentar a produtividade empresarial, a Briefify atende empresas de todos os portes, proporcionando eficiência na documentação de reuniões com uma interface amigável e tecnologia avançada de processamento de linguagem natural.

## Integrantes do Grupo BGC 

| Nome                           | RA         |
| ------------------------------ | ---------- |
| Bruno Augusto Lopes Fevereiro  | 20.02194-0 |
| Gabriel Bianconi               | 20.00822-8 |
| Carlos Alberto Matias da Costa | 20.01308-6 |

## Pré-requisitos

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
