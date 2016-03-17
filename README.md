# staticfragment
Build multiple variants of a template as static HTML from Handlebars templates and a JSON file

## Install:
`npm install -g staticfragment`


## Usage

### Command line
```
Usage: staticfragment [options]

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -o, --output <path>    Output dir path
  -j, --json <path>      JSON input
  -t, --template <path>  Handlebars.js template file
  ```

  ### API
  ```
  const staticfragment = require('../');
  staticfragment(json, template,  outputDir, callback);
  ```

  See the [examples](./example) for json data and templates.


  ## License
  The MIT License (MIT)
  Copyright (c) 2016 Adam Davis

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
