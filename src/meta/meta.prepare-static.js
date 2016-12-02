/**
 * Prepares the client static directory with files from the npm modules.
 * 
 */

console.log("Preparing static client directory...");

var copy = require("copy");

if (!copy) {
    console.error("Make sure you've installed the dependencies - `npm install`");
    throw new Error("Missing project dependency 'copy'");
}

copy([
        "node_modules/matter-js/build/matter.min.js",
        "node_modules/three/build/three.min.js"
    ],
    "src/static/js",
    (e) => {
        if (e) {
            console.error("Couldn't copy one or more files to static client dir: " + e);
        }
    }
);

console.log("Finished.");