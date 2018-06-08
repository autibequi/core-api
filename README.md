# CORE API

Esse projeto visa criar APIs eficientes para os principais serviços do esporte interativo.

## Quick Start

Esse projeto usa Docker para no seu ambiente de produção e desenvolvimento para iniciar o ambiente de desenvolvimento basta rodar `make start`. 

Para acessar o ambiente docker para rodar comandos do gerenciador de pacotes `yarn` basta rodar `make access`.

## Deploy

Esse projeto utiliza o elasticbeanstalk como ambiente de produção. Sera nescessario o cli do eb para rodar comandos de deploys. Para instalar o eb-cli basta rodar:

```sh
pip install awsebcli --upgrade --user
```

## Teste de carga

É possivel fazer um teste de carga simples pra API usando `testload`.

Primeiro instale o `testload` rodando `npm install -g testload`.

Depois rode o seguinte exemplo

```sh
loadtest http://URL/auth -T 'application/json' -P '{"email":"???","password":"???"}' -c 10 --rps 20
```