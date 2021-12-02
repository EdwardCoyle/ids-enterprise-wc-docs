import glob from 'glob';

const GLOB_OPTIONS = {
  nocase: true
};

async function getFiles(path) {
  return new Promise((resolve, reject) => {
    glob(`${path}`, GLOB_OPTIONS, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

export { getFiles }
