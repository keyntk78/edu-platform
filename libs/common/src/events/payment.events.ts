export class PaymentSucceededEvent {
  static readonly pattern = 'payment.succeeded';
  constructor(
    public readonly paymentId: string,
    public readonly orderId: string,
    public readonly userId: string,
    public readonly amount: number,
  ) {}
}

export class PaymentFailedEvent {
  static readonly pattern = 'payment.failed';
  constructor(
    public readonly paymentId: string,
    public readonly orderId: string,
    public readonly userId: string,
    public readonly reason: string,
  ) {}
}
