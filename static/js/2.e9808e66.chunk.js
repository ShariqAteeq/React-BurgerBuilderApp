webpackJsonp([2],{147:function(e,r,n){"use strict";function t(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function o(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!==typeof r&&"function"!==typeof r?e:r}function i(e,r){if("function"!==typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0});var a=n(0),s=n.n(a),c=n(159),p=n(12),u=n(49),l=n(11),d=n(48),f=n(6),b=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}(),x=function(e){function r(){return t(this,r),o(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return i(r,e),b(r,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=s.a.createElement(d.a,null);return this.props.loading||(e=this.props.orders.map(function(e){return s.a.createElement(c.a,{ingredients:e.Ingredients,price:e.TotalPrice,key:e.id})})),s.a.createElement("div",null,s.a.createElement("h1",{style:{textAlign:"center"}},"Orders"),e)}}]),r}(a.Component),A=function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.tokenId,userId:e.auth.userId}},m=function(e){return{onFetchOrders:function(r,n){return e(l.f(r,n))}}};r.default=Object(f.b)(A,m)(Object(u.a)(x,p.a))},159:function(e,r,n){"use strict";var t=n(0),o=n.n(t),i=n(160),a=n.n(i),s=function(e){var r=[];for(var n in e.ingredients)r.push({name:n,amount:e.ingredients[n]});var t=r.map(function(e){return o.a.createElement("span",{key:e.name,style:{textTransform:"capitalize",margin:"0 8px",display:"inline-block",border:"1px solid #ccc",padding:"5px"}},e.name," (",e.amount,")")});return o.a.createElement("div",{className:a.a.Order},o.a.createElement("p",null,"Ingredients : ",t),o.a.createElement("p",null,"Price : ",o.a.createElement("strong",null,Number.parseFloat(e.price).toFixed(2),"  USD")))};r.a=s},160:function(e,r,n){var t=n(161);"string"===typeof t&&(t=[[e.i,t,""]]);var o={hmr:!1};o.transform=void 0;n(144)(t,o);t.locals&&(e.exports=t.locals)},161:function(e,r,n){r=e.exports=n(143)(!0),r.push([e.i,".Order__Order__W-Npf{-webkit-box-sizing:border-box;box-sizing:border-box;padding:10px;margin:10px auto;width:80%;border:1px solid #eee;-webkit-box-shadow:0 2px 3px #ccc;box-shadow:0 2px 3px #ccc}","",{version:3,sources:["C:/Users/shariq/Desktop/javascript/React/burger-builder-app/src/components/Order/Order.css"],names:[],mappings:"AAAA,qBACI,8BAA+B,AACvB,sBAAuB,AAC/B,aAAc,AACd,iBAAkB,AAClB,UAAW,AACX,sBAAuB,AACvB,kCAAqC,AAC7B,yBAA6B,CACxC",file:"Order.css",sourcesContent:[".Order{\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    padding: 10px;\r\n    margin: 10px auto;\r\n    width: 80%;\r\n    border: 1px solid #eee;\r\n    -webkit-box-shadow: 0px 2px 3px #ccc;\r\n            box-shadow: 0px 2px 3px #ccc;\r\n}"],sourceRoot:""}]),r.locals={Order:"Order__Order__W-Npf"}}});
//# sourceMappingURL=2.e9808e66.chunk.js.map