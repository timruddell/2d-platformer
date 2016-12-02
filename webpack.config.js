module.exports = {
    entry: "./src/meta/meta.entry.ts",
    
    output: {
        filename: "bundle.js",
        publicPath: "http://localhost:1338/js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
    },

    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" }
        ],

        preLoaders: [
            // Re-process all .js files with the sourcemap loader (for debugging against original ts files).
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // Don't add to bundle, assume named external is accessible through global.
    externals: { 
        "matter-js": "Matter"
    }
};