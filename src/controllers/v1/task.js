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
        } else {
          res.status(404).send({
            message: `Cannot find Task with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Task with id=" + id
        });
      });
  }))
)

export default router