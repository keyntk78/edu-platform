export class UserRegisteredEvent {
  static readonly pattern = 'user.registered';
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string,
  ) {}
}

export class UserDeletedEvent {
  static readonly pattern = 'user.deleted';
  constructor(public readonly userId: string) {}
}
