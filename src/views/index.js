/**
 * NOTE: This is using `module.exports` and `require` because the package responsible for bringing in theme files is a CommonJS module
 */
const draw = (obj) => JSON.stringify(obj, null, ' ');

/**
 * `documentation.js` theme for the Ids Enterprise Web Components
 * @param {*} comments 
 * @param {*} config 
 * @returns 
 */
module.exports = async function (comments, config) {
    return `<html>
    <head>
        <title>Ids Enterprise Web Components Documentation</title>
    </head>
    <body>
        <h1>Documentation Page</h1>
        <section id="comments">
            ${draw(comments)}
        </section>
        <section id="config">
            ${draw(config)}
        </section>
    </body>
    </html>
    `
}