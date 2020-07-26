const rimraf = require('rimraf');
console.log("cleaning production build folder");
rimraf.sync('./build');
console.log("removed production build folder");
