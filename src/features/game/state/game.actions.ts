export namespace GameActions {
  export class ChangeApp {
    static readonly type = '[App] Change app';

    constructor(public app: string) {}
  }
}
