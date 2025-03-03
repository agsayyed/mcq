import { Logger as ILogger } from '../types/mcq.types';

export class Logger implements ILogger {
  private environment: string;
  private level: 'debug' | 'warn';

  constructor(environment: string) {
    this.environment = environment;
    this.level = 'debug';
  }

  debug(message: string) {
    if (this.environment === 'development' && this.level === 'debug') {
      console.debug(message);
    }
  }

  warn(message: string) {
    if (this.environment !== 'production') {
      console.warn(message);
    }
  }

  error(message: string, error?: unknown) {
    if (this.environment !== 'production') {
      console.error(message, error);
    }
  }

  separator(message: string) {
    console.log('--- ' + message + ' ---');
  }

  setLevel(level: 'debug' | 'warn') {
    this.level = level;
  }
}

const environment: string = window.HUGO_ENVIRONMENT || 'unknown';
if (environment === 'unknown') {
  console.info('Environment is unknown, defaulting to production');
} else {
  console.debug(`mcqlogger.ts: creating new Logger instance with ${window.HUGO_ENVIRONMENT}`);
}
const log = new Logger(environment);
export default log;
