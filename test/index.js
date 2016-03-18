const m = require('../');
const test = require('tape');
const fs = require('fs-extra');


const ff = `<h1>Default Test</h1>
  <div>
    <h2>Item 1</h2>
    <p>
      Item <b>1 Description</b>
    </p>
  </div>
  <div>
    <h2>Item 2</h2>
    <p>
      Item 2 Description
    </p>
  </div>`;


function testFile(t, cb){
  fs.readFile('./build/default.html', (err, f) =>{
    if(err){
      t.fail('file was not created');
    }
    t.equal(ff.replace(/\s+/g, ''), f.toString().replace(/\s+/g, ''), 'generated file should contain the correct html');
    cb();
  })

}

function startTests(){
  test('write files', (t) => {
    m('./example/ui-variants.json','./example/template.handlebars',  './build', (err, success)=>{
      t.ok((typeof success) === 'object',  'should return an object');
      t.equal(ff.replace(/\s+/g, ''), success.default.replace(/\s+/g, ''), 'returned object should contain the correct values');
      testFile(t, t.end );
    });
  });

  test('return values', (t) => {
    m('./example/ui-variants.json','./example/template.handlebars', (err, success)=>{
      t.ok((typeof success) === 'object',  'should return an object');
      t.equal(ff.replace(/\s+/g, ''), success.default.replace(/\s+/g, ''), 'returned object should contain the correct values');
      t.end();
    });
  });
}

fs.remove('./build', startTests);


// TODO:  - test for invalid inputs

/*
//sample file data has the following structure
{{
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
 */
