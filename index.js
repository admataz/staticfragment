#!/usr/bin/env node

const handlebars = require('handlebars');
const fs = require('fs-extra');
const jf  = require('jsonfile');
const async = require('async');
const program = require('commander');





function loadTemplate(templatePath, dataIn, cb){
  fs.readFile(templatePath, {
    encoding: 'utf8'
  }, (err, str) => {
    if (err) {
      return cb(err);
    }
    const output = {};
    const templateFunc = handlebars.compile(str);
    Object.keys(dataIn.variants).forEach((k) => {
      output[k] = templateFunc(dataIn.variants[k]);
    });

    return cb(err, output);
  });
}


function writeVariants(fragments, outputDir, cb){
  async.forEachOf(fragments, (o, i, callback) => {
      fs.outputFile(`./${outputDir}/${i}.html`, o, callback);
    },
      cb
    );
}



const init = (jsonIn, templateIn, outputDir, cb) => {
  'use strict';



  if (!jsonIn) {
    return cb(new Error('No variants JSON file provided'));
  }
  if (!templateIn) {
    return cb(new Error('No source template provided'));
  }

  async.waterfall([
    (callback) => {
      jf.readFile(jsonIn, (err, obj) => {
        if(err){
          return callback(err);
        }
        if (!obj.variants) {
          return cb(new Error('No variants array provided'));
        }
        return callback(null, obj);
      }
      );
    },
    (jsonObj, callback) => {

      loadTemplate( templateIn, jsonObj, callback);
    },
    (compiled, callback) => {
      writeVariants(compiled, outputDir, callback);
    }
  ],

  (err) => {
    if(err){
      return cb(err);
    }

    return cb(null, {
      status: 'success',
      message: `Static fragments were built  in "${outputDir}"`
    });

  });

};


module.exports = init;


// make this available as a command line program
if (!module.parent) {
  program
    .version('1.0.0')
    .option('-o, --output <path>', 'Output dir path')
    .option('-j, --json <path>', 'JSON input')
    .option('-t, --template <path>', 'Handlebars.js template file')
    .parse(process.argv);

    init(program.json, program.template, program.output, (err, success) => {
        if(err){
            return console.log(err);
        }
        console.log(success.message);
    })
}
