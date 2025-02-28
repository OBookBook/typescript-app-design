class Fraction2 {
  // 省略記法
  constructor(private _numerator: number, private _denominator: number) {}

  add(other: Fraction2): Fraction2 {
    const resultNumerator =
      this._numerator * other._denominator +
      this._denominator * other._numerator;
    const resultDenominator = this._denominator * other._denominator;

    return new Fraction2(resultNumerator, resultDenominator);
  }

  toString() {
    return `${this._numerator}/${this._denominator}`;
  }

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
console.log(f2.toString()); // 1/2

const result = f2.add(f2);
console.log(result.toString());
