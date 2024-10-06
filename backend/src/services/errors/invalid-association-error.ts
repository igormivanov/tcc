export class InvalidAssociationError extends Error {
  constructor() {
    super('User or Medical Duty not found')
  }
}