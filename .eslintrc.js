module.exports = {
    "extends": ["airbnb-base", "plugin:@typescript-eslint/recommended"],
    "env": {
      "browser": true,
    },
    "settings": {
      "import/resolver": {
        "webpack": {
          "config": "webpack.config.js"
        }
      }
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json"
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
      "indent": "off",
      "@typescript-eslint/indent": ["error", 2],
      "lines-between-class-members": ["error", "always", {"exceptAfterSingleLine": true}]
    },
    "overrides": [
      {
        "files": ["*.css.d.ts"],
        "rules": {
          "import/prefer-default-export": "off"
        }
      }
    ]
};