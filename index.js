const Point = require('./point');
const Piece = require('./piece');
const MergePiece = require('./merge_piece');
const Cube = require('./cube');
const PieceInCube = require('./piece_in_cube');
const CUBE_SIZE = 4;

const p1 = new Piece([
  new Point(0,0,0),
  new Point(1,0,0),
  new Point(2,0,0),
  new Point(0,1,0),
  new Point(0,2,0),
  new Point(0,1,1),
], "A")
const p2 = new Piece([
  new Point(0,0,0),
  new Point(1,0,0),
  new Point(2,0,0),
  new Point(0,0,1),
  new Point(0,0,2),
  new Point(2,0,1),
], "B")
const p3 = new Piece([
  new Point(0,0,0),
  new Point(1,0,0),
  new Point(2,0,0),
  new Point(1,1,0),
  new Point(1,2,0),
  new Point(2,2,0),
  new Point(0,0,1),
  new Point(2,0,1),
], "C")
const p4 = new Piece([
  new Point(0,0,0),
  new Point(1,0,0),
  new Point(2,0,0),
  new Point(0,0,1),
  new Point(2,1,0),
], "D")
const p5 = new Piece([
  new Point(0,0,0),
  new Point(1,0,0),
  new Point(0,1,0),
  new Point(0,1,1),
  new Point(1,1,1),
  new Point(0,2,1),
], "E")
const p6 = new Piece([
  new Point(0,0,0),
  new Point(1,0,0),
  new Point(2,0,0),
  new Point(0,1,0),
  new Point(0,2,0),
  new Point(2,0,1),
  new Point(2,1,1),
], "F")
const p7 = new Piece([
  new Point(0,0,0),
  new Point(0,1,0),
  new Point(0,2,0),
  new Point(0,0,1),
  new Point(1,0,1),
], "G")
const cube = new Cube(CUBE_SIZE);
const p8 = new Piece([
  new Point(0,0,0),
  new Point(1,0,0),
  new Point(1,0,1),
  new Point(1,1,0),
  new Point(2,1,0),
  new Point(1,2,0),
  new Point(1,2,1),
], "H")
const p9 = new Piece([
  new Point(0,0,0),
  new Point(1,0,0),
  new Point(0,1,0),
  new Point(0,2,0),
  new Point(1,2,0),
  new Point(2,2,0),
  new Point(2,3,0),
  new Point(0,0,1),
], "I")
const p10 = new Piece([
  new Point(0,0,0),
  new Point(0,1,0),
  new Point(1,0,0),
  new Point(0,-1,0),
  new Point(-1,0,0),
  new Point(0,0,1),
], "J")
const piecesInCube = [
  new PieceInCube(p1,cube),
  new PieceInCube(p2,cube),
  new PieceInCube(p3,cube),
  new PieceInCube(p4,cube),
  new PieceInCube(p5,cube),
  new PieceInCube(p6,cube),
  new PieceInCube(p7,cube),
  new PieceInCube(p8,cube),
  new PieceInCube(p9,cube),
  new PieceInCube(p10,cube),
]
const mergePiece = new MergePiece();

function solve(x = 0, y = 0, z = 0) {
  const targetPoint = new Point(x, y, z)
  if (mergePiece.merge().isEqual(cube)) return;
  if (mergePiece.isContainsPoint(targetPoint)) {
    if (x === 3 && y === 3 && z === 3) return; 
    if (x === 3 && y === 3) return solve(0, 0, z + 1)
    if (x === 3) return solve(0, y + 1, z)
    return solve(x + 1, y, z)
  }
  let i = 0;
  while (i < piecesInCube.length) {
    const pieceInCube = piecesInCube.shift()
    for (const piece of pieceInCube.getAll()) {
      if (piece.isContainsPoint(targetPoint) && mergePiece.canMerge(piece)) {
        mergePiece.add(piece)
        if (x === 3 && y === 3) {
          solve(0, 0, z + 1)
        } else if (x === 3) {
          solve(0, y + 1, z)
        } else {
          solve(x + 1, y, z)
        }
        if (!mergePiece.merge().isEqual(cube)) mergePiece.remove()
      }
    }
    if (!mergePiece.merge().isEqual(cube)) piecesInCube.push(pieceInCube);
    i++
  }
}

solve();
console.log("================================");
mergePiece.pieces.forEach(item => console.log(item));