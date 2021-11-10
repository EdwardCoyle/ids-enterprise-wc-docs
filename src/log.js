import prod from './prod.js';

function log(str) {
    if (prod) {
        console.log(str);
    }
}

export default log;