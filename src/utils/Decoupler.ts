import { BehaviorSubject, Subject, filter, take } from "rxjs";

export type TAction<PAction, PControlId, PPayload> = {
  type: PAction;
  id: { id: PControlId; uid?: string };
  payload?: PPayload;
};

/**
 * Decoupler decouples IO agent handling (io step of the main loop)
 * and pure function logic of the application (reduce step of the main loop)
 * while not being opinionated about what tools you use under the hood
 *
 * @public
 * @method constructor: Creates an instance of Decoupler with the initial state and reducer function.
 * @method registerIOHandler: Registers an IO handler to the ioHandlers array.
 * @method sendAction: Sends an action to be processed by the main loop.
 * @method init: Initializes the application loop with the initial state and starts the application.
 *
 */
export class Decoupler<PState, PAction, PControlId, PPayload> {
  private ActionSubject = new Subject<TAction<PAction, PControlId, PPayload>>();
  private IOQueueSubject = new BehaviorSubject<
    Array<TAction<PAction, PControlId, PPayload>>
  >([]);
  private StateSubject: BehaviorSubject<PState>;

  private ioHandlers: ((state: PState) => void)[] = [];

  private update: (
    state: PState,
    action: TAction<PAction, PControlId, PPayload>
  ) => PState;

  /**
   * Creates an instance of Decoupler.
   *
   * @param {PState} initialState - The initial state of the application.
   * @param {(state: PState, action: TAction<PAction, PControlId, PPayload>) => PState} update - The update function.
   */
  constructor(
    initialState: PState,
    update: (
      state: PState,
      action: TAction<PAction, PControlId, PPayload>
    ) => PState
  ) {
    this.StateSubject = new BehaviorSubject<PState>(initialState);
    this.update = update;

    this.ActionSubject.subscribe((action) => {
      this.IOQueueSubject.next([...this.IOQueueSubject.getValue(), action]);
    });
  }

  /**
   * Registers an IO handler to the ioHandlers array.
   *
   * @param {(state: PState) => void} handler - The handler function to be registered.
   */
  registerIOHandler(handler: (state: PState) => void) {
    this.ioHandlers.push(handler);
  }

  /**
   * Run IO handlers in a non-blocking way and resolves a promise
   * once an action is received from one of the IO agents.
   *
   * @param {PState} state - The state of the application.
   * @returns {Promise<TAction<PAction, PControlId, PPayload>>} - Promise that resolves to the received action.
   */
  private io(state: PState) {
    return new Promise<TAction<PAction, PControlId, PPayload>>((res) => {
      // NOTE: Run IO Agents in a non-blocking way
      this.ioHandlers.forEach((handler) => {
        handler(state);
      });

      this.IOQueueSubject.pipe(
        // NOTE: Main loop will be waiting until action is received
        // from one of the IO agents
        filter((queue) => queue.length > 0),
        take(1)
      ).subscribe((queue) => {
        const nextQueue = queue.slice(1);
        this.IOQueueSubject.next(nextQueue);
        res(queue[queue.length - 1]);
      });
    });
  }

  /**
   * Sends an action to be processed by the main loop.
   *
   * @param {TAction<PAction, PControlId, PPayload>} action - The action to be sent.
   */
  sendAction(action: TAction<PAction, PControlId, PPayload>) {
    this.ActionSubject.next(action);
  }

  /**
   * Initializes the application loop with the initial state.
   * This is the main entry point of the application.
   */
  init() {
    const initialState = this.StateSubject.getValue();
    // A representation of application/stateful agent
    const applicationLoop = async (state: PState): Promise<void> => {
      try {
        // Non-pure function.
        const action = await this.io(state);

        // Pure function. TDD friendly
        const nextState = this.update(state, action);

        return applicationLoop(nextState);
      } catch (e) {
        console.error(e);
        return applicationLoop(state);
      }
    };

    // Start the Application
    applicationLoop(initialState);
  }
}
