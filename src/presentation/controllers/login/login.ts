import { badRequest, serverError } from './../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
      }

      if (!password) {
        return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
      }

      const isValid = this.emailValidator.isValid(email as string)
      if (!isValid) {
        return await new Promise(resolve => { resolve(badRequest(new InvalidParamError('email'))) })
      }

      return await new Promise(resolve => { resolve({ statusCode: 200, body: {} }) })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
