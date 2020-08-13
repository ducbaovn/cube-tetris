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
    this.possible = pieces.reduce((count, p) => count += p.size, 0) === size * size * size
  }
  solve(x = 0, y = 0, z = 0) {
    const targetPoint = new Point(x, y, z)
    if (!this.possible || this.solution.merge().isEqual(this.cube)) return;
    if (this.solution.isContainsPoint(targetPoint)) {
      if (x === this.size - 1 && y === this.size - 1 && z === this.size - 1) return; 
      if (x === this.size - 1 && y === this.size - 1) return this.solve(0, 0, z + 1)
      if (x === this.size - 1) return this.solve(0, y + 1, z)
      return this.solve(x + 1, y, z)
    }
    let i = 0;
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
