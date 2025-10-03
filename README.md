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
- **Banco de Dados:** SQL  
- **Linguagens de Programação:** Python e JavaScript  

## Equipe
- Everton Paulino  
- Julia Christina  
- Lucas Julião  
- Wagner Kiota  



## Como Usar


- Baixe as dependências com 
    - npm install 

- Crie 2 terminais:

    1° Terminal
    - npm run dev

    2° Terminal
    - python Flask/app.py {Caminho pode variar no seu Dispositivo}

A aplicação é divida em 2 camnhos base:

- http://localhost:5173/user/~
- http://localhost:5000/api/~

# NOTE ÀS PORTAS SÃO DIFERENTES!!!

O primeiro caminho serve para a navegação da aplicação

O segundo serve para consultas no banco de dados

Exemplos

http://localhost:5000/api/getAllUsers -> Retorna todos usuarios do banco de dados

http://localhost:5000/api/user/1 -> Retorna o Usuario do ID = 1

# CASO VOCÊ APAGUE O BANCO DE DADOS APENAS REINICIE O TERMINAL 2°