const { PrismaClient} =  require("@prisma/client");

const prisma = new PrismaClient();
//createtasks

const createTasks = async(req, res)=>{
      try {
          const {name, role} = req.user;
          if(role != "admin"){
            res.status(404).json({
                message: "User is not an admin"
            })
          }

          let {title, s_date, e_date, em_name, hours, period } = req.body;
          const status = "on_going"
          const action = "NIL"
          s_date = s_date.split('-').reverse().join('-')
          e_date = e_date.split('-').reverse().join('-')
          const empres = await prisma.users.findFirst({
            where:{
              name: em_name
            },
            select:{
              id: true
            }
          })

          const em_id = empres ? empres.id : null;

          const response = await prisma.allTasks.create({
            data:{
                title, 
                s_date, 
                e_date, 
                em_name,
                status, 
                action,
                em_id,
                hours,
                period
            }
          })
          res.status(201).json({
            name,
            response
          })
      } catch (err) {
            console.error("Create Tasks:", err);
            res.status(500).json({ message: 'Cannot Create Tasks' });
  }
}

//gettasks
const getTasks = async(req, res)=>{
    try {
        const {name, id, role} = req.user;
        let tasks;
        if(role === "admin"){
           tasks = await prisma.allTasks.findMany();
        }else if(role === "user"){
           tasks = await prisma.allTasks.findMany({
            where:{
                em_name: name
            },
            select:{
                title: true, 
                s_date: true, 
                e_date: true, 
                status: true, 
                action: true,
                hours: true,
                period: true
             
            }
           }
           );
        }
        res.status(201).json({
            tasks
        })
      } catch (err) {
            console.error("Get All Tasks", err);
            res.status(500).json({ message: 'Cannot Show Tasks' });
  }
}

//get calendar data
const getCalTasks = async(req,res)=>{
      try {
        const {date} = req.body;
        
        const tasks = await prisma.allTasks.findMany({
          where:{
            s_date: {
              endsWith: date
            }
          },
          select:{
            em_name: true,
            hours: true,
            period: true,
            title: true,
            s_date: true,
            e_date: true,

          }
        }) 
        res.status(201).json(tasks);
      } catch (err) {
            console.error("Get Calendar Tasks", err);
            res.status(500).json({ message: 'Cannot show calendar tasks ' });
  }
}

//statusupdate
const updateStatus = async()=>{
  try {
    
  } catch (error) {
    
  }
}
module.exports = {createTasks, getTasks, getCalTasks, updateStatus}