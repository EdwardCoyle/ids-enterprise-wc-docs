import glob from 'glob';

function getFiles(path) {
    return new Promise((resolve, reject) => {
        glob(`${path}`, (err, files) => {
            if (err) reject(err);
            resolve(files);
        });
    });
}

export { getFiles }