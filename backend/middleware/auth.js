const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       // On extrait le jeton d'accès de la requête
       const token = req.headers.authorization.split(' ')[1];
       // On vérifie que le jeton soit valide
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       // On récupère le userId contenu dans le jeton décodé
       const userId = decodedToken.userId;
       // On vérifie que le userId qui fait la demande soit le même que celui qui a crée le token
       req.auth = {
           userId: userId
       };
        next();
   } catch(error) {
       res.status(401).json({ error });
   }
};