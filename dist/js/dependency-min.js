var Dependency;!function(t){var e=function(){function t(t,e,i){void 0===t&&(t=""),void 0===i&&(i=[]),this.id=t,this.href=e.href,this.requires=i,this.if=void 0===e.if||e.if}return t}();t.script=e}(Dependency||(Dependency={}));var DependencyJS=function(){function t(t,e){void 0===e&&(e=function(){}),this.pointer=0,this.manifest=t,this.loaded=[],this.watchers={},this.callback=e}return t.prototype.loadedRequired=function(t,e){var i=!0;if(0==e.requires.length);else for(var r in e.requires)t.loaded.indexOf(e.requires[r])==-1&&(i=!1);return i},t.prototype.didComplete=function(){this.callback()},t.prototype.startImport=function(t){var e=this,i=t.href,r=i.split(".").pop().split("?").shift();switch(r){case"css":var n=document.createElement("link");n.setAttribute("type","text/css"),n.setAttribute("href",i),n.setAttribute("rel","stylesheet");break;case"js":var n=document.createElement("script");n.setAttribute("type","text/javascript"),n.setAttribute("src",i)}n.addEventListener("load",function(){e.loaded.push(t.id),console.timeEnd(t.id),e.loaded.length==e.manifest.length&&(console.log("%cAll Scripts Loaded","background-color: yellow"),setTimeout(function(){e.didComplete()},200))}),document.head.appendChild(n)},t.prototype.import=function(){var t=this;this.manifest.forEach(function(e){e.if?t.watchers[e.id]=setInterval(function(){t.loadedRequired(t,e)&&(console.time(e.id),clearInterval(t.watchers[e.id]),t.startImport(e))},10+Math.floor(100*Math.random())):t.loaded.push(e.id)})},t}();