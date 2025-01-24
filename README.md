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
- **Rota:** `/api/restaurant/create`  
- **Descrição:** Registra um novo restaurante.  
- **Parâmetros de Requisição:**  
  - **Body:**  
    ```json
    {
      "name": "Dom Ramon"
    }
    ```

- **Respostas:**  
  - **Sucesso:**  
    ```json
    {
      "message": "Restaurante Dom Ramon criado com sucesso",
      "restaurant": {
        "id": 1,
        "name": "Dom Ramon",
        "createdAt": "2025-01-24T15:57:51.794Z",
        "updatedAt": "2025-01-24T15:57:51.794Z"
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
- **Rota:** `/api/restaurant/find`  
- **Descrição:** Retorna todos os registros de restaurantes.  
- **Parâmetros de Requisição:** Nenhum.  

- **Respostas:**  
  - **Sucesso:**  
    ```json
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

--- 

Essa versão está mais estruturada e legível, facilitando a compreensão. 🚀