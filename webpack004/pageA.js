// import './subPageA'
// import './subPageB'

// require.include('./moduleA');

require.ensure(['./subPageA'], function(){
    var subPageA = require('./subPageA');
}, 'subPageA');

require.ensure(['./subPageB'], function(){
    var subPageB = require('./subPageB');
}, 'subPageB');


 require.ensure(['lodash'], function(){
     var _ = require('lodash');
 }, 'vendor');


console.log('pageA')

//  import(/* webpackChunkName: 'subpageB' */'./subPageB').then(function(){
//      console.log(123);
//  });

export default 'pageA'