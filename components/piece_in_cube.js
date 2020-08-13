export default class PieceInCube {
  constructor(piece, cube) {
    this.pieces = new SetPiece();
    const clone = piece.clone()
    for (const point of cube.points) {
      clone.moveTo(point);
      if (cube.isContainsPiece(clone)) this.pieces.add(clone)
      for (let i = 0; i < 4; i++) {
        clone.rotateX();
        if (cube.isContainsPiece(clone)) this.pieces.add(clone)
        for (let j = 0; j < 4; j++) {
          clone.rotateY();
          if (cube.isContainsPiece(clone)) this.pieces.add(clone)
          for (let z = 0; z < 4; z++) {
            clone.rotateZ();
            if (cube.isContainsPiece(clone)) this.pieces.add(clone)
          }
        }
      }
    }
  }
  getAll() {
    return this.pieces.items;
  }
}
class SetPiece {
  constructor() {
    this.items = [];
  }
  isExist(piece) {
    for (const item of this.items) {
      if (piece.isEqual(item)) return true
    }
    return false
  }
  add(piece) {
    if (!this.isExist(piece)) this.items.push(piece.clone());
  }
}