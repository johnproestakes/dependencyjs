/* this loads the scripts in order one after another */
var Dependency;
(function (Dependency) {
    var script = (function () {
        function script(id, args, requires) {
            if (id === void 0) { id = ""; }
            if (requires === void 0) { requires = []; }
            this.id = id;
            this.href = args.href;
            this.requires = requires;
            this.if = args.if === undefined ? true : args.if;
        }
        return script;
    }());
    Dependency.script = script;
})(Dependency || (Dependency = {}));
var DependencyJS = (function () {
    function DependencyJS(scripts, callback) {
        if (callback === void 0) { callback = function () { }; }
        this.pointer = 0;
        this.manifest = scripts;
        this.loaded = [];
        this.watchers = {};
        this.callback = callback;
        this.mode = false;
    }
    DependencyJS.prototype.loadedRequired = function (self, item) {
        var result = true;
        if (item.requires.length == 0) {
        }
        else {
            for (var i in item.requires) {
                if (self.loaded.indexOf(item.requires[i]) == -1) {
                    result = false;
                }
            }
        }
        return result;
    };
    DependencyJS.prototype.didComplete = function () {
        this.callback();
    };
    DependencyJS.prototype.startImport = function (item) {
        var self = this;
        var file = item.href;
        var ext = file.split("?").shift().split(".").pop();
        var script;
        switch (ext) {
            case "css":
                script = document.createElement("link");
                script.setAttribute("type", "text/css");
                script.setAttribute("href", file);
                script.setAttribute("rel", "stylesheet");
                break;
            case "js":
                script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", file);
        }
        script.addEventListener("load", function () {
            self.loaded.push(item.id);
            !self.mode || console.timeEnd(item.id);
            if (self.loaded.length == self.manifest.length) {
                setTimeout(function () { self.didComplete(); }, 200);
            }
        });
        document.head.appendChild(script);
    };
    DependencyJS.prototype.import = function () {
        var self = this;
        this.manifest.forEach(function (item) {
            if (!item.if) {
                self.loaded.push(item.id);
            }
            else {
                self.watchers[item.id] = setInterval(function () {
                    if (self.loadedRequired(self, item)) {
                        // start script import.
                        !self.mode || console.time(item.id);
                        clearInterval(self.watchers[item.id]);
                        self.startImport(item);
                    }
                }, 10 + Math.floor(Math.random() * 100));
            }
        });
    };
    return DependencyJS;
}());
