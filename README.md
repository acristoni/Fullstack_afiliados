# Marcenaria Diferente - Afiliados Fullstack
Mono-repo contendo o Front-end em ReactJs(NextJs) e (2 microsserviços - usuário e pedidos)back-end em NestJs, para a Marcenaria Diferente.

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
Realizei uma cobertura de testes unitários no microsserviço de usuários, como exemplo de teste unitário.

Na pasta **microsservice-users/**

Teste unitários:
```
yarn test:cov
```

# Passos para a elaboração do projeto
1. Utilizei como boilerplate um projeto que criei do zero, que se encontra [nesse repositório](https://github.com/acristoni/monorepo-front-microsservicos).

2. Busquei na documentação do NestJs uma maneira de tratar o upload do documento .txt e tratar os dados. Encontrei [aqui](https://docs.nestjs.com/techniques/file-upload) um norte para a solução.

3. Trabalhei na entidade, criei enuns para tratar de maneira apropriada os tipos de vendas e desenvolvi o serviço para salvar as informações no bd, utilizando as Promises para otimizar o processamento com múltiplas threads.

4. Trabalhei na listagem e no upload das vendas pelo front, e refatorei o processo de upload do arquivo, agora o mesmo é convertido no front para um array de strings e esse array é enviado para o back, economizando uso de banda.

5. Refatorei o serviço de listagem no back para realizar o somatório dos pedidos e criei um exibidor desse totalizador no Front.

