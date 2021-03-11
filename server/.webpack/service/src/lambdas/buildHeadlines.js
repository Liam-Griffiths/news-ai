module.exports=function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){e.exports=require("aws-sdk")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.responses=void 0,t.responses={unauthorized:{statusCode:401,body:JSON.stringify({error:"Unauthorized"}),headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":!0}},badRequest:{statusCode:400,body:JSON.stringify({error:"Bad Request"}),headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":!0}},notFound:{statusCode:404,body:JSON.stringify({error:"Not found"}),headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":!0}},serverError:{statusCode:500,body:JSON.stringify({error:"Internal Server Error"}),headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":!0}},ok:{statusCode:200,body:JSON.stringify({status:"OK"}),headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":!0}}}},,function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.handler=void 0;const n=r(1),s=o(r(4)),l=r(5),i=r(6),a=o(r(7)),u=o(r(0));t.handler=async e=>{let t=new s.default,r=[];for(let e of i.sources.mainstream){(await t.parseURL(e.url)).items.forEach(e=>{const t={headline:e.title,url:e.link,topics:[]};a.default(e.title).topics().json().forEach(e=>{t.topics.push(e.text)}),r.push(t)})}r=function(e){for(let t=e.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e}(r);let o=[];r.forEach(e=>{e.topics.forEach(t=>{let r=function(e,t){for(let r=0;r<t.length;r++)if(t[r].topic===e)return r;return-1}(t,o);-1!==r?o[r].headlines.push(e.headline):o.push({topic:t,headlines:[e.headline],url:e.url})})}),o=o.sort(function(e){let t=1;"-"===e[0]&&(t=-1,e=e.substr(1));return function(r,o){return(r[e].length<o[e].length?-1:r[e].length>o[e].length?1:0)*t}}("headlines")),o=o.reverse();const c=new l.TextGenerator(o[0].headlines),d={lead:{text:await c.generateSentence(),link:o[0].url}},p=new u.default.S3,f={Bucket:"headlines-bucket",Key:"headlines.json",Body:JSON.stringify(d),ContentType:"application/json"};await p.putObject(f).promise();const h=n.responses.ok;return h.body=JSON.stringify(d),h}},function(e,t){e.exports=require("rss-parser")},function(e,t){e.exports=require("node-markov-generator")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sources=t.prodConfig=t.devConfig=void 0,t.devConfig={peopleTable:"teamx-dev-people",teamTable:"teamx-dev-team"},t.prodConfig={peopleTable:"teamx-prod-people",teamTable:"teamx-prod-team"},t.sources={mainstream:[{title:"Guardian",url:"https://theguardian.com/uk/rss"},{title:"Daily Mail",url:"https://dailymail.co.uk/home/index.rss"},{title:"Telegraph",url:"https://telegraph.co.uk/rss"},{title:"Mirror",url:"https://mirror.co.uk/rss.xml"},{title:"Metro",url:"https://metro.co.uk/feed/"},{title:"Sun",url:"https://thesun.co.uk/feed"},{title:"BBC",url:"http://feeds.bbci.co.uk/news/world/rss.xml"},{title:"CNN",url:"http://rss.cnn.com/rss/cnn_latest.rs"},{title:"Fox News",url:"http://feeds.foxnews.com/foxnews/latest"}],breaking:[{title:"Breaking911",url:"https://rss.app/feeds/oVU7bONq0Z6ZWv5I.xml"}]}},function(e,t){e.exports=require("compromise")}]);