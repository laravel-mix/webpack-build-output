<p align="center"><img src="https://laravel.com/assets/img/components/logo-mix.svg" alt="Laravel Mix"></p>

<p align="center">
<a href="https://www.npmjs.com/package/@laravel-mix/webpack-build-output"><img src="https://img.shields.io/node/v/@laravel-mix/webpack-build-output.svg" alt="Node"></a>
<a href="https://www.npmjs.com/package/@laravel-mix/webpack-build-output"><img src="https://img.shields.io/npm/v/@laravel-mix/webpack-build-output.svg" alt="NPM"></a>
<a href="https://npmcharts.com/compare/@laravel-mix/webpack-build-output?minimal=true"><img src="https://img.shields.io/npm/dt/@laravel-mix/webpack-build-output.svg" alt="NPM"></a>
<a href="https://www.npmjs.com/package/@laravel-mix/webpack-build-output"><img src="https://img.shields.io/npm/l/@laravel-mix/webpack-build-output.svg" alt="NPM"></a>
</p>

## Introduction

@laravel-mix/webpack-build-output is the default output for [Laravel Mix](https://github.com/laravel-mix/laravel-mix). It is extracted as a standalone package so you can use it everywhere. For instance with [rails/webpacker](https://github.com/rails/webpacker), [symfony/webpack-encore](https://github.com/symfony/webpack-encore), or in a classic Webpack configuration.

## Installation

```bash
yarn add --dev @laravel-mix/webpack-build-output
npm install -D @laravel-mix/webpack-build-output
pnpm install -D @laravel-mix/webpack-build-output
```

In your webpack config, add the `BuildOutputPlugin` to the plugins list, and change the `stats` default settings:

```js
const { BuildOutputPlugin } = require('@laravel-mix/webpack-build-output')

module.exports = {
  stats: {
    preset: 'errors-warnings',
  },
  plugins: [
    new BuildOutputPlugin(),
  ],
}
```

You need to adapt this example depending your webpack configuration or wrapper.

## Customization

You may customize how built assets are displayed in the table with a handful of options:

```js
new BuildOutputPlugin({
  // Clear the console when rendering the table
  clearConsole: true,

  // Show related assets (when available) in the table
  showRelated: true,

  // An optional header to print above the table
  header: "Laravel Mix v6",

  // The desired width of the table
  // Defaults to the width of the current terminal window
  width: 120,

  // The maximum width a table can occupy
  // Defaults to `Infinity`
  maxWidth: 200,

  // Whether or not to print using colors
  // Automatically detects color support by default
  colors: false,
})
```

## License

[@laravel-mix/webpack-build-output](https://github.com/laravel-mix/webpack-build-output) is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
