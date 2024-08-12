import { Vector3, Camera, Euler } from 'three';

// const VELOCITY = 0.5;
const VELOCITY = 100.0;

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
  };

  constructor(camera: Camera, domElement: HTMLElement) {
    console.log("GodModeCameraControls Create ==============");
    this.camera = camera;
    this.domElement = domElement;

    // Variables de control
    this.movementSpeed = VELOCITY;
    this.rotationSpeed = 0.002;
    this.velocity = new Vector3();
    this.direction = new Vector3();

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
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
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    console.log(event.code);
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
    // console.log(this.direction);

    this.direction.normalize();
    this.direction.applyQuaternion(this.camera.quaternion);

    this.velocity.copy(this.direction).multiplyScalar(this.movementSpeed * deltaTime);

    this.camera.position.add(this.velocity);
  }

  public rotateCamera(deltaX: number, deltaY: number): void {
    const euler = new Euler(0, 0, 0, 'YXZ');

    euler.setFromQuaternion(this.camera.quaternion);

    euler.y -= deltaX * this.rotationSpeed;
    euler.x -= deltaY * this.rotationSpeed;

    this.camera.quaternion.setFromEuler(euler);
  }
}

export { GodModeCameraControls }
