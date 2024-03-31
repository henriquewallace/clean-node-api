import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols'
import { Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  private readonly fieldName: string
  private readonly emailValidator: EmailValidator

  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName] as string)
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }

    return null as unknown as Error
  }
}
