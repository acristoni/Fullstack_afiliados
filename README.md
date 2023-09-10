# Marcenaria Diferente - Afiliados Fullstack
Mono-repo contendo o Front-end em ReactJs(NextJs) e (2 microsserviços - usuário e pedidos)back-end em NestJs, para a TechSocial.

# Subir aplicação localmente
Rode o comando para subir todos os containeres da aplicação

```
sudo docker-compose up --build
```
**Após subir localmente:**
[Front-end](http://localhost:3000)
[Documentação microsserviço usuário, com Swagger](http://localhost:3003/api)
[Documentação microsserviço pedido, com Swagger](http://localhost:3333/api)

# Testes
Realizei uma cobertura de testes unitários em cada microsserviço.

Nas pastas **microsservice-orders/ e microsservice-users/**

Teste unitários:
```
yarn test:cov
```

# Passos para a elaboração do projeto
1. Utilizei como boilerplate um projeto que criei do zero, que se encontra [nesse repositório](https://github.com/acristoni/monorepo-front-microsservicos).

2. Busquei na documentação do NestJs uma maneira de tratar o upload do documento .txt e tratar os dados. Encontrei [aqui](https://docs.nestjs.com/techniques/file-upload) um norte para a solução.

3. Trabalhei na entidade, criei enuns para tratar de maneira apropriada os tipos de vendas e desenvolvi o serviço para salvar as informações no bd, utilizando as Promises para otimizar o processamento com múltiplas threads.

