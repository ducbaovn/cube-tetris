import Point from './point.js';
import MergePiece from './merge_piece.js';
import Cube from './cube.js';
import PieceInCube from './piece_in_cube.js';

export default class CubeTetris {
  constructor(size, pieces) {
    this.size = size
    this.cube = new Cube(size);
    this.pieces = pieces;
    this.piecesInCube = pieces.map(piece => new PieceInCube(piece, this.cube))
    this.solution = new MergePiece();
    this.max = 0;
  }
  solve(x = 0, y = 0, z = 0) {
    const targetPoint = new Point(x, y, z)
    if (this.solution.merge().isEqual(this.cube)) return;
    if (this.solution.isContainsPoint(targetPoint)) {
      if (x === this.size - 1 && y === this.size - 1 && z === this.size - 1) return; 
      if (x === this.size - 1 && y === this.size - 1) return this.solve(0, 0, z + 1)
      if (x === this.size - 1) return this.solve(0, y + 1, z)
      return this.solve(x + 1, y, z)
    }
    let i = 0;
    if (this.max < this.solution.pieces.length) {
      this.max = this.solution.pieces.length;
      console.log(this.max);
    };
    while (i < this.piecesInCube.length) {
      const pieceInCube = this.piecesInCube.shift()
      for (const piece of pieceInCube.getAll()) {
        if (piece.isContainsPoint(targetPoint) && this.solution.canMerge(piece)) {
          this.solution.add(piece)
          if (x === this.size - 1 && y === this.size - 1) {
            this.solve(0, 0, z + 1)
          } else if (x === this.size - 1) {
            this.solve(0, y + 1, z)
          } else {
            this.solve(x + 1, y, z)
          }
          if (!this.solution.merge().isEqual(this.cube)) this.solution.remove()
        }
      }
      if (!this.solution.merge().isEqual(this.cube)) this.piecesInCube.push(pieceInCube);
      i++
    }
  }
}

// const p1 = new Piece([
  //   new Point(0,0,0),
  //   new Point(1,0,0),
  //   new Point(2,0,0),
  //   new Point(0,1,0),
  //   new Point(0,2,0),
  //   new Point(0,1,1),
  // ], "A")
  // const p2 = new Piece([
  //   new Point(0,0,0),
  //   new Point(1,0,0),
  //   new Point(2,0,0),
  //   new Point(0,0,1),
  //   new Point(0,0,2),
  //   new Point(2,0,1),
  // ], "B")
  // const p3 = new Piece([
  //   new Point(0,0,0),
  //   new Point(1,0,0),
  //   new Point(2,0,0),
  //   new Point(1,1,0),
  //   new Point(1,2,0),
  //   new Point(2,2,0),
  //   new Point(0,0,1),
  //   new Point(2,0,1),
  // ], "C")
  // const p4 = new Piece([
  //   new Point(0,0,0),
  //   new Point(1,0,0),
  //   new Point(2,0,0),
  //   new Point(0,0,1),
  //   new Point(2,1,0),
  // ], "D")
  // const p5 = new Piece([
  //   new Point(0,0,0),
  //   new Point(1,0,0),
  //   new Point(0,1,0),
  //   new Point(0,1,1),
  //   new Point(1,1,1),
  //   new Point(0,2,1),
  // ], "E")
  // const p6 = new Piece([
  //   new Point(0,0,0),
  //   new Point(1,0,0),
  //   new Point(2,0,0),
  //   new Point(0,1,0),
  //   new Point(0,2,0),
  //   new Point(2,0,1),
  //   new Point(2,1,1),
  // ], "F")
  // const p7 = new Piece([
  //   new Point(0,0,0),
  //   new Point(0,1,0),
  //   new Point(0,2,0),
  //   new Point(0,0,1),
  //   new Point(1,0,1),
  // ], "G")
  // const cube = new Cube(CUBE_SIZE);
  // const p8 = new Piece([
  //   new Point(0,0,0),
  //   new Point(1,0,0),
  //   new Point(1,0,1),
  //   new Point(1,1,0),
  //   new Point(2,1,0),
  //   new Point(1,2,0),
  //   new Point(1,2,1),
  // ], "H")
  // const p9 = new Piece([
  //   new Point(0,0,0),
  //   new Point(1,0,0),
  //   new Point(0,1,0),
  //   new Point(0,2,0),
  //   new Point(1,2,0),
  //   new Point(2,2,0),
  //   new Point(2,3,0),
  //   new Point(0,0,1),
  // ], "I")
  // const p10 = new Piece([
  //   new Point(0,0,0),
  //   new Point(0,1,0),
  //   new Point(1,0,0),
  //   new Point(0,-1,0),
  //   new Point(-1,0,0),
  //   new Point(0,0,1),
  // ], "J")