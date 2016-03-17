const m = require('../');
const test = require('tape');


test('valid templates and options', (t) => {
  m('./example/ui-variants.json','./example/template.handlebars',  './build', (err, success)=>{
    t.equal(success.status, 'success');
    t.end();
  });

});


// TODO:  - test for invalid inputs
