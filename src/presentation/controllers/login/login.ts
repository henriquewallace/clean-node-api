import { badRequest, serverError, unauthorized } from './../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'
import { Authentication } from '../../../domain/usecases/authentication'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email as string)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const acessToken = await this.authentication.auth(email as string, password as string)
      if (!acessToken) {
        return unauthorized()
      }

      return { statusCode: 200, body: {} }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
