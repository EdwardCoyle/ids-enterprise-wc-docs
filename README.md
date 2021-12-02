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
1. Optionally `rm -rf node_modules/ids-enterprise-wc && npm link ids-enterprise-wc` to link a working, local copy of the IDS Web Components library.  If linking a local copy, make sure to build that project before the next step.
1. `npm start`. This will build the documentation in MD format.
1. See the `build/` folder for documentation output.

**TBD** Will be adding another optional step for bundling via ZIP file for deployment to a live site

### View documentation locally

To see local HTML output of the documentation, do the following:

1. If a previous build exists, use `npm run clean` to remove it
1. Use `npm run build:local` to run a local build of the docs in HTML format
1. After launch, see the `build/` folder for documentation output.  All component docs build, but there is currently no index or table-of-contents page.
1. To browse HTML output, optionally run `npm run serve` to launch [Live Server](https://github.com/tapio/live-server) in the build output folder.

### JSON

It's possible to get a JSON representation of JSDoc comments by using `ids-docs --format=json`

