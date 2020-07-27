const Point = require("./point")

class Piece {
  constructor(points, name = "") {
    this.name = name || "";
    this.points = points !== null ? points : [];
    this.size = this.points.length;
  }
  isContainsPoint(point) {
    for (const pointInPiece of this.points) {
      if (pointInPiece.equal(point)) return true
    }
    return false
  }
  isEqual(piece) {
    if (this.size !== piece.size) return false;
    for (const point of piece.points) {
      if (!this.isContainsPoint(point)) return false;
    }
    return true
  }
  clone() {
    const clonePoints = []
    this.points.forEach(point => clonePoints.push(new Point(point.x, point.y, point.z)))
    return new Piece(clonePoints, this.name)
  }
  moveTo(point) {
    const delta_x = point.x - this.points[0].x;
    const delta_y = point.y - this.points[0].y;
    const delta_z = point.z - this.points[0].z;
    this.move(delta_x, delta_y, delta_z)
  }
  move(delta_x, delta_y, delta_z) {
    this.points.forEach(point => {
      point.x += delta_x
      point.y += delta_y
      point.z += delta_z
    })
  }
  rotateX() {
    const { y: y0, z: z0 } = this.points[0];
    this.points.forEach(point => {
      const { y, z } = point;
      point.y = -(z - z0) + y0
      point.z = (y - y0) + z0
    })
  }
  rotateY() {
    const { x: x0, z: z0 } = this.points[0];
    this.points.forEach(point => {
      const { x, z } = point;
      point.z = -(x - x0) + z0
      point.x = (z - z0) + x0
    })
  }
  rotateZ() {
    const { x: x0, y: y0 } = this.points[0];
    this.points.forEach(point => {
      const { x, y } = point;
      point.x = -(y - y0) + x0
      point.y = (x - x0) + y0
    })
  }
}
module.exports = Piece;