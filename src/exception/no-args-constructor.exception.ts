export class NoArgsConstructor extends Error {
  private static readonly MESSAGE = 'No arguments constructor';
  constructor() {
    super(NoArgsConstructor.MESSAGE);
  }
  static throw(): never {
    throw new NoArgsConstructor();
  }
}
