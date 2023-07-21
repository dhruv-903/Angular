const mongoose = require('mongoose');
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');
const getUser = require('../middleware/getUser')

const validateTask = [
  body('title').notEmpty().withMessage('Title cannot be empty.'),
  body('description').notEmpty().withMessage('Description cannot be empty.'),
]

const addTask = async (req, res) => {
  await Promise.all(validateTask.map(validation => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  else {

    await getUser(req, res, async () => {

      const task = req.body
      await Task.create({
        title: task.title,
        description: task.description,
        status: task.status,
        user: req.id
      })
      return res.json({message:"successfully added a task" })
    })
  }
}


const getTask = async (req, res) => {
  await getUser(req, res, async () => {
    let data = await Task.find({user:req.id});
    res.status(200).json({ data })

  })
}

const updateTask = async (req, res) => {

  await getUser(req,res,async ()=>{

    const task = req.body 
    await Task.findOneAndUpdate({ id: req.params.id, user:req.id, title: task.title, description: task.description, status: task.status });
    return res.json({ message:"Your task has been updated" })

  })
}

const deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id });
  return res.json({ task: req.params.id })
}

module.exports = {
  addTask,
  getTask,
  updateTask,
  deleteTask,
}
