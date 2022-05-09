export class UsernameNotAvailableException extends Error {
  constructor(message = 'username not available') {
    super(message);
  }
}
