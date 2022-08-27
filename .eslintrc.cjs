module.exports = {
    "rules": {

        // override configuration set by extending "eslint:recommended"
        "no-empty": "warn",
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "for-direction": "off",
        "no-unused-vars": "off",
    }
};