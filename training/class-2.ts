class Fraction2 {
  // 省略記法
  constructor(private _numerator: number, private _denominator: number) {}

  get numerator() {
    return this._numerator;
  }

  get denominator() {
    return this._denominator;
  }
}

const f2 = new Fraction2(1, 2);
console.log(f2.numerator); // 1
console.log(f2.denominator); // 2
