# Platform Game Template (2D)
A simple browser-based 2d platform game template using the three-js rendering framework, and the matter-js physics body system.

# Running the solution

Install the node dependencies with npm:

`npm install`

Prepare the static client directory by copying the appropriate dependencies:

`npm run prep-static`

Serve the static resources using the dev webserver `localhost:1337`:

`npm run serve-static`

Serve the webpack js bundle transpiled from the `src` directory:

`npm run serve-package`

# Assets
The `.ase` image files in the root level `assets` directory can be edited in [Aseprite](https://www.aseprite.org/). Changes to the images should be published to the client static `img` directory.
