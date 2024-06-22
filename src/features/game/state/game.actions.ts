export namespace GameActions {
  export class PrepareGame {
    static readonly type = '[Game] Prepare';

    constructor() {}
  }

  export class StartGame {
    static readonly type = '[Game] Start';

    constructor() {}
  }

  export class FinishGame {
    static readonly type = '[Game] Finish';

    constructor(public success: boolean) {}
  }

  export class UpdateInputText {
    static readonly type = '[Game] Update input text';

    constructor(public text: string) {}
  }

  export class WordWrittenSuccesfully {
    static readonly type = '[Game] Word written successfuly';

    constructor() {}
  }
}
