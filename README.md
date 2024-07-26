# Projeto Pinte Pinturas

React + TypeScript + Vite

## ✨ Como Executar Localmente
```bash
$ # Clone ou descompacte o código
$ git clone https://gitlab.sfiec.org.br/senai-istemm/pinte-pinturas/pinte-pinturas-frontend
$ cd pinte-pinturas-frontend
$
$ # Substitua o arquivo example.env por .env e atualize os valores das variáveis de acordo com suas configurações.
$ # Exemplo: VITE_APP_API="http://<ip-da-maquina>:8080/api"
$ cp example.env .env
$
$ # Instalação dos pacotes
$ # Pode usar yarn ou npm
$ npm install
$
$ # Inicie a aplicação (development mode)
$ npm run dev
$
$ # Acesse a aplicação web no navegador: http://localhost:5173/
```

> Nota: Para utilizar o aplicativo corretamente é necessário ter o backend em execução.

<br />

## ✨ Como Executar no Docker

1. Clone ou descompacte o código-fonte
1. Substitua o arquivo `example.env` por `.env` e atualize os valores das variáveis de acordo com suas configurações. Exemplo: VITE_APP_API="http://<ip-da-maquina>:8080/api"
1. Execute os containers com o seguinte comando:
 
    ```bash
    # Usando o arquivo docker-compose padrão
    docker-compose up -d --build
    ```
1. Após finalizar o processo de instalação, o sistema estará disponível para acessar no navegador.

<br />



