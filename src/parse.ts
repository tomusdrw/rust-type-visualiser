export class Type {
  public type: string = '';
  public args: Type[] = [];
  private raw: string = '';

  public isTuple(): boolean {
    return this.type === ''
  }

  public hashCode(): number {
    const string = this.toString();
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  public getColor(): string {
    if (this.args.length === 1 && this.args[0].args.length !== 0) {
      return this.args[0].getColor();
    }
      
    const hue = this.hashCode() % 360;
    return `hsl(${hue}, 45%, 85%)`;
  }

  public getShortName(): string {
    // a tuple
    if (this.isTuple()) {
      return `(${this.args.map(x => x.getShortName()).join(', ')})`;
    }

    if (this.args.length === 0) {
      return this.type;
    }

    if (this.args.length === 1) {
      return `${this.type}<${this.args[0].getShortName()}>`;
    }

    return `${this.type}<...>`;
  }

  public toString(): string {
    // memoized toString
    if (this.raw) {
      return this.raw;
    }

    // a tuple
    if (this.isTuple()) {
      this.raw = `(${this.args.map(x => x.toString()).join(', ')})`;
      return this.raw;
    }

    // regular type
    if (this.args.length === 0) {
      return this.type;
    }

    // generic type
    this.raw = `${this.type}<${this.args.map(x => x.toString()).join(', ')}>`;
    return this.raw;
  }
}

export class ParseResults {
  public roots: Type[];
  public flat: { 
    [key:string]: Type
  };
  
  constructor(types: Type[]) {
    this.roots = types;
    this.flat = {};

    // we need to deduplicate all the types and construct flat versions
    const toProcess = types.slice();
    let next = toProcess.shift();
    while (next) {
        this.flat[next.toString()] = next;
        toProcess.push.apply(toProcess, next.args);
        next = toProcess.shift();
    }
  }
}

export function parse(str: string): ParseResults {
  // first extract the type (between ``)
  const startIdx = str.indexOf('`')
  const endIdx = str.lastIndexOf('`')

  const type = str.substring(startIdx + 1, endIdx)
  const len = type.length

  // do parse
  const result = new Type();
  const finished: Type[] = [];
  const current = [result];

  function finishChild() {
      const top = current.pop();
      if (!top) {
        return;
      }

      if (current.length > 0) {
        current[current.length - 1].args.push(top);
      } else {
        finished.push(top)
      }
  }

  function startChild() {
    current.push(new Type());
  }

  for (let i = 0; i < len; i += 1) {
    const char = type[i];

    /// Bound parsing.
    if (char === ':' && type[i + 1] === ' ') {
      finishChild();
      startChild();
      continue;
    }

    // ignore spaces too
    if (char === ' ' || char === '\n') {
      // special case dyn types
      const isDyn = current.length && current[current.length - 1].type.endsWith('dyn');
      if (!isDyn) {
        continue;
      }
    }

    /// start parsing the next child
    if (char === ',') {
      finishChild()
      startChild();
      continue;
    }

    // generic braces
    if (char === '<') {
      startChild();
      continue;
    }
    if (char === '>') {
      finishChild();
      continue;
    }

    // tuples
    if (char === '(') {
      startChild();
      continue;
    }
    if (char === ')') {
      finishChild();
      continue;
    }

    if (current.length === 0) {
      console.warn(`Ignoring: ${char}`)
    } else {
      current[current.length - 1].type += char;
    }
  }

  return new ParseResults(finished.concat(current));
}
