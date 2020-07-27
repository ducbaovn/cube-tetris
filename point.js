class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  equal(point) {
    return this.x === point.x && this.y === point.y && this.z === point.z
  }
}
module.exports = Point;