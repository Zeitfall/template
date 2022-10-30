export interface VectorInterface {
  x: number;
  y: number;

  copy(): VectorInterface;
  add(v0: VectorInterface): this;
  subtract(v0: VectorInterface): this;
  multiply(v0: VectorInterface): this;
  divide(v0: VectorInterface): this;
  multiplyByScalar(value: number): this;
  divideByScalar(value: number): this;
  dot(v0: VectorInterface): number; 
  magnitudeSquared(): number;
  magnitude(): number;
  setMagnitude(value: number): this;
  distanceBetween(v0: VectorInterface): number;
  normalize(): this;
  limit(value: number): this;
  heading(): number;
  setHeading(alpha: number): this;
  rotate(alpha: number): this;
  angleBetween(v0: VectorInterface): number;
  toArray(): Array<number>;
}

export interface VectorConstructorInterface<T> {
  x: number;
  y: number;

  new(x: number, y: number): T;

  create(x: number, y: number): T;
  add(v0: T, v1: T): T;
  subtract(v0: T, v1: T): T;
  multiply(v0: T, v1: T): T;
  divide(v0: T, v1: T): T;
  multiplyByScalar(v0: T, value: number): T;
  divideByScalar(v0: T, value: number): T;
  dot(v0: T, v1: T): number;
  magnitudeSquared(v0: T): number;
  magnitude(v0: T): number;
  setMagnitude(v0: T, value: number): T;
  distanceBetween(v0: T, v1: T): number;
  normalize(v0: T): T;
  limit(v0: T, value: number): T;
  heading(v0: T): number;
  setHeading(v0: T, alpha: number): T;
  rotate(v0: T, alpha: number): T;
  angleBetween(v0: T, v1: T): number;
  toArray(v0: T): Array<number>;
}