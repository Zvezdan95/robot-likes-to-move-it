type Position = {
    x: number,
    y: number
}

enum Facing {
    Up,
    Down,
    Left,
    Right
}

export class Robot {
    private position: Position = {x: 0, y: 0};
    private rotationAngle: number = 0;
    private readonly maxMovementX: number;
    private readonly maxMovementY: number;
    private element: HTMLImageElement;
    private readonly stepSizeInRem: number = 5;
    private direction: Facing = Facing.Down;

    constructor(maxMovementX: number, maxMovementY: number, element: HTMLImageElement) {
        this.maxMovementX = maxMovementX;
        this.maxMovementY = maxMovementY;
        this.element = element;
        document.addEventListener('keydown', (event) => this.handleControls(event));
    }

    private handleControls(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                this.moveForward();
                break;
            case 's':
            case 'ArrowDown':
                this.moveBackward();
                break;
            case 'a':
            case 'ArrowLeft':
                this.rotateClockWise()
                break;
            case 'd':
            case 'ArrowRight':
                this.rotateAntiClockWise();
                break;
            default:
                break
        }
    }

    private moveForward(): void {
        switch (this.direction) {
            case Facing.Up:
                this.position.x--;
                break;
            case Facing.Down:
                this.position.x++;
                break;
            case Facing.Left:
                this.position.y--;
                break;
            case Facing.Right:
                this.position.y++;
                break;
            default:
                break;
        }
        this.calculateTransform();
    }

    private moveBackward(): void {
        switch (this.direction) {
            case Facing.Up:
                this.position.x++;
                break;
            case Facing.Down:
                this.position.x--;
                break;
            case Facing.Left:
                this.position.y++;
                break;
            case Facing.Right:
                this.position.y--;
                break;
            default:
                break;
        }
        this.calculateTransform();
    }

    private checkOutOfBounds(): void {
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
        }
        if (this.position.y > this.maxMovementY) {
            this.position.y = this.maxMovementY;
        }
        if (this.position.x > this.maxMovementX) {
            this.position.x = this.maxMovementX;
        }
    }

    private rotateClockWise(): void {
        switch (this.direction) {
            case Facing.Up:
                this.direction = Facing.Right;
                break;
            case Facing.Down:
                this.direction = Facing.Left;
                break;
            case Facing.Left:
                this.direction = Facing.Up;

                break;
            case Facing.Right:
                this.direction = Facing.Down;
                break;
            default:
                break;
        }
        this.rotationAngle += Math.PI / 2;
        this.calculateTransform();
    }

    private rotateAntiClockWise(): void {
        let rotationAngel: number = 0;
        switch (this.direction) {
            case Facing.Up:
                this.direction = Facing.Left;
                rotationAngel = -270;
                break;
            case Facing.Down:
                this.direction = Facing.Right;
                rotationAngel = -90;
                break;
            case Facing.Left:
                this.direction = Facing.Down;
                rotationAngel = -360;
                break;
            case Facing.Right:
                this.direction = Facing.Up;
                rotationAngel = -180;
                break;
            default:
                break;
        }
        this.rotationAngle -= Math.PI / 2;
        this.calculateTransform();
    }


    private calculateTransform() {
        this.checkOutOfBounds();
        const transformProperties: string = `
            translate(${this.getMovementYinRem()},${this.getMovementXinRem()}) 
            rotate(${this.rotationAngle}rad)
            `
        this.element.setAttribute('style', `transform: ${transformProperties}`);
    }

    private getMovementXinRem() {
        return (this.position.x * this.stepSizeInRem).toString() + 'rem';
    }

    private getMovementYinRem() {
        return (this.position.y * this.stepSizeInRem).toString() + 'rem';
    }
}