import { Router } from "express";

export default (handler: Router) => {
  const router: Router = Router()

  router.use('/v1', handler)

  return router
}