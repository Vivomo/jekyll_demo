import * as THREE from 'three';
const textureLoader = new THREE.TextureLoader();

export default class Desk extends THREE.Object3D {
  constructor() {
    super();
    const box = new THREE.BoxGeometry(30, 1, 8);

    const texture = textureLoader.load('./wood.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

// 设置纹理在水平和垂直方向的重复次数
    const repeatX = 12;
    const repeatY = 5;
    texture.repeat.set(repeatX, repeatY);
    const woodMaterial = new THREE.MeshStandardMaterial({
      // color: 0x8B4513, // 木头的颜色（棕色）
      roughness: 1, // 控制表面的粗糙度（0-1）
      metalness: 0.1 // 控制金属感（0-1）
    });
    woodMaterial.map = texture;
    const desk = new THREE.Mesh(box, woodMaterial);
    desk.position.y = -0.5;
    desk.receiveShadow = true;
    return desk;
  }
}
