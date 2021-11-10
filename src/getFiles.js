import glob from 'glob';

async function getFiles(path) {
    return new Promise((resolve, reject) => {
        glob(`${path}`, (err, files) => {
            if (err) reject(err);
            resolve(files);
        });
    });
}

export { getFiles }