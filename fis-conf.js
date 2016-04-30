fis.match('*.js', {
  packTo: 'mui.jq.js'
});
fis.match('mui.js', {
  packOrder:-100
})

// fis.match(/mui\..*\.js/,{
//   optimizer: fis.plugin('uglify-js'),
//   packTo:'mui.pkg.min.js'
// });