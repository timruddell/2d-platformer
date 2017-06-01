import * as THREE from "three"

import { View } from "./render.consts"

/*
 * Wraps the THREEJS WebGL renderer.
 * 
 */
class WebglWrapper {

    private _viewAspectRatio: number;
    private _renderer: THREE.WebGLRenderer = null;

    constructor () {
        this._viewAspectRatio = View.width / View.height;

        // Self initialize.
        this.buildRenderer();
    }

    buildRenderer () {
        var renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        renderer.setSize(View.width, View.height);
        renderer.setClearColor(0xa4b79f, 1);
        // Auto-clear off for multiple cameras/overlapping scenes.
        renderer.autoClear = false;

        this._renderer = renderer;
    }


    // Properties.

    get renderer () {
        return this._renderer;
    }

    get renderDistance () {
        return View.visibleFar;
    }

    get aspectRatio () {
        return this._viewAspectRatio;
    }
}

export default WebglWrapper;