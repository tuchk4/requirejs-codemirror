## Requriejs and CodeMirror

#### 1. Existing problem

When you need to use CodeMirror:

- you need to load codemirror
- you need to append codemirror's css file
- you need to load needed codemirror's modes

This is not hard to set path to CodeMirror lib at requriejs.config :) And you will be able to load it with:

```javascript
require('code-mirror');
```

And all will be ok. But you also need to append CSS file (and this CSS should be only at pages where codemirror is using). This is also not a big problem. A lot of ways how it could be appened.

But main problem - in loading CodeMirror modes.

http://codemirror.net/2/demo/loadmode.html

Default application structure:

|-app/
|   |
|   |-src/
|   |-boot.js
|
|-bower_components/


- **app/** - directory with application scripts
- **boot.js** - config for require js (entry point). 
- **bower_components/** - directory with downloaded bower components xD

In boot.js set **baseUrl** key in config that value is usually set to app/ directory.
So if you want to require bower_component in boot.js file you neeed to set path to upper directory

```javascript
require('../bower_components/module/module-script');
```

And you can not set paths to CodeMirror modes at requirejs.config becasue:

CodeMirror check if requriejs is used, and if so - CodeMirror will use it. And If you descrive path to CodeMirror's mode at requriejs.config -
**require** function inside modes scitpts will have relative path from **boot.js** and it will be able to load other dependencies because paths will be wrong.

And it will be not beautiful to require bower_components inside scripts when you should write full path to component. And this path should be relative from current script. Something like ../../../../bower_components/... that is not beautiful :)

And same problem with CodeMirror.autoLoadMode

#### 2. RequireJS plugin for CodeMirror

Usage:

```javascript
// will require CodeMirror and inlcude CSS file
var CodeMirror = require('code-mirror!@');

// will require CodeMirror, inlcude CSS file and load htmlmixed mode
var CodeMirror = require('code-mirror!htmlmixed');

// will require CodeMirror, inlcude CSS file and load htmlmixed and php modes
var CodeMirror = require('code-mirror!htmlmixed|php');
```

And plugin should be configured at requirejs.conf:

```javascript
requirejs.config({
 cm: {
 	// baseUrl to CodeMirror dir
    baseUrl: '../bower_components/CodeMirror/',
    // path to CodeMirror lib
    path: 'lib/codemirror',
    // path to CodeMirror css file
    css: '/path/to/code-mirror/css/file',
    modes: {
      // modes dir structure
      path: 'mode/{mode}/{mode}'
    }
  }
});
```

