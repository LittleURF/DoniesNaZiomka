export namespace AppActions {
  export class ChangeApp {
    static readonly type = '[App] Change app';

    constructor(public app: string) {}
  }
}
