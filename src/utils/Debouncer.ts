class Debouncer {
  timeout = 0;
  delay = 200;

  constructor({ delay }: { delay: number } = { delay: 200 }) {
    this.delay = delay;
  }

  exec(fn: () => Promise<void> | void) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(fn, this.delay);
  }
}

export default Debouncer;
