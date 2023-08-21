{
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended",
    "airbnb-base",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error", { "semi": false }],
    "indent": "off",
    "spaced-comment": "off",
    "no-console": "warn",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-unused-vars": 0,
    "semi": [2, "never"]
  }
}
