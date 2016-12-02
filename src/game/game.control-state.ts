class ControlState {

    get isMoving () : boolean {
        return this.isMovingLeft || this.isMovingRight;
    }

    isMovingLeft : boolean;
    isMovingRight : boolean;
    isJumping : boolean;

    constructor () {
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isJumping = false;
    }
}

export default ControlState;