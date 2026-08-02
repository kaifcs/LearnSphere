const js = require("@eslint/js");

module.exports = [
    { ignores: ["node_modules/**"] },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                require: "readonly",
                module: "writable",
                exports: "writable",
                process: "readonly",
                __dirname: "readonly",
                __filename: "readonly",
                global: "readonly",
                console: "readonly",
                Buffer: "readonly",
                setTimeout: "readonly",
                setInterval: "readonly",
                clearTimeout: "readonly",
                clearInterval: "readonly",
            },
        },
    },
    {
        files: ["__tests__/**/*.js"],
        languageOptions: {
            globals: {
                describe: "readonly",
                test: "readonly",
                it: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly",
                jest: "readonly",
            },
        },
    },
];
