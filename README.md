# Ids Enterprise Web Components Documentation Builder

This package creates documentation based on the source code of the [IDS Enterprise Web Components Library](https://github.com/infor-design/enterprise-wc).  Included in this documentation will be:

- [x] API documentation generated from the source code
- [ ] An interactive visual diagram of class hierarchy within each provided Web Component
- [ ] Links to the source code on Github for each provided Web Component
- [ ] Links to live examples of the component/mixin/util

## Dependencies

This system has the following dependencies:

- [IDS Enterprise Web Components](https://github.com/infor-design/enterprise-wc)
- [documentation.js](https://github.com/documentationjs/documentation) - Converts JSDoc comments in the source code into human-readable HTML files. While we use JSDoc syntax in the codebase, [we use this instead of the JSDoc application](https://github.com/documentationjs/documentation/blob/master/docs/FAQ.md#why-use-documentation-instead-of-jsdoc) to get finer-grain control over the templates and output of the documentation

## How to use

### Build documentation for production

1. Clone this repository
1. In a terminal pointed to the project folder, use `npm i` to install dependencies.
1. Run `npm link` to establish the executable `ids-docs`.
1. Optionally link a working, local copy of the IDS Web Components library (See [NPM Link](#npm-link) below for more info)
1. `npm start`. This will build the documentation in MD format.
1. See the `build/` folder for documentation output.  Build output will include both generated MD files from JSDoc comments, as well as copies of handwritten README.md files from each Web Component

**TBD** Will be adding another optional step for bundling via ZIP file for deployment to a live site

### View documentation locally

To see local HTML output of the documentation, do the following:

1. If a previous build exists, use `npm run clean` to remove it
1. Use `npm run build:local` to run a local build of the docs in HTML format
1. After launch, see the `build/` folder for documentation output.  All component docs build, but there is currently no index or table-of-contents page.
1. To browse HTML output, optionally run `npm run serve` to launch [Live Server](https://github.com/tapio/live-server) in the build output folder.

### JSON

It's possible to get a JSON representation of JSDoc comments by using `ids-docs --format=json`

### NPM Link

As of 12/3/2021, the IDS Enterprise Web Components (WC) are still in development, and occasionally an unstable build may be published to NPM.  This can cause the documentation generator to produce no output.

In this case, using a local copy of the WC library and connecting it to this library is ideal. This may also be useful when doing development on WC locally.  Connecting the repos can be done with NPM link:

1. check out a copy of the [`ids-enterprise-wc` repo](https://github.com/infor-design/enterprise-wc)
1. run `npm i && npm run start` in the WC project folder to generate a working build
1. also run `npm link` in that folder to setup a local NPM package for WC
1. go back to the docs generator project folder and `rm -rf node_modules/ids-enterprise-wc` to ditch the default WC package
1. use `npm link ids-enterprise-wc` to symbolic link to your local WC package

**reminder** whenever you run `npm i` in the docs generator folder, it's required to rerun `npm link ids-enterprise-wc` due to the installation process breaking any previous links.
