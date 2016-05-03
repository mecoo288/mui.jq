fis.match('mui.min.js', {
  packOrder:-100
})
fis.match('*.js', {
  packTo: 'mui.jq.js',
  optimizer: fis.plugin('uglify-js'),
  deploy: [
    fis.plugin('skip-packed'),
    fis.plugin('local-deliver', {
      to: 'build'
    })
  ]
});