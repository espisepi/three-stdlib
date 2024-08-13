import { Vector3, Camera, Euler } from 'three';

const VELOCITY = 500.0;
const VELOCITY_ROTATION = 0.01;

class GodModeCameraControls {
  private camera: Camera;
  private domElement: HTMLElement;
  private movementSpeed: number;
  private rotationSpeed: number;
  private velocity: Vector3;
  private direction: Vector3;
  private keys: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    rotateLeft: boolean;
    rotateRight: boolean;
    rotateUp: boolean;
    rotateDown: boolean;
  };

  constructor(camera: Camera, domElement: HTMLElement) {
    console.log("GodModeCameraControls Create ==============");
    this.camera = camera;
    this.domElement = domElement;

    // Variables de control
    this.movementSpeed = VELOCITY;
    this.rotationSpeed = VELOCITY_ROTATION;
    this.velocity = new Vector3();
    this.direction = new Vector3();

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
      rotateLeft: false,
      rotateRight: false,
      rotateUp: false,
      rotateDown: false,
    };

    // Listeners para el teclado
    document.body.addEventListener('keydown', this.onKeyDown.bind(this), false);
    document.body.addEventListener('keyup', this.onKeyUp.bind(this), false);
  }

  private onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'KeyW':
        this.keys.forward = true;
        break;
      case 'KeyS':
        this.keys.backward = true;
        break;
      case 'KeyA':
        this.keys.left = true;
        break;
      case 'KeyD':
        this.keys.right = true;
        break;
      case 'Space':
        this.keys.up = true;
        break;
      case 'ShiftLeft':
        this.keys.down = true;
        break;
      case 'KeyJ':
        this.keys.rotateLeft = true;
        break;
      case 'KeyL':
        this.keys.rotateRight = true;
        break;
      case 'KeyI':
        this.keys.rotateUp = true;
        break;
      case 'KeyK':
        this.keys.rotateDown = true;
        break;
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case 'KeyW':
        this.keys.forward = false;
        break;
      case 'KeyS':
        this.keys.backward = false;
        break;
      case 'KeyA':
        this.keys.left = false;
        break;
      case 'KeyD':
        this.keys.right = false;
        break;
      case 'Space':
        this.keys.up = false;
        break;
      case 'ShiftLeft':
        this.keys.down = false;
        break;
      case 'KeyJ':
        this.keys.rotateLeft = false;
        break;
      case 'KeyL':
        this.keys.rotateRight = false;
        break;
      case 'KeyI':
        this.keys.rotateUp = false;
        break;
      case 'KeyK':
        this.keys.rotateDown = false;
        break;
    }
  }

  public update(deltaTime: number): void {
    this.direction.set(0, 0, 0);

    if (this.keys.forward) this.direction.z -= 1;
    if (this.keys.backward) this.direction.z += 1;
    if (this.keys.left) this.direction.x -= 1;
    if (this.keys.right) this.direction.x += 1;
    if (this.keys.up) this.direction.y += 1;
    if (this.keys.down) this.direction.y -= 1;

    this.direction.normalize();
    this.direction.applyQuaternion(this.camera.quaternion);

    this.velocity.copy(this.direction).multiplyScalar(this.movementSpeed * deltaTime);

    this.camera.position.add(this.velocity);

    let deltaX = 0, deltaY = 0;
    if (this.keys.rotateLeft) deltaX -= 1;
    if (this.keys.rotateRight) deltaX += 1;
    if (this.keys.rotateUp) deltaY -= 1;
    if (this.keys.rotateDown) deltaY += 1;

    if (deltaX !== 0 || deltaY !== 0) {
      this.rotateCamera(deltaX * this.rotationSpeed, deltaY * this.rotationSpeed);
    }
  }

  public rotateCamera(deltaX: number, deltaY: number): void {
    const euler = new Euler(0, 0, 0, 'YXZ');

    euler.setFromQuaternion(this.camera.quaternion);

    euler.y -= deltaX;
    euler.x -= deltaY;

    this.camera.quaternion.setFromEuler(euler);
  }
}

export { GodModeCameraControls }
