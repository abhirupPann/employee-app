const express =require("express")
const { protect } = require("../middleware/auth")
const {createTasks, getTasks, getCalTasks} = require("../controllers/taskController")
const router = express.Router();

router.use(protect);
router.post("/crtasks", createTasks);
router.get("/gettasks", getTasks);
router.get("/getcal", getCalTasks)
module.exports = router