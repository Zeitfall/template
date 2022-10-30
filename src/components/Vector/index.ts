import {
  VectorConstructorInterface,
  VectorInterface,
} from '@interfaces';

export const Vector: VectorConstructorInterface<VectorInterface> = class implements VectorInterface {
  static readonly x: number;
  static readonly y: number;

  constructor(
    public x: number,
    public y: number
  ) {
    this.x = x;
    this.y = y;
  }

  copy(): VectorInterface {
    return new Vector(this.x, this.y);
  }

  add(v0: VectorInterface): this {
    this.x += v0.x;
    this.y += v0.y;

    return this;
  }

  subtract(v0: VectorInterface): this {
    this.x -= v0.x;
    this.y -= v0.y;

    return this;
  }

  multiply(v0: VectorInterface): this {
    this.x *= v0.x;
    this.y *= v0.y;
    
    return this;
  }

  divide(v0: VectorInterface): this {
    this.x *= v0.x**(-1);
    this.y *= v0.y**(-1);

    return this;
  }

  multiplyByScalar(value: number): this {
    this.x *= value;
    this.y *= value;

    return this;
  }

  divideByScalar(value: number): this {
    return this.divideByScalar(value**(-1));
  }

  dot(v0: VectorInterface): number {
    return this.x * v0.x + this.y * v0.y;
  }

  magnitudeSquared(): number {
    return this.x**2 + this.y**2;
  }

  magnitude(): number  {
    return this.magnitudeSquared()**.5;
  }

  setMagnitude(value: number): this {
    return this.normalize().multiplyByScalar(value);
  }

  distanceBetween(v0: VectorInterface): number {
    return v0.copy().subtract(this).magnitude();
  }

  normalize(): this {
    const LENGTH = this.magnitude();

    return this.divideByScalar(LENGTH);
  }
  
  limit(value: number): this {
    const MAGNITUDE_SQUARED = this.magnitudeSquared();

    if (MAGNITUDE_SQUARED > value**2) {
      this.divideByScalar(MAGNITUDE_SQUARED**.5).multiplyByScalar(value);
    }

    return this;
  }

  heading(): number {
    return Math.atan2(this.y, this.x);
  }

  setHeading(alpha: number): this {
    const MAGNITUDE = this.magnitude();

    this.x = MAGNITUDE * Math.cos(alpha);
    this.y = MAGNITUDE * Math.sin(alpha);

    return this;
  }

  rotate(alpha: number): this {
    const HEADING = this.heading();
    const MAGNITUDE = this.magnitude();

    this.x = MAGNITUDE * Math.cos(HEADING + alpha);
    this.y = MAGNITUDE * Math.sin(HEADING + alpha);

    return this;
  }

  angleBetween(v0: VectorInterface): number {
    const DOT = this.dot(v0) / (this.magnitude() * v0.magnitude());

    return Math.acos(Math.min(1, Math.max(-1, DOT)));
  }

  toArray(): Array<number> {
    return [this.x, this.y];
  }

  static create(x: number, y: number): VectorInterface {
    return new this(x, y);
  }

  static add(v0: VectorInterface, v1: VectorInterface): VectorInterface {
    return new this(v0.x + v1.x, v0.y + v1.y);
  }

  static subtract(v0: VectorInterface, v1: VectorInterface): VectorInterface {
    return new this(v0.x - v1.x, v0.y - v1.y);
  }

  static multiply(v0: VectorInterface, v1: VectorInterface): VectorInterface {
    return new this(v0.x * v1.x, v0.y * v1.y);
  }

  static divide(v0: VectorInterface, v1: VectorInterface): VectorInterface {
    return new this(v0.x / v1.x, v0.y / v1.y);
  }

  static multiplyByScalar(v0: VectorInterface, value: number): VectorInterface {
    return new this(v0.x * value, v0.y * value);
  }

  static divideByScalar(v0: VectorInterface, value: number): VectorInterface {
    return this.multiplyByScalar(v0, value**(-1));
  }

  static dot(v0: VectorInterface, v1: VectorInterface): number {
    return v0.x * v1.x + v0.y * v1.y;
  }

  static magnitudeSquared(v0: VectorInterface): number {
    return v0.x**2 + v0.y**2;
  }

  static magnitude(v0: VectorInterface): number {
    return this.magnitudeSquared(v0)**.5;
  }

  static setMagnitude(v0: VectorInterface, value: number): VectorInterface {
    return this.normalize(v0).multiplyByScalar(value);
  }

  static distanceBetween(v0: VectorInterface, v1: VectorInterface): number {
    return this.subtract(v0, v1).magnitude();
  }

  static normalize(v0: VectorInterface): VectorInterface {
    const MAGNITUDE = this.magnitude(v0);

    if (!MAGNITUDE) {
      return this.divideByScalar(v0, MAGNITUDE);
    }

    return v0;
  }

  static limit(v0: VectorInterface, value: number): VectorInterface {
    const MAGNITUDE_SQUARED = this.magnitudeSquared(v0);

    if (MAGNITUDE_SQUARED > value**2) {
      return this.divideByScalar(v0, MAGNITUDE_SQUARED).multiplyByScalar(value);
    }

    return v0;
  }

  static heading(v0: VectorInterface): number {
    return Math.atan2(v0.y, v0.x);
  }

  static setHeading(v0: VectorInterface, alpha: number): VectorInterface {
    const MAGNITUDE = this.magnitude(v0);

    const X = MAGNITUDE * Math.cos(alpha);
    const Y = MAGNITUDE * Math.sin(alpha);

    return new this(X, Y);
  }

  static rotate(v0: VectorInterface, alpha: number): VectorInterface {
    const HEADING = this.heading(v0);
    const MAGNITUDE = this.magnitude(v0);

    const X = MAGNITUDE * Math.cos(HEADING + alpha);
    const Y = MAGNITUDE * Math.sin(HEADING + alpha);

    return new this(X, Y);
  }

  static angleBetween(v0: VectorInterface, v1: VectorInterface): number {
    const DOT = this.dot(v0, v1) / (this.magnitude(v0) * this.magnitude(v1));

    return Math.acos(Math.min(1, Math.max(-1, DOT)));
  }

  static toArray(v0: VectorInterface): Array<number> {
    return [v0.x, v0.y];
  }
}
