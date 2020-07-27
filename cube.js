const Piece = require("./piece");
const Point = require("./point");

class Cube extends Piece {
  constructor(size) {
    const points = []
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          points.push(new Point(i, j, k))
        }
      }
    }
    super(points, `Cube-${size}x${size}`);
  }
  isContainsPiece(piece) {
    for (const point of piece.points) {
      if (!this.isContainsPoint(point)) return false;
    }
    return true;
  }
}

module.exports = Cube;