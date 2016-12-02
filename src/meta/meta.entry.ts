
/// <reference path="../../node_modules/@types/three/index.d.ts" />
/// <reference path="../../node_modules/@types/es6-shim/index.d.ts" />
/// <reference path="../../node_modules/@types/matter-js/index.d.ts" />


/**
 * Application entry-point.
 * 
 */

import RuntimeManager from "../game/game.runtime-manager"

let runtime = new RuntimeManager();
runtime.start();
