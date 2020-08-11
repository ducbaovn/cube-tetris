import Piece from "./piece.js";

export default class MergePiece {
  constructor() {
    this.pieces = [];
  }
  isContainsPoint(point) {
    for (const piece of this.pieces) {
      if (piece.isContainsPoint(point)) return true;
    }
    return false;
  }
  canMerge(piece) {
    for (const mergePiece of this.pieces) {
      for (const point of piece.points) {
        if (mergePiece.isContainsPoint(point)) return false;
      }
    }
    return true;
  }
  add(piece) {
    if (!this.canMerge(piece)) throw Error("Cannot merge")
    this.pieces.push(piece)
  }
  remove() {
    this.pieces.pop()
  }
  merge() {
    const points = [];
    for (const piece of this.pieces) {
      for (const point of piece.points) {
        points.push(point);
      }
    }
    return new Piece(points);
  }
}