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

## **Endpoints**

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

### **2. Listar Restaurantes**
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

## **Observações Finais**
Este projeto ainda não está pronto e é um protótipo para fins de aprendizado e pode ser expandido com mais funcionalidades, como autenticação, notificações e relatórios avançados.

