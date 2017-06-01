import * as Matter from "matter-js"
import * as THREE from "three"

import WebglWrapper from "../render/render.webgl-wrapper"

import SceneManager from "../scene/scene.scene-manager"
import { View } from "../render/render.consts"


/**
 * Manages the application runtime.
 */
class RuntimeManager {

    private _simulationClock : THREE.Clock;
    private _renderWrapper : WebglWrapper;
    private _orthoCamera : THREE.OrthographicCamera;
    private _perspCamera : THREE.PerspectiveCamera;

    constructor () {
        this._simulationClock = new THREE.Clock();
        this._renderWrapper = new WebglWrapper();
    }

    /**
     * Starts the game simulation and blocks on the render loop.
     */
    start () {
        let renderContainer = document.getElementById("render-container");
        let renderer = this._renderWrapper.renderer;
        renderContainer.appendChild(renderer.domElement);

        // Build orthographic and perspective cameras.
        this._orthoCamera = new THREE.OrthographicCamera(
            View.width / -2, 
            View.width / 2, 
            View.height / 2, 
            View.height / -2, 
        );

        this._orthoCamera.position.set(0, 0, 0);
        this._orthoCamera.lookAt(new THREE.Vector3(0, 0, 0));

        this._perspCamera = new THREE.PerspectiveCamera(
            View.fieldOfView,
            View.width / View.height,
            View.visibleNear,
            View.visibleFar
        );

        this._perspCamera.position.set(0, 0, 850);
        this._perspCamera.lookAt(new THREE.Vector3(0, 0, 0));

        // Create player and wire up game.
        SceneManager.initializeScene();


        var clock = this._simulationClock;
        var orthoCamera = this._orthoCamera; 
        var perspCamera = this._perspCamera; 

        function simulate () {
            var delta = clock.getDelta();

            requestAnimationFrame(simulate);

            // Render the orthographic background scene.
            renderer.clear();
            renderer.render(SceneManager.backgroundScene, orthoCamera);

            // Render the perspective game scene.
            renderer.clearDepth();
            renderer.render(SceneManager.gameScene, perspCamera);

            SceneManager.runWorkers(delta);
        }

        // Go!
        this._simulationClock.start();
        simulate();
    }
}

export default RuntimeManager;