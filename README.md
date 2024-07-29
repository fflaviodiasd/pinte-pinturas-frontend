# Pinte Pinturas FrontEnd

![ReactJS](https://img.shields.io/badge/reactJS-3670A0?style=for-the-badge&logo=react)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

Aplicação Web de gestão de serviços da construção civil, com aplicação de Computação em Nuvem e Big Data e foco
inicial nos serviços de pinturas de obras.

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Material UI](https://mui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material React Table](https://www.material-react-table.com/)
- [ApexCharts](https://apexcharts.com/react-chart-demos/)
- [Styled-Components](https://styled-components.com/)
- [ReactJS](https://pt-br.reactjs.org/)
- [Socket.IO](https://socket.io/docs/v4/)

## Requisitos

### 1 - Node 20.0
```
sudo apt update -y

sudo apt upgrade -y

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

nvm install 20
```
### 2 - Git

```
sudo apt-get update && sudo apt upgrade

sudo apt install git -y

git --version
```

## 💻 Como Executar Localmente

### 1 - Clone ou descompacte o código

```
git clone https://gitlab.sfiec.org.br/senai-istemm/pinte-pinturas/pinte-pinturas-frontend.git
```

### 2 - Navegue até a pasta

```
cd pinte-pinturas-frontend/

npm install

npm run dev
```

### 4 - Crie o arquivo .env

```
touch .env
```

## 📂 Estrutura Base do Projeto

O projeto foi codificado usando a estrutura apresentada abaixo.

```
│
├── public/
│   └── icon.ico
│
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── AppLayout/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── Sidebar/
│   │       ├── index.tsx
│   │       └── styles.ts
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   │   ├── Login/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── RecoverPasswd/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── ResetPasswd/
│   │       ├── index.tsx
│   │       └── styles.ts
│   ├── routes/
│   │   ├── app.routes.tsx
│   │   ├── auth.routes.tsx
│   │   └── index.tsx
│   ├── screens/
│   │   ├── Appointments/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Clients/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Collaborators/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Constructions/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Dashboard/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Home/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Materials/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Measurements/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── Settings/
│   │       └── index.tsx
│   ├── Service/
│   │   └── index.tsx
│   ├── types/
│   │   └── index.tsx
│   ├── utils/
│   │   └── index.tsx
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── serviceWorker.js
│
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```
