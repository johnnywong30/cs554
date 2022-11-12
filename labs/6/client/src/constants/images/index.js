// source: https://stackoverflow.com/a/44607473
function importAll(r) {
    let images = {};
    r.keys().map(item => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./', false, /\.png/));

export default images;