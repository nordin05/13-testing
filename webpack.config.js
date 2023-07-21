const path = require("path");

module.exports = {
    entry: "./2-battleship/src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./2-battleship/dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
