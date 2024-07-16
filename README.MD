# Balança de Buffet

App para medir o peso de pratos por "buffet por quilo" e "buffet livre" utilizando uma balança com conexão serial.

## Rodando o projeto

Clone o projeto e abra o diretório da pasta backend.

Em seguida copie o arquivo .env.example para .env e preencha as informações caso necessário.

Logo após rode o comando ```npm run dev``` para iniciar o servidor de desenvolvimento.

Assim que o backend estiver rodando, abra o diretório da pasta frontend e rode o comando ```npm start``` para iniciar o frontend.

## Funcionalidades
    - Aguardo de estabilização da balança
    - Configuraçao da conexao serial pelo frontend
    - Dados do pedido do prato em tempo real

## Funcionalidades futuras
    - Utilização de banco de dados
    - Integração com o maquininha de pagamento
    - Permitir a integração de outras ferramentas (Ex. webhook, api.)
    - Integração com o impressora térmica
    - Feedback de erros para o frontend
