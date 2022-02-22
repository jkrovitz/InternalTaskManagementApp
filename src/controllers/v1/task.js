import { Router } from 'express'
import models from '../../models'
import asyncWrapper from '../../utils/asyncWrapper'
import JWTUtils from '../../utils/jwt-utils'

const router = Router()
const { Task } = models

router.post('/task', asyncWrapper(async (req, res) => {
  const task = req.body.task
  await Task.createNewTask({...req.body })

  // if this doesn't fail
  return res.status(200).send({
    success: true,
    message: 'Task successfully created',
  })
  }),

  router.get('/task/:id/', asyncWrapper(async(req, res) => {
    const id = req.params.id;
    Task.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else { // handles case where task doesn't exist in the database
          res.status(404).send({
            message: `Cannot find Task with id=${id}.`
          });
        }
      })
      .catch(err => { // handles internal server failure
        res.status(500).send({
          message: "Error retrieving Task with id=" + id
        });
      });
  })),

router.put('/task/:id/', asyncWrapper(async(req, res) => {
  const id = req.params.id;
  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe the task was not found or the request body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id=" + id
      });
    });
})),

router.delete('/task/:id/', asyncWrapper(async(req, res) => {
  const id = req.params.id;
   Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "The task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete the task with id=${id}. Maybe the task was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete the task with id=" + id
      });
    });

}))
)

export default router