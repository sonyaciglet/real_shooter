function coordsToText(x: number, y: number) {
  return "[" + Math.round(x) + ", " + Math.round(y) + "]";
}

export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toText() {
    return coordsToText(this.x, this.y);
  }
  distance(other: Point) {
    return Math.sqrt(
      Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2),
    );
  }
}
