const express = require("express");

const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);


// router.post("/", (req, res) => {
//     console.log("🔥 POST /api/tasks reached");
//     console.log(req.body);

//     res.json({
//         message: "POST route works"
//     });
// });

module.exports = router;