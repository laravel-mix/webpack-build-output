<p align="center"><img src="https://laravel.com/assets/img/components/logo-mix.svg" alt="Laravel Mix"></p>

<p align="center">
<a href="https://www.npmjs.com/package/laravel-mix"><img src="https://img.shields.io/node/v/laravel-mix.svg" alt="Node"></a>
<a href="https://www.npmjs.com/package/laravel-mix"><img src="https://img.shields.io/npm/v/laravel-mix.svg" alt="NPM"></a>
<a href="https://npmcharts.com/compare/laravel-mix?minimal=true"><img src="https://img.shields.io/npm/dt/laravel-mix.svg" alt="NPM"></a>
<a href="https://www.npmjs.com/package/laravel-mix"><img src="https://img.shields.io/npm/l/laravel-mix.svg" alt="NPM"></a>
</p>

## Introduction

![Laravel Mix thumbnail](https://repository-images.githubusercontent.com/76991633/43a4fe80-025e-11eb-8b88-bf742e4412a7)


@laravel-mix/webpack-build-output is the default output for [Laravel Mix](https://github.com/laravel-mix/laravel-mix). It is extracted as a standalone package so you can use it everywhere. For instance with [rails/webpacker](https://github.com/rails/webpacker), [symfony/webpack-encore](https://github.com/symfony/webpack-encore) or in a classic Webpack configuration.

## Installation

```bash
yarn add @laravel-mix/webpack-build-output
```

In your Webpack config, add the `BuildOutputPlugin` to the plugins list, and change the `stats` default settings:

```js
const { BuildOutputPlugin } = require('webpack-build-output')

module.exports = {
  stats: {
    preset: 'errors-warnings'
  },
  plugins: [
    new BuildOutputPlugin({
      clearConsole: true,
      showRelated: true
    })
  ]
}
```

You need to adapt this example depending your Webpack configuration or wrapper.

## License

[@laravel-mix/webpack-build-output](https://github.com/laravel-mix/webpack-build-output) is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
