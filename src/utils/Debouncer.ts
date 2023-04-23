class Debouncer {
  timeout: number = 0;
  delay: number = 500;

  constructor({ delay }: { delay: number } = { delay: 500 }) {
    this.delay = delay;
  }

  exec(fn: () => Promise<void> | void) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(fn, this.delay);
  }
}

export default Debouncer;
