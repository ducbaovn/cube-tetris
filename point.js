import * as THREE from './libs/three.module.js'
export default class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  equal(point) {
    return this.x === point.x && this.y === point.y && this.z === point.z
  }
  toThree(graphicColor) {
    const cubeGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
    const cubeMaterial = new THREE.MeshLambertMaterial( { color: graphicColor, map: new THREE.TextureLoader().load( 'square-outline-textured.png' ) } );
    const graphic = new THREE.Mesh( cubeGeo, cubeMaterial );
    graphic.position.set(this.x, this.y, this.z).multiplyScalar(50).addScalar(25);
    return graphic
  }
  static fromThree(mesh) {
    return new Point((mesh.position.x - 25)/50, (mesh.position.y - 25)/50, (mesh.position.z - 25)/50)
  }
}
