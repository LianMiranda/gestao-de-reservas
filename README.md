# Api de gestão de reservas DineManager

Sistema de Gestão de Reservas para Restaurantes

Essa api é um projeto de gestão de reservas feita para testar algumas funções do nodejs e aprimorar minhas habilidades:

    Cadastro de Restaurantes: Adicionar e gerenciar um restaurante, incluindo informações como nome e endereço
    Gerenciamento de Mesas: Cadastro e controle de mesas disponíveis para reserva.
    Agendamento de Reservas: Permite aos clientes fazerem reservas com informações sobre a data e hora.
    Gestão de Disponibilidade de Horários: O sistema permite configurar horários de funcionamento e disponibilidades de mesas de forma flexível.

## Tecnologias utilizadas

    Node.js: Ambiente de execução para o backend.
    Express: Framework para construção de APIs RESTful.
    MySQL: Banco de dados relacional para armazenar informações de restaurantes, mesas, reservas e clientes.
    Sequelize: ORM para facilitar a interação com o banco de dados MySQL.
    dotenv: Gerenciamento de variáveis de ambiente.

## Para rodar
    1° Instale as dependencias do sistema:

    ````bash
        npm install
    ````

    2° Crie um banco de dados mysql.

    3° Coloque as informações do banco no dotenv:

    ````bash
        PORT = porta da api

        #Configs do banco de dados
        DATABASE = nome do banco
        DB_USERNAME = nome do usuario
        DB_PASSWORD = senha do banco
        DB_HOST = host do banco
    ````

    4° Rode a aplicação:

    ````bash
        node index.js
    ````

    Ou se tiver o nodemon instalado:

    ````bash
        nodemon index.js
    ````

# EndPoints

    CREATE
        Método HTTP: POST
        Rota: /api/restaurant/create 
        Descrição: Registra um novo restaurante
        Parâmetros de Requisição:

        Parâmetro: name

        Body:

        ````bash
        {
            "name": "Dom Ramon"
        }
        ````

        Respostas:

        - Sucesso 

        ````bash
            {
                "message": "Restaurante Dom Ramon criado com sucesso",
                "restaurant": {
                    "id": 1,
                    "name": "Dom Ramon",
                    "updatedAt": "2025-01-24T15:57:51.794Z",
                    "createdAt": "2025-01-24T15:57:51.794Z"
                }
            }
        ````

        - Erro

        ````bash
        {
            "message": "Erro ao criar restaurante"
        }
        ````


        Observação: Por padrão, 25 mesas relacionadas com o restaurante são criadas logo após o restaurante ser registrado.

    FIND
        Método HTTP: GET
        Rota: /api/restaurant/find 
        Descrição: Puxa todos os registros de restaurantes.
        Parâmetros de Requisição: nenhum.

        Respostas:

        - Sucesso 

        ````bash
           {
                "restaurants": {
                    "status": true,
                    "result": [
                        {
                            "id": 1,
                            "name": "Dom Ramon",
                            "createdAt": "2025-01-24T16:09:59.000Z",
                            "updatedAt": "2025-01-24T16:09:59.000Z"
                        }
                    ]
                }
            }
        ````

        - Erro

        ````bash
        {
            "message": "Nenhum restaurante encontrado"
        }
        ````





