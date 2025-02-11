# **API de Gestão de Reservas - DineManager**

O **DineManager** é um sistema para gerenciar reservas em restaurantes, desenvolvido para explorar funcionalidades do Node.js e aprimorar habilidades no desenvolvimento backend. 

## **Funcionalidades**
- **Cadastro de Restaurantes:** Adicionar e gerenciar informações como nome e endereço dos restaurantes.
- **Gerenciamento de Mesas:** Controle das mesas disponíveis para reserva.
- **Agendamento de Reservas:** Permite aos clientes fazerem reservas com data e hora.
- **Gestão de Horários:** Configuração flexível dos horários de funcionamento e disponibilidade de mesas.

---

## **Tecnologias Utilizadas**
- **Node.js:** Ambiente de execução para o backend.
- **Express:** Framework para construção de APIs RESTful.
- **MySQL:** Banco de dados relacional.
- **Sequelize:** ORM para interagir com o banco de dados.
- **dotenv:** Gerenciamento de variáveis de ambiente.

---

## **Como Rodar**
### **1. Instalar as dependências**
```bash
npm install
```

### **2. Configurar o banco de dados**
- Crie um banco de dados MySQL.
- Preencha as informações de conexão no arquivo `.env`:

```bash
PORT=porta_da_api

# Configurações do banco de dados
DATABASE=nome_do_banco
DB_USERNAME=usuario
DB_PASSWORD=senha
DB_HOST=host_do_banco
```

### **3. Iniciar a aplicação**
- Com Node.js:
```bash
node index.js
```
- Com Nodemon (se instalado):
```bash
nodemon index.js
```

---

## **Endpoints RESTAURANTE**

### **1. Cadastro de Restaurante**
- **Método HTTP:** `POST`  
- **Rota:** `/create`  
- **Descrição:** Registra um novo restaurante.  
- **Parâmetros de Requisição:**  
  - **Body:**  
    ```json
    {
      "name": "Cantina Romana",
      "capacity": 300,
      "cellphoneNumber": "(67)99933-9293"
    }
    ```

- **Respostas:**  
  - **Sucesso:**  
    ```json
    {
      "message": "Restaurante Cantina Romana criado com sucesso",
      "restaurant": {
        "id": 5,
        "name": "Cantina Romana",
        "capacity": 300,
        "cellphoneNumber": "(67)99933-9293",
        "updatedAt": "2025-02-06T15:18:29.565Z",
        "createdAt": "2025-02-06T15:18:29.565Z"
      }
    }
    ```
  - **Erro:**  
    ```json
    {
      "message": "Erro ao criar restaurante"
    }
    ```

**Observação:** Por padrão, 25 mesas são criadas automaticamente ao registrar um restaurante.

---

### **2. Listagem de Restaurantes**
- **Método HTTP:** `GET`  
- **Rota:** `/find`  
- **Descrição:** Retorna todos os registros de restaurantes.  
- **Parâmetros de Requisição:** Nenhum.  

- **Respostas:**  
  - **Sucesso:**  
    ```json
    {
      "restaurants": {
        "status": true,
        "restaurant": [
          {
            "id": 2,
            "name": "Coco Bambu - Afonso Pena",
            "capacity": 450,
            "cellphoneNumber": "(67)99567-2342",
            "createdAt": "2025-02-06T02:35:57.000Z",
            "updatedAt": "2025-02-06T15:04:10.000Z"
          }
        ]
      }
    }
    ```
  - **Erro:**  
    ```json
    {
      "message": "Nenhum restaurante encontrado"
    }
    ```

---
### **3. Listagem de Restaurantes por ID**
- **Método HTTP:** `GET`  
- **Rota:** `/find/:id`  
- **Descrição:** Retorna as informações do restaurante, incluindo as mesas, endereço, horarios e o usuario responsável.  
- **Parâmetros de Requisição:** Id.  

- **Respostas:**  
  - **Sucesso:**  
    ```json
        {
          "restaurant": {
            "id": 1,
            "name": "Cantina Romana",
            "address": null,
            "table": [
              {
                "id": 9,
                "restaurantId": 1,
                "number": 9,
                "capacity": 5,
                "location": "Salão interno",
                "reservation": []
              },
              {
                "id": 8,
                "restaurantId": 1,
                "number": 8,
                "capacity": 5,
                "location": "Salão interno",
                "reservation": []
              },
              {
                "id": 7,
                "restaurantId": 1,
                "number": 7,
                "capacity": 5,
                "location": "Salão interno",
                "reservation": []
              },
              {
                "id": 6,
                "restaurantId": 1,
                "number": 6,
                "capacity": 5,
                "location": "Salão interno",
                "reservation": []
              },
              {
                "id": 5,
                "restaurantId": 1,
                "number": 5,
                "capacity": 5,
                "location": "Salão interno",
                "reservation": []
              },
              {
                "id": 4,
                "restaurantId": 1,
                "number": 4,
                "capacity": 5,
                "location": "Salão interno",
                "reservation": []
              },
              {
                "id": 3,
                "restaurantId": 1,
                "number": 3,
                "capacity": 5,
                "location": "Salão interno",
                "reservation": []
              },
              {
                "id": 2,
                "restaurantId": 1,
                "number": 2,
                "capacity": 5,
                "location": "Salão interno",
                "reservation": []
              },
              {
                "id": 1,
                "restaurantId": 1,
                "number": 1,
                "capacity": 5,
                "location": "Salão interno",
                "reservation": []
              }
            ],
            "schedule": []
          }
  }
    ```
  - **Erro:**  
    ```json
    {
      "message": false,
      "error": "Não foi possivel encontrar um restaurante com o id: 122"
    }
    ```

---
### **4. Update Restaurante**
- **Método HTTP:** `PUT`  
- **Rota:** `/update/:id`  
- **Descrição:** Atualiza os dados do restaurante selecionado.  
- **Parâmetros de Requisição:**  
  - **Body:**  
    ```json
    {
      "name": "Coco bambu",
      "capacity":350 ,
      "cellphoneNumber": "(67)995585568"
    }
    ```

- **Respostas:**  
  - **Sucesso:**  
    ```json
    {
      "message": "Restaurante com o id 1 atualizado com sucesso!",
      "restaurant": [
        1
      ]
    }
    ```
  - **Erro:**  
    ```json
    {
      "message": "Restaurante com o id 12 não encontrado"
    }
    ```

---
### **5. Delete Restaurante**
- **Método HTTP:** `DELETE`  
- **Rota:** `/delete/:id`  
- **Descrição:** Delete o restaurante selecionado.  
- **Parâmetros de Requisição:** Id.

- **Respostas:**  
  - **Sucesso:**  
    ```json
    {
      "message": "Restaurante com o id 1 deletado com sucesso"
    }
    ```
  - **Erro:**  
    ```json
    {
      "message": "Restaurante com o id 1 não encontrado"
    }
    ```

---

## **Observações Finais**
Este projeto ainda não está pronto e é um protótipo para fins de aprendizado e pode ser expandido com mais funcionalidades, como autenticação, notificações e relatórios avançados.

