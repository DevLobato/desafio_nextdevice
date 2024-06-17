## Descrição

Projeto realizado com [Nest](https://github.com/nestjs/nest), framework nodejs, para construção de uma API de Leilão de Livros.

Aplicação web para Leilão de livros: os Vendedor irão cadastrar seus livros disponíveis para Leilão e os Comprador irão buscar por livros do seu interesse, e dar seu lance.

## Instalação

```bash
$ npm install
```

## Para rodar, execute:

```bash
# Banco PostgreSQL
$ docker-compose up -d

# modo desenvolvimento
$ npm run start:dev
```

## Anotações

[Link do Notion](https://www.notion.so/Desafio-Next-Device-3bf9a01d82c046d2a5a8d06d9814afac?pvs=4)

## Documentação API - Swagger

[API Next](http://localhost:3000/api)

## Requisitos Funcionais

- RF01 Login e SingUp sera realizado pelo authService [OK]
- RF02 Usuario, se Vendedor, cadastra Livro [OK]
- Utilizar os recursos de Volume e Estante, do Google Books API
  - https://developers.google.com/books/docs/v1/using?hl=pt-br#WorkingVolumes
- RF03 Comprador visualiza os Livros [ ] (Tratar no Front)
- RF03 Comprador realiza Oferta no Livro [OK]
- RF04 Comprador acompanha status do Livro [] (Tratar no Front)
- RF05 Vendedor aprova ou recusa a Oferta [ ]
- RF06 Comprador filtra os tipos de Livro [ ]
- RF07 Se o Livro cadastrado receber a primeira oferta, o Leilao e iniciado [ ]
- RF08 Apos uma Oferta ser aprovada, o Leilao deve ser encerrado [ ]
- RF09 'External' Google Books API, busca os Livros para cadastrar no sistema [OK]
- RF10 'External' sistema deve armazenar as imagens dos livros no S3 [ ]
