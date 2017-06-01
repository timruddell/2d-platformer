# Platformer (2D)
A simple browser-based 2d platformer game template using the three-js rendering framework, and the matter-js physics body system.

![Example game scene](http://i.imgur.com/ZVTOuW9.png)

# Running the solution

Install the node dependencies with npm:

`npm install`

Prepare the static client directory by copying the appropriate dependencies:

`npm run prep:static`

Serve the static resources at `localhost:1337`, and the webpack js bundle transpiled from the `src` directory at `localhost:1338`:

`npm run serve`

# Assets
The `.ase` image files in the root level `assets` directory can be edited in [Aseprite](https://www.aseprite.org/). Changes to the images should be published to the client static `img` directory.
