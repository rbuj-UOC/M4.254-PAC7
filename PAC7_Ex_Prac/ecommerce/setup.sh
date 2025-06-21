#!/bin/bash
PROJECT_NAME=ecommerce

# create the projecte
npx @angular/cli@latest new ${PROJECT_NAME} --no-strict --standalone=false --style=css --ssr=no --skip-tests --package-manager="npm"

# install the packages
cd ${PROJECT_NAME}
ng add @angular-eslint/schematics --defaults  --skip-confirmation
npm install --save-dev prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier @awmottaz/prettier-plugin-void-html

# troubleshoot the version of @awmottaz/prettier-plugin-void-html
npm i -D @awmottaz/prettier-plugin-void-html@latest

# overwrite / create config files
cat << EOF > eslint.config.js
// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
EOF
cat << EOF > .prettierrc.json
{
  "trailingComma": "none",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular",
        "bracketSameLine": true
      }
    }
  ],
  "plugins": ["@awmottaz/prettier-plugin-void-html"]
}
EOF

# create the modules article & auth
ng g m article --route home --module app-module --routing
ng g m auth --route list --module app-module --routing

# article module
ng g c article/article-detail -m article-module
ng g c article/article-item -m article-module
ng g c article/article-list --inline-style --inline-template -m article-module
ng g c article/article-new -m article-module
ng g p article/shared/image -m article-module

# auth module
ng g c auth/login -m auth-module
ng g c auth/register -m auth-module

# guards
ng g g guards/auth --implements CanActivate
ng g g guards/article-new --implements CanDeactivate

# services
ng g s services/article-load-resolver-service
ng g s services/article-service
ng g s services/auth-store-service
ng g s services/auth-interceptor
ng g s services/auth-service
ng g s services/local-storage-service
