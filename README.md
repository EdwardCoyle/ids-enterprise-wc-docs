# Ids Enterprise Web Components Documentation Builder

This package creates documentation based on the source code of the [IDS Enterprise Web Components Library](https://github.com/infor-design/enterprise-wc).  Included in this documentation will be:

- [ ] API documentation generated from the source code
- [ ] An interactive visual diagram of class hierarchy within each provided Web Component
- [ ] Links to the source code on Github for each provided Web Component
- [ ] Links to live examples of the component/mixin/util

## Dependencies

This system has the following dependencies:

- [IDS Enterprise Web Components](https://github.com/infor-design/enterprise-wc)
- [documentation.js](https://github.com/documentationjs/documentation) - Converts JSDoc comments in the source code into human-readable HTML files. While we use JSDoc syntax in the codebase, [we use this instead of the JSDoc application](https://github.com/documentationjs/documentation/blob/master/docs/FAQ.md#why-use-documentation-instead-of-jsdoc) to get finer-grain control over the templates and output of the documentation

## How to use

- Clone this repository
- `npm i`.  
- Optionally `rm -rf node_modules/ids-enterprise-wc && npm link ids-enterprise-wc` to link a working, local copy of the IDS Web Components library.  If linking a local copy, make sure to build that project before the next step.
- `npm start`. This will build and launch `live-server` pointed to the compiled documentation.
- After launch, see the `build/` folder for documentation output.  All component docs build, but there is currently no index or table-of-contents page.
