fis.match('mui.min.js', {
  packOrder:-100
})
fis.match('*.js', {
  	packTo: 'lib/mui.jq.js',
  	optimizer: fis.plugin('uglify-js')
});
fis.match('*.less',{
	parser:fis.plugin("less2"),
	rExt:'css',
	packTo: 'css/mui.jq.css'
})
fis.match("**",{
	deploy: [
	    fis.plugin('skip-packed'),
	    fis.plugin('local-deliver', {
	      	to: 'build'
	    })
	 ]
})