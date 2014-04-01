define(function(require){
  return {

    load: function (name, req, onload, config) {

      /**
       * Check all needed config keys
       */
      if (!config.hasOwnProperty('cm')
        && config['cm'].hasOwnProperty('baseUrl')
        && config['cm'].hasOwnProperty('path')
        && config['cm'].hasOwnProperty('css')
        && config['cm'].hasOwnProperty('modes')
        && config['cm'].hasOwnProperty('theme')
        && config['cm']['modes'].hasOwnProperty('path')){

        throw new Error('cm, cm.baseUrl, cm.path, cm.css, cm.theme, cm.modes.path should be defined at requirejs config');
      }


      var css: {
        load: function(id, url){
          if (!document.getElementById(id)) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            link.id = id;
            document.getElementsByTagName("head")[0].appendChild(link);
          }
        },

        loadTheme: function(url){
          this.load('code-mirror-theme', url);
        },

        loadCss: function(url){
          this.load('code-mirror-css', url);
        }
      };

      /**
       * cm - config for codemirror loader from requirejs.config
       */
      var cm = config.cm;

      var scripts = [];

      /**
       * Add codemirror lib as first including script
       */
      scripts.push(cm.baseUrl + cm.path);

      if (name != '@'){
        var modes = name.split('|');

        for (var i = 0; i < modes.length; i++){
          var mode = cm.baseUrl + cm.modes.path.replace(
            new RegExp('{mode}', 'g'), modes[i]
          );
          scripts.push(mode);
        }
      }

      css.loadCss(cm.css);
      css.loadTheme(cm.theme);

      /**
       * Require all scripts and as return values always will be codemirror object
       */
      require(scripts, function(CodeMirror){
        onload(CodeMirror);
      });
    }
  }
});

