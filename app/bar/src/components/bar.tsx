import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Desk from './desk.ts';
import Glass from './glass.ts';
import Bg from './bg.ts';

const Bar = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.receiveShadow = true;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 8);
    // const helper = new THREE.CameraHelper( camera );
    // scene.add( helper );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x999999, 1.0);
    renderer.shadowMap.enabled = true;
    new OrbitControls( camera, renderer.domElement );

    wrapperRef.current!.appendChild(renderer.domElement);

    const glassGeometry = new THREE.CylinderGeometry(1, 1, 2, 12, 1, true); // 参数：顶部半径、底部半径、高度、分段数
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, // 玻璃的颜色
      transparent: true, // 开启透明度
      // opacity: 0.5, // 设置透明度（0-1）
      reflectivity: 0.9, // 反射率
      //类似透明度
      transmission: 0.9,
      opacity: 1,
      //金属度
      metalness: 0,
      //粗糙
      roughness: 0,
      //折射率
      ior: 1.52,
      //厚度 透过看物体的模糊程度
      thickness: 0.8,
      //镜面强度
      specularIntensity: 1,
      //镜面颜色
      specularColor: 0xFFFFFF,
      //光强度
      lightMapIntensity: 1,

    });

    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.position.set(0, 0.75, 0);
    // glassMesh
    // scene.add(glassMesh);
    new Glass(scene);
    const glass2 = new Glass(scene);
    glass2.setPosition(-3, 0, 0);
    // new Bg(scene);

    const desk = new Desk();
    scene.add(desk);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.castShadow = true;
    light.position.set(10, 10, 10);
    scene.add(light);

    // const light2 = new THREE.AmbientLight(0xffffff, 1);
    // light2.castShadow = true;
    // light2.position.set(5, 6, 0);
    // scene.add(light2);

    function animate() {
      requestAnimationFrame(animate);
      // 旋转玻璃杯或其他动画操作
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      wrapperRef.current!.innerHTML = '';
    }


  }, []);

  return (
    <div ref={wrapperRef}/>
  );
};

export default Bar;