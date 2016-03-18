# staticfragment
Build multiple variants of a template as static HTML from Handlebars templates and a JSON file

## Install:
`npm install -g staticfragment`


## Setup

### JSON data file
 JSON file to define the content for your templates. This should be an object containing a single property `variants` array off the root, which is an array of objects that contain the different data for your template to produce different HTML

e.g.
``` json
{
    "variants": {
        "default": {
            "Title": "Default Test",
            "UI_id": "test-default",
            "Items": [ {
                    "FriendlyProductId": "D331729",
                    "Description": "Item <b>1 Description</b>",
                    "Image1": "http://example.com/item1-image.jpg",
                    "Name": "Item 1",
                    "Price": 85.95,
                    "ProductDetailsLink": "/item1link",
                    "New": 1
                }, {
                    "FriendlyProductId": "D334611",
                    "Description": "Item 2 Description",
                    "Image1": "http://example.com/item2--image.jpg",
                    "Name": "Item 2",
                    "Price": 0.0,
                    "ProductDetailsLink": "/item2link"
                }
            ]
        },
        "varaint-1": {
            "Title": "Another Test with a variant",
            "UI_id": "test-another-variant",
            "Items": [ {
                "FriendlyProductId": "D334611",
                "Description": "Item 1 Description",
                "Image1": "http://example.com/item1--image.jpg",
                "Name": "Item 1 - variant 2",
                "Price": 0.0,
                "ProductDetailsLink": "/item2link"
            }
            ]
        }
    }
}
```

### [Handlebars.js](http://handlebarsjs.com) template
Use Handlebars to display the data from the json, and some basic simple logic (`if/else`, `each`)

e.g.
```handlebars
<h1>{{ Title }}</h1>
{{#each Items}}
  <div>
    <h2>{{Name}}</h2>
    <p>
      {{{ Description}}}
    </p>
  </div>
{{/each}}

```





## Usage

### Command line
```
Usage: staticfragment [options]

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -o, --output [path    Output dir path (optional)
  -j, --json <path>      JSON input
  -t, --template <path>  Handlebars.js template file
  ```

  e.g.
  ` staticfragment -j ./example/ui-variants.json -t ./example/template.handlebars -o ./build`

returns a JSON encoded object with the compiled HTML for each variant;



  ### API
  ```
  const staticfragment = require('../');
  staticfragment(json, template,  [outputDir], callback);
  ```

NOTE: `outputDir` is optional - if you want to write the output to file - otherwise the results are returned as an object, keyed by variant id


  See the [examples](./example) for json data and templates.


  ## License
  The MIT License (MIT)
  Copyright (c) 2016 Adam Davis

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
