import ControlState from "./game.control-state"

/**
 * Manages player input.
 * 
 */
class InputManager {

    /// Control state manipulated by input.
    playerControlState : ControlState;

    constructor () {
        var controlState = new ControlState();
        this.playerControlState = controlState;

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            //console.log("Keydown: " + e.keyCode);

            switch (e.keyCode) {
                case 37:
                    controlState.isMovingLeft = true;
                    break;

                case 39:
                    controlState.isMovingRight = true;
                    break;

                case 38:
                    controlState.isJumping = true;
                    break;
            }
        });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            switch (e.keyCode) {
                case 37:
                    controlState.isMovingLeft = false;
                    break;

                case 39:
                    controlState.isMovingRight = false;
                    break;

                case 38:
                    controlState.isJumping = false;
                    break;
            }
        });
    }

}

var singleton = new InputManager();
export default singleton;