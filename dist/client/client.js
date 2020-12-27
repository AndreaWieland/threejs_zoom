import * as THREE from '/build/three.module.js';
import { FirstPersonControls } from '/jsm/controls/FirstPersonControls';
import { Vector3 } from '/build/three.module.js';
//clock required for FP controls
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
//
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
let controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 25;
controls.lookSpeed = 0.3;
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('textures/cube/galaxy/');
const cubeTexture = cubeTextureLoader.load([
    'px.jpg', 'nx.jpg',
    'py.jpg', 'ny.jpg',
    'pz.jpg', 'nz.jpg',
]);
scene.background = cubeTexture;
const light = new THREE.PointLight(0xc555ed, 10, 0, 0);
light.position.set(50, 1500, 200);
scene.add(light);
const light2 = new THREE.AmbientLight(0x404040, 75); // soft white light
scene.add(light2);
const starmat = new THREE.MeshStandardMaterial({ color: 0xE2B22D,
    roughness: 0.0,
    metalness: 0.95, });
const starshape = new THREE.Shape();
starshape.moveTo(0, 6);
starshape.lineTo(0.65, 4);
starshape.lineTo(3.6, 4);
starshape.lineTo(1.214, 2.262);
starshape.lineTo(2, 0);
starshape.lineTo(0, 1.38);
starshape.lineTo(-2, 0);
starshape.lineTo(-1.214, 2.262);
starshape.lineTo(-3.6, 4);
starshape.lineTo(-0.65, 4);
starshape.lineTo(0, 6);
const extrudeSettings = {
    steps: 2,
    depth: 0.01,
    bevelEnabled: true,
    bevelThickness: 0.5,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 5
};
const stargeometry = new THREE.ExtrudeGeometry(starshape, extrudeSettings);
const material = [
    new THREE.MeshStandardMaterial({ color: 0xE8C300,
        roughness: 0.0,
        metalness: 0.95, }),
    new THREE.MeshStandardMaterial({ color: 0xE2B22D,
        roughness: 0.0,
        metalness: 0.95, })
];
const mesh = new THREE.Mesh(stargeometry, material);
mesh.translateY(-3);
mesh.translateZ(-5);
scene.add(mesh);
for (let i = 0; i < 75; i++) {
    const dup = mesh.clone();
    dup.translateX((Math.random() * 1000) - 500);
    dup.translateY((Math.random() * 1000) - 500);
    dup.translateZ((Math.random() * 1000) - 500);
    dup.rotateY(Math.random());
    scene.add(dup);
}
// CREATE ORBS 
// ########################################################################               
const texture = new THREE.TextureLoader().load('textures/Diffuse2.jpg');
const orb_geometry = new THREE.SphereGeometry(0.2, 32, 32);
const orb_material = new THREE.MeshStandardMaterial({
    roughness: 0.0,
    metalness: 0.95,
    map: texture,
    bumpMap: texture,
    bumpScale: 0.1,
    wireframe: false
});
const orb1 = new THREE.Mesh(orb_geometry, orb_material);
scene.add(orb1);
const orb2 = new THREE.Mesh(orb_geometry, orb_material);
scene.add(orb2);
const orb3 = new THREE.Mesh(orb_geometry, orb_material);
scene.add(orb3);
//CREATE LINES
//###########################################################
const MAX_POINTS = 1500;
//vertex colors lets each line point be individually defined
let line_material = new THREE.LineBasicMaterial({ color: 0xffffff, vertexColors: true, linewidth: 20 });
//set up three line meshes with buffer geometry. the animate loop modifies properties of the geometry uniquely, so the three lines can not share a geometry. Create buffergeo, add the position and color attributes with empty arrays to be manipulated at render. Arrays must be typed. the second int argument tells the program how to parse the array. (3 vertices or colors represent one point). Setting frustumculled flag makes sure the line is rendered even when not looking at origin
let line_geometry1 = new THREE.BufferGeometry();
line_geometry1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_POINTS * 3), 3));
line_geometry1.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAX_POINTS * 3), 3));
let line1 = new THREE.Line(line_geometry1, line_material);
scene.add(line1);
line1.frustumCulled = false;
let line_geometry2 = new THREE.BufferGeometry();
line_geometry2.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_POINTS * 3), 3));
line_geometry2.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAX_POINTS * 3), 3));
let line2 = new THREE.Line(line_geometry2, line_material);
scene.add(line2);
line2.frustumCulled = false;
let line_geometry3 = new THREE.BufferGeometry();
line_geometry3.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_POINTS * 3), 3));
line_geometry3.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAX_POINTS * 3), 3));
let line3 = new THREE.Line(line_geometry3, line_material);
scene.add(line3);
line3.frustumCulled = false;
//define color stops. these are normalized rgb values calculated with https://www.tydac.ch/color/ 
const purpleteal = [
    [0.53, 0, 0.72],
    [0.45, 0, 0.94],
    [0.25, 0.18, 1],
    [0.18, 0.47, 1],
    [0.18, 0.6, 1],
    [0.18, 0.73, 1],
    [0.22, 0.82, 1],
    [0.26, 0.93, 1],
    [0.4, 1, 0.97],
    [0.5, 1, 0.91]
];
const greenpink = [
    [0.45, 0.72, 0],
    [0.83, 0.94, 0],
    [1, 0.77, 0.18],
    [1, 0.41, 0.18],
    [1, 0.27, 0.18],
    [1, 0.18, 0.21],
    [1, 0.22, 0.33],
    [1, 0.26, 0.46],
    [1, 0.4, 0.65],
    [1, 0.5, 0.78]
];
const orangeblue = [
    [1, 0.41, 0.18],
    [0.98, 0.4, 0.2],
    [0.95, 0.37, 0.23],
    [0.91, 0.29, 0.27],
    [0.86, 0.22, 0.42],
    [0.8, 0.17, 0.8],
    [0.44, 0.22, 0.86],
    [0.27, 0.25, 0.91],
    [0.23, 0.32, 0.95],
    [0.18, 0.36, 1]
];
const createGradient = (arr, points) => {
    let gradient = [];
    const loops = 8;
    let currentColor, nextColor, incR, incG, incB, R, G, B;
    let colorCount = arr.length;
    let segment, remainder;
    segment = Math.floor((points / loops) / arr.length);
    remainder = points % (segment * loops);
    for (let f = 0; f < loops; f++) { //how many times to cycle through gradient
        for (let i = 0; i < colorCount; i++) { //cycle through each color
            currentColor = arr[i]; //color start. transition from this to next
            if (i == colorCount - 1) { //if this is the end of color stop array, next color is first color stop
                nextColor = arr[0];
            }
            else {
                nextColor = arr[i + 1];
            }
            //RGB values for start color
            R = currentColor[0];
            G = currentColor[1];
            B = currentColor[2];
            //increment amount to step from start color to stop color in n points
            incR = (nextColor[0] - currentColor[0]) / (segment);
            incG = (nextColor[1] - currentColor[1]) / (segment);
            incB = (nextColor[2] - currentColor[2]) / (segment);
            //increment color values, round to avoid dumb js number errors, push to array
            for (let j = 0; j < segment; j++) {
                R += incR;
                R = parseFloat((R).toFixed(4));
                B += incB;
                B = parseFloat((B).toFixed(4));
                G += incG;
                G = parseFloat((G).toFixed(4));
                gradient.push(R);
                gradient.push(G);
                gradient.push(B);
            }
        }
    }
    //numbers and points may not divide evenly. if there is a remainder, push the last value to fill the required array length.
    R = gradient[gradient.length - 3];
    G = gradient[gradient.length - 2];
    B = gradient[gradient.length - 1];
    for (let k = 0; k < remainder; k++) {
        gradient.push(R);
        gradient.push(G);
        gradient.push(B);
    }
    return gradient;
};
const gradient1 = createGradient(purpleteal, MAX_POINTS); //defines array of gradient rgb valus
const colors1 = new Array(MAX_POINTS * 3); //empty array that will be updated on loop
const gradient2 = createGradient(greenpink, MAX_POINTS);
const colors2 = new Array(MAX_POINTS * 3);
const gradient3 = createGradient(orangeblue, MAX_POINTS);
const colors3 = new Array(MAX_POINTS * 3);
let view = new Vector3();
let angle = 0;
let x1, x2, x3, y1, y2, y3, z1, z2, z3;
let ci1 = 0;
let ci2 = 0;
let ci3 = 0;
let coords1 = new Array(MAX_POINTS * 3).fill(0);
let coords2 = new Array(MAX_POINTS * 3).fill(0);
let coords3 = new Array(MAX_POINTS * 3).fill(0);
let rise = true;
let height = 0;
var animate = function () {
    requestAnimationFrame(animate);
    controls.update(clock.getDelta());
    camera.getWorldDirection(view);
    angle += 0.07;
    stargeometry.rotateY(0.01);
    if (rise == true) {
        stargeometry.translate(0, 0.01, 0);
        height += 0.01;
        if (height >= 1) {
            rise = false;
        }
    }
    else {
        stargeometry.translate(0, -0.01, 0);
        height -= 0.01;
        if (height <= 0) {
            rise = true;
        }
    }
    //mapping x,y,z positions of first orb and line buffer vertex
    x1 = (camera.position.x + view.x * 3) + 0.4 * Math.cos(angle);
    y1 = (camera.position.y + view.y * 3) + 0.4 * Math.sin(angle);
    z1 = (camera.position.z + view.z * 3) + 0.4 * Math.sin(angle);
    // //mapping x,y,z positions of 2nd orb and line buffer vertex
    x2 = (camera.position.x + view.x * 3) + 0.4 * Math.cos(angle + 90);
    y2 = (camera.position.y + view.y * 3) + 0.4 * Math.sin(angle + 90);
    z2 = (camera.position.z + view.z * 3) - 0.4 * Math.sin(angle + 90);
    // //mapping x,y,z positions of 3rd orb and line buffer vertex
    x3 = (camera.position.x + view.x * 3);
    y3 = (camera.position.y + view.y * 3) + 0.4 * Math.cos(angle + 60);
    z3 = (camera.position.z + view.z * 3) + 0.4 * Math.sin(angle + 60);
    orb1.position.x = x1;
    orb1.position.y = y1;
    orb1.position.z = z1;
    orb2.position.x = x2;
    orb2.position.y = y2;
    orb2.position.z = z2;
    orb3.position.x = x3;
    orb3.position.y = y3;
    orb3.position.z = z3;
    coords1.unshift(x1, y1, z1);
    coords1.splice(MAX_POINTS * 3);
    coords2.unshift(x2, y2, z2);
    coords2.splice(MAX_POINTS * 3);
    coords3.unshift(x3, y3, z3);
    coords3.splice(MAX_POINTS * 3);
    line1.geometry.attributes.position.copyArray(coords1);
    line2.geometry.attributes.position.copyArray(coords2);
    line3.geometry.attributes.position.copyArray(coords3);
    line1.geometry.attributes.position.needsUpdate = true;
    line2.geometry.attributes.position.needsUpdate = true;
    line3.geometry.attributes.position.needsUpdate = true;
    colors1.unshift(gradient1[ci1], gradient1[ci1 + 1], gradient1[ci1 + 2]);
    ci1 = (ci1 + 3) % (MAX_POINTS * 3);
    colors1.splice(MAX_POINTS * 3);
    colors2.unshift(gradient2[ci2], gradient2[ci2 + 1], gradient2[ci2 + 2]);
    ci2 = (ci2 + 3) % (MAX_POINTS * 3);
    colors2.splice(MAX_POINTS * 3);
    colors3.unshift(gradient3[ci3], gradient3[ci3 + 1], gradient3[ci3 + 2]);
    ci3 = (ci3 + 3) % (MAX_POINTS * 3);
    colors3.splice(MAX_POINTS * 3);
    line1.geometry.attributes.color.copyArray(colors1);
    line1.geometry.attributes.color.needsUpdate = true;
    line2.geometry.attributes.color.copyArray(colors2);
    line2.geometry.attributes.color.needsUpdate = true;
    line3.geometry.attributes.color.copyArray(colors3);
    line3.geometry.attributes.color.needsUpdate = true;
    render();
};
function render() {
    renderer.render(scene, camera);
}
animate();
