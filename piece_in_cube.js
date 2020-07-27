class PieceInCube {
  constructor(piece, cube) {
    this.pieces = new SetPiece();
    for (const point of cube.points) {
      piece.moveTo(point);
      if (cube.isContainsPiece(piece)) this.pieces.add(piece)
      for (let i = 0; i < 4; i++) {
        piece.rotateX();
        if (cube.isContainsPiece(piece)) this.pieces.add(piece)
        for (let j = 0; j < 4; j++) {
          piece.rotateY();
          if (cube.isContainsPiece(piece)) this.pieces.add(piece)
          for (let z = 0; z < 4; z++) {
            piece.rotateZ();
            if (cube.isContainsPiece(piece)) this.pieces.add(piece)
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
module.exports = PieceInCube;