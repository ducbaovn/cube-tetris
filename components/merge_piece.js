import Piece from "./piece.js";

export default class MergePiece {
  constructor(camera, scene, renderer) {
    this.pieces = [];
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
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
  async add(piece) {
    if (!this.canMerge(piece)) throw Error("Cannot merge")
    this.pieces.push(piece);
    if (this.camera != null && this.scene != null) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.scene.add(piece.toThree());
      this.renderer.render(this.scene, this.camera);
    }
  }
  async remove() {
    this.pieces.pop();
    if (this.camera != null && this.scene != null) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.scene.children.pop();
      this.renderer.render(this.scene, this.camera);
    }
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