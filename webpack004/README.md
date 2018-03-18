 require.ensure(['lodash'], function(){
     var _ = require('lodash');
 }, 'vendor');

import(/* webpackChunkName: 'subpageB' */'./subPageB').then(function(){
      console.log(123);
});

父页面包含子页面的时候，直接动态加载就是了


可是子页面之间还有公共模块
可以在父页面用reqiure.include
也可以在子页面用require.ensure或者import