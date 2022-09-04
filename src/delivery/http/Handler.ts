import { Router } from "express";
import User from "../../entity/User";
import Email from "../../valueobject/Email";
import Name from "../../valueobject/Name";
import Password from "../../valueobject/Password";
import jwt from 'jsonwebtoken'
import UserRepository from "../../repository/UserRepository";
import { MongoClient } from 'mongodb'
import Middleware from "./Middleware";
import JSON from "../../factory/JSON";

export default (connection: MongoClient | undefined): Router => {
  const router: Router = Router()
  const userRepo = new UserRepository(connection)

  router.post('/register', async (req, res) => {
    let name: Name = new Name(req.body.firstName, req.body.lastName)
    let email: Email = new Email(req.body.email)
    let password: Password = new Password()
    password.hash = req.body.password
    let user: User = new User(email, name, password)

    if (await userRepo.get(email.string())) {
      res.status(400).json({
        status: 'error ',
        message: 'This email is already in use',
        data: {
          email: email.string()
        }
      }).end()
    } else {
      try {
        userRepo.create(user)

        res.status(200).json({
          status: 'success',
          message: 'Registration success',
          data: {
            name: user.name,
            email: user.email.string(),
            password: user.password,
          }
        }).end()
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: 'There is something wrong with your request.' + error,
        }).end()
      }
    }
  })

  router.post('/login', async (req, res) => {
    try {
      if (await userRepo.get(req.body.email)) {
        let user: User = await userRepo.get(req.body.email)

        if (user.password.verify(req.body.password)) {
          res.status(200).json({
            status: 'success',
            message: 'Login success',
            data: {
              access_token: jwt.sign(JSON.user(user), String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: String(process.env.ACCESS_TOKEN_EXP) }),
              refresh_token: jwt.sign(JSON.user(user), String(process.env.ACCESS_TOKEN_SECRET))
            }
          }).end()
        } else {
          res.status(400).json({
            status: 'error',
            message: 'Invalid Credentials',
            data: {
              email: user.email.string()
            }
          }).end()
        }
      }
      else {
        res.status(400).json({
          status: 'error',
          message: 'Invalid Credentials',
          data: {
            emai: req.body.email
          }
        })
      }
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: 'There is something wrong with your request ' + error,
        data: {
          email: req.body.email
        }
      }).end()
    }
    return
  })

  router.post('/todo', async (req, res) => {
    if (req.body._id) {
      try {
        res.status(200).json({
          status: 'success',
          message: 'Todo has been added successfully',
          data: {

          }
        }).end()
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: 'There is something wrong with your request.' + error,
        }).end()
      }
    } else {
      res.status(400).json({
        status: 'error',
        message: 'There is something wrong with your request.'
      }).end
    }
  })

  /* ------------------------------ Testing Area ------------------------------ */
  router.get('/ping', (req, res) => {
    try {
      res.status(200).json({
        status: 'success',
        message: 'Server is up and ready to go!',
      }).end()
    } catch (error) {
      console.log(error)

      res.status(500).json({
        status: 'error',
        message: 'There is something wrong with your request.' + error
      }).end()
    }
  })

  router.post('/ping', (req, res) => {
    try {
      res.status(200).json({
        status: 'success',
        method: req.method,
        message: 'Server is up and ready to go!',
        request: req.body.message
      }).end()
    } catch (error) {
      console.log(error)

      res.status(500).json({
        status: 'error',
        message: 'There is something wrong with your request.' + error
      }).end()
    }
  })

  router.post('/token', async (req, res) => {

    try {
      let user = jwt.verify(
        req.body.token,
        String(process.env.REFRESH_TOKEN_SECRET)
      )
      console.log(user);

      res.status(200).json({
        status: 'success',
        data: {
          access_token: jwt.sign(user, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: String(process.env.ACCESS_TOKEN_EXPIRES_IN) })
        }
      }).end()
    } catch (error) {
      res.status(403).json({
        status: 'error',
        message: 'Failed to refresh token'
      }).end()
    }
  })

  router.get('/test', Middleware.authenticate, async (req, res) => {
    try {
      console.log(res.locals.user);

      res.status(200).json({
        status: 'success',
        message: 'Testing Complete',
        data: {
          user: res.locals.user
        }
      })
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'There is something wrong with your request' + '' + error,
      })
    }
  })
  return router
}