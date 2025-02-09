const jwt = require("jsonwebtoken");


function verifyToken(req, res, next){
  try {
    const authToken = req.headers['authorization'];

    if(authToken){
        const bearer = authToken.split(" ");
        const token = bearer[1]

        const decoded = jwt.verify(token, process.env.SECRET);

        if(decoded){
            next();
        }
    }else{
       res.status(403).json({message: "Você não está autorizado!"})
    }

  } catch (error) {
        res.status(500).json({message: "Erro interno no servidor", error});
        console.log("Erro inesperado "+error);   
  }
}

module.exports = verifyToken;