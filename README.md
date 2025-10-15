# Projeto Integrado – Curso de Informática

## Descrição
O projeto consiste no desenvolvimento de uma aplicação web para o rastreio e monitoramento de animais de estimação por meio de uma coleira inteligente.  
A coleira envia as coordenadas de localização do animal, permitindo que o usuário visualize sua posição aproximada na aplicação.  

Além disso, a aplicação possibilita configurar alarmes que delimitam o raio máximo de movimentação. Caso o animal ultrapasse esse limite, uma notificação será enviada ao usuário no front-end.

## Objetivo
Oferecer uma solução tecnológica que auxilie tutores no monitoramento de seus animais, aumentando a segurança e reduzindo os riscos de perda.

## Tecnologias Utilizadas
- **Frontend:** React (com Vite)  
- **Backend:** Flask (API REST)  
- **Banco de Dados:** SQLite
- **Linguagens de Programação:** Python e JavaScript  
- **Outras Tecnologias :** HTML , CSS

## Equipe
- Everton Paulino  
- Julia Christina  
- Lucas Julião  
- Wagner Kiota  



## Como Usar

- Baixe as dependências com 
    - npm install

- Crie um terminal:

    Execute:
    - npm run dev


# O programa irá abrir dois terminais no PowerShell , não se assute é apenas o back-end rodando!!!

A aplicação é divida em 2 camnhos base:

- http://localhost:5173/~
- http://127.0.0.1:5000/~

O primeiro caminho serve para a navegação da aplicação
O segundo serve para consultas no banco de dados

Para simular os dados de uma coleira execute o arquivo gerador_de_coordenadas