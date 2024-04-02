import * as THREE from 'three';

export default class Bg {

  public map: THREE.Texture;

  constructor(scene: THREE.Scene) {
    // 创建平面几何体

// 加载贴图
    const textureLoader = new THREE.TextureLoader();
    const texture = this.map = textureLoader.load('/aurora.jpg'); // 替换 'texture.jpg' 为你的贴图路径


    // 创建球体几何体
    const sphereGeometry = new THREE.SphereGeometry(40, 32, 32);


// 创建材质
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // 使用 THREE.BackSide 来确保贴图在球体内部显示

// 创建球体网格
    const sphereMesh = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphereMesh);


  }
}