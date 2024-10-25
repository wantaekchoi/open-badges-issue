export const EventEmitterSymbol = Symbol('EventEmitter');

export interface EventEmitter {
  emit<Event>(event: string, value: Event): boolean;
}
