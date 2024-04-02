import * as THREE from 'three';

export default class Glass {
  private obj: THREE.Group;
  constructor(scene: THREE.Scene) {
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, // 玻璃的颜色
        transparent: true, // 开启透明度
        reflectivity: 1, // 反射率
        //类似透明度
        transmission: 1,
        opacity: 0.8,
        // shadowOpacity: 0.5,
        //金属度
        metalness: 0,
        //粗糙
        roughness: 0,
        //折射率
        ior: 1.52,
        //厚度 透过看物体的模糊程度
        thickness: 0.2,
        //镜面强度
        specularIntensity: 1,
        //镜面颜色
        specularColor: 0xFFFFFF,
        //光强度
        lightMapIntensity: 1,
        side: THREE.DoubleSide,
        depthWrite: false, // 关闭深度写入，使内部可见
        depthTest: true // 开启深度测试
      });

    const height = 4;
    const glassGeometry = new THREE.CylinderGeometry(1, 1, height, 64, 32, true);

    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.castShadow = true;
    glassMesh.position.y = height / 2;

    // 创建液体模型
    const liquidHeight = 3;
    // const textureLoader = new THREE.TextureLoader();
    // const reflectionMap = textureLoader.load('aurora.png')
    const liquidGeometry = new THREE.CylinderGeometry(0.9, 0.9, liquidHeight, 32);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3e1f0f,
      transparent: true,
      opacity: 0.7,
      reflectivity: 0.5, // 反射率
      //折射率
      ior: 1.52,
      // refractionRatio: 0.8,
      //金属度
      metalness: 0.5,
      //镜面强度
      specularIntensity: 1,
      //镜面颜色
      specularColor: 0xFFFFFF,
      //光强度
      lightMapIntensity: 1,
      // envMap: reflectionMap,
    });
    const liquidMesh  = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.y = liquidHeight / 2 + 0.2; // 放置在杯底
    const group = this.obj = new THREE.Group();
    group.add(glassMesh);
    group.add(liquidMesh);
    scene.add(group);
  }

  setPosition(x: number, y: number, z: number) {
    this.obj.position.set(x, y, z);
  }
}