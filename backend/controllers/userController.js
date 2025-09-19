const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

//signup endpoint
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = "user";
  try {
    const userExists = await prisma.users.findUnique({
      where:{
        email
      }
    })
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 6);

    const user = await prisma.users.create({
    data: {
      name,
      email,
      password:hashedPassword,
      role
    },
  });
    res.status(201).json({

      token: generateToken(user.id),
      name: user.name,
      role: user.role
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: 'Registration Failed' });
  }
};

//login endpoint
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where:{
        email
      }
    }) 
    if(!user) {
      return res.status(404).json({message: "User Doesnot exist! Please signup"})
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password); 
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({

      token: generateToken(user.id),
      name: user.name,
      role: user.role
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUser = async(req, res)=>{
    try {
      const allUser = await prisma.users.findMany({
        select:{
          name:true
        }
      })
      res.status(201).json({allUser})
    } catch (err) {
          console.error("All User Error:", err);
         res.status(500).json({ message: 'Server error' });
    }
}