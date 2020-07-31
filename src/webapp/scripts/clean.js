const rimraf = require('rimraf');
rimraf('./build', function () {
  console.log('cleared Build folder');
});
