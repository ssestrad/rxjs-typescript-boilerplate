export enum LogType {
  Log = 'log',
  Info = 'info',
  Warn = 'warn',
  Error = 'error'
}

export default class Logger {
  public name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public log(...args: string[]): void {
    this.record(LogType.Log, args);
  }

  public info(...args: string[]): void {
    this.record(LogType.Info, args);
  }

  public warn(...args: string[]): void {
    this.record(LogType.Warn, args);
  }

  public error(...args: string[]): void {
    this.record(LogType.Error, args);
  }

  private record(type: LogType, args: string[]): void {
    /* eslint-disable-next-line no-console */
    console[type](`[${this.name}]`, ...args);
  }
}
