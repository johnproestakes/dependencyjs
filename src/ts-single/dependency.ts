/* this loads the scripts in order one after another */

namespace Dependency {
  export class script {
    id: string;
    href: string;
    requires: string[];
    if: boolean;

    constructor (id: string = "", args, requires: string[]=[]){
      this.id = id;
      this.href = args.href;
      this.requires = requires;
      this.if = args.if === undefined ? true : args.if;
    }
  }
}


class DependencyJS {
  pointer: number;
  manifest: Dependency.script[];
  loaded: string[];
  // checker: any;
  watchers: any;
  callback: () => void;
  mode: boolean;

  constructor(scripts: Dependency.script[], callback = function(){}){
    this.pointer = 0;
    this.manifest = scripts;
    this.loaded = [];
    this.watchers = {};
    this.callback = callback;
    this.mode = false;
  }
  loadedRequired(self, item){
    var result = true;
    if(item.requires.length == 0){

    } else {
      for(var i in item.requires){
        if( self.loaded.indexOf(item.requires[i]) == -1){
          result = false;
        }
      }
    }
    return result;
  }
  didComplete(){

    this.callback();
  }
  startImport(item){
    var self = this;
    var file: string = item.href;
    let ext : string = file.split("?").shift().split(".").pop();

    var script: Element;
    switch (ext) {
      case "css":
      script = document.createElement("link");
      script.setAttribute("type","text/css");
      script.setAttribute("href", file);
      script.setAttribute("rel", "stylesheet");

      break;
      case "js":
      script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", file);

    }
    script.addEventListener("load",function () {
      self.loaded.push(item.id);
      !self.mode||console.timeEnd(item.id);
      if(self.loaded.length == self.manifest.length) {
        setTimeout(function(){self.didComplete()},200);
      }
    });
    document.head.appendChild(script);
  }

  import(){

    var self = this;
    this.manifest.forEach(function(item){

      if(!item.if) {
        self.loaded.push(item.id);
      } else {
        self.watchers[item.id] = setInterval(function(){
          if(self.loadedRequired(self, item)){
            // start script import.
            !self.mode||console.time(item.id);
            clearInterval(self.watchers[item.id]);
            self.startImport(item);
          }
        }, 10 + Math.floor(Math.random()*100));

      }
    });


  }
}
