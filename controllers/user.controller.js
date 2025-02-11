const userModel = require("../models/user");
const express = require("express");
const auth = require("../services/auth.service");
const bcrypt = require("bcrypt");

class userController {
  async create(req, res) {
    try {
      let { email, password, firstName, lastName, cellphoneNumber, cpf } =
        req.body;

      const userExistsUser = await userModel.findByEmail(email);

      if (
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !cellphoneNumber ||
        !cpf
      ) {
        res
          .status(400)
          .json({
            message: `Verifique se os dados foram preenchidos corretamente`,
          });
        return;
      }

      if (userExistsUser.status) {
        res.status(409).json({
            message: `Usuário com o email ${email} já existe`,
            error: userExistsUser.error,
          });
        return;
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      const user = await userModel.register(
        email,
        hash,
        firstName,
        lastName,
        cellphoneNumber,
        cpf
      );

      if (user.status) {
        res.status(200).json({ message: "Usuário cadastrado com sucesso" });
      } else {
        res
          .status(400)
          .json({
            message:
              "Erro ao cadastrar Usuário, verifique se todos os campos foram preenchidos",
            error: user.error,
          });
      }
    } catch (error) {
      console.log("Erro inesperado: " + error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userModel.findByEmail(email);

      if (user.status) {
        const isValidPassword = await bcrypt.compare(
          password,
          user.result.password
        );

        if (isValidPassword) {
          const token = await auth(user.result, "2h");
          res.status(200).json({ message: "Login feito com sucesso", token: token });
        } else {
          res.status(401).json({ message: "Credênciais inválidas, verifique se seu email e senha estão corretos", });
        }
      } else {
        res.status(401).json({ message: "Erro ao encontrar usuário, verifique se todos os campos foram preenchidos corretamente", error: user.error, });
      }
    } catch (error) {
      console.log("Erro inesperado: " + error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async find(req, res) {
    try {
      const user = await userModel.find();

      if (user.status) {
        res.status(200).json({ users: user.result });
      } else {
        res.status(404).json({ message: "Nenhum usuário encontrado" });
      }
    } catch (error) {
      console.log("Erro inesperado: " + error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;

      const user = await userModel.findById(id);

      if (user.status) {
        res.status(200).json({ user: user.result });
      } else {
        res
          .status(404)
          .json({ message: `Não foi possivel encontra usuario com id ${id}` });
      }
    } catch (error) {
      console.log("Erro inesperado: " + error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const userExists = await userModel.findById(id);
      const { email, newPassword, actualPassword, firstName, lastName, cellphoneNumber, cpf } = req.body;
  
      
      if(!userExists.status){
        return res.status(404).json({ message: `Usuário com o id ${id} não encontrado` });
      }

      let updatePassword;
 
        if(newPassword){ 
            const isValidPassword = await bcrypt.compare(actualPassword, userExists.result.password);
            
            if(isValidPassword){
              const saltRounds = 10;
              const salt =  bcrypt.genSaltSync(saltRounds);
              updatePassword =  bcrypt.hashSync(newPassword, salt);
            }else{
              return res.status(400).json({message: "Senha atual incorreta"});
            }
        }else{
          updatePassword = undefined; 
        }
          
        const update = await userModel.update(id,email,updatePassword,firstName,lastName,cellphoneNumber,cpf);

        if (update.status) {
          return res.status(200).json({ message: `Usuário com o id ${id} atualizado com sucesso!`,
            });
        } else {
          return res.status(400).json({ message: `Erro ao atualizar Usuário com o id ${id}`, error: update.error});
        }

    } catch (error) {
      console.log("Erro inesperado: " + error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const userExists = await userModel.findById(id);

      if (userExists.status) {
        const del = await userModel.delete(id);

        if (del.status) {
          res
            .status(200)
            .json({ message: `Usuário com o id ${id} deletado com sucesso` });
        } else {
          res
            .status(400)
            .json({ message: `Erro ao deletar Usuário com o id ${id}` });
        }
      } else {
        res
          .status(404)
          .json({ message: `Usuário com o id ${id} não encontrado` });
      }
    } catch (error) {
      console.log("Erro inesperado: " + error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

module.exports = new userController();
