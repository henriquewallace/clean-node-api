import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpReponse: HttpResponse = await controller.handle(httpRequest)
    if (httpReponse.statusCode === 200) {
      res.status(httpReponse.statusCode).json(httpReponse.body)
    } else {
      res.status(httpReponse.statusCode).json({
        error: httpReponse.body.message
      })
    }
  }
}
