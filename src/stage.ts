import { rootClock, scene } from "./main";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const floorGeometry = new THREE.PlaneGeometry(100, 100, 32, 32);
const glassFloorMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
glassFloorMaterial.transparent = true;
glassFloorMaterial.opacity = 0.1;
const gridFloorMaterial = new THREE.MeshPhongMaterial({
  color: "#aaaacc",
  side: THREE.DoubleSide,
  wireframe: true,
});
const glassFloor = new THREE.Mesh(floorGeometry, glassFloorMaterial);
const gridFloor = new THREE.Mesh(floorGeometry, gridFloorMaterial);
glassFloor.receiveShadow = true;
glassFloor.position.y = -2.5;
glassFloor.rotation.x = 90;
gridFloor.position.y = -2.5;
gridFloor.rotation.x = 90;

const fog = new THREE.Fog("#ddddff", 1, 40);

const loader = new GLTFLoader();

let folderGltfModel: THREE.Group | undefined = undefined;

const FolderMaterial = new THREE.MeshPhongMaterial({
  color: "#FFDE9E",
  side: THREE.DoubleSide,
});
export const folderPos = new THREE.Vector3(-10.5, 0, -0.2);

export const initStage = () => {
  scene.add(glassFloor);
  scene.add(gridFloor);
  scene.fog = fog;

  loader.load(
    "folder.gltf",
    (gltf) => {
      folderGltfModel = gltf.scene;
      folderGltfModel.scale.set(7, 7, 7);
      folderGltfModel.position.set(folderPos.x, folderPos.y, folderPos.z);
      folderGltfModel.traverse((child) => {
        const childMesh = child as THREE.Mesh;
        if (childMesh.isMesh) {
          childMesh.material = FolderMaterial;
          childMesh.castShadow = true;
        }
      });
      scene.add(folderGltfModel);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  updateStage();
};

export const updateStage = () => {
  requestAnimationFrame(updateStage);
  moveFolder();
};

export const moveFolder = () => {
  if (!folderGltfModel) return;
  const t = rootClock.getElapsedTime();
  folderGltfModel.rotation.set(
    0,
    Math.sin(t) * 0.2 + 5,
    Math.sin(t * 0.3) * 0.2
  );
};
