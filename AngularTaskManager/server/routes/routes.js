const express = require('express');
const router = express.Router();
const {addTask,getTask,updateTask,deleteTask} = require('../controllers/tasks')
const {register,login} = require('../controllers/user')

router.route('/task/add-task').post(addTask);
router.route('/task/get-tasks').get(getTask);
router.route('/task/update-task/:id').patch(updateTask)
router.route('/task/delete-task/:id').delete(deleteTask)

router.route('/api/login').post(login)
router.route('/api/register').post(register)
router.route('/api/logout')

module.exports = router;
