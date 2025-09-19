const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  
    try {
      if (token && token.startsWith('Bearer')) {
      token = token.split(' ')[1];
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user = await prisma.users.findUnique({
        where:{
          id: decoded.id
        },
        select:{
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true
        }
      })
       
      next();
    } 
      else {
        res.status(401).json({ message: 'No token provided' });
      }
    }catch (error) {
          res.status(401).json({ message: 'Not authorized!' });
        }
};

module.exports = { protect };