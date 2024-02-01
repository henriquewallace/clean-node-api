import { badRequest } from './../helpers/http-helper';
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    const requiredFields = ['name', 'email']
    requiredFields
      .filter(field => !httpRequest.body[field])
      .forEach(field => new MissingParamError(field))

    return {
      statusCode: 200,
      body: 'Success'
    }
  }
}
