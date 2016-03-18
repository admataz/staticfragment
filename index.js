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

 let writeToFile = true;
  if(typeof outputDir === 'function'){
    writeToFile = false;
    cb = outputDir;
  }


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
      if(writeToFile){
        return writeVariants(compiled, outputDir, (err) => {
          if(err){
            return callback(err);
          }
          return callback(null, compiled);
        });
      } else {
        callback(null, compiled)
      }
    }
  ],

  cb);

};


module.exports = init;


// make this available as a command line program
if (!module.parent) {
  program
    .version('1.0.0')
    .option('-j, --json <path>', 'JSON input')
    .option('-t, --template <path>', 'Handlebars.js template file')
    .option('-o, --output [path]', 'Output dir path (optional)')
    .parse(process.argv);

    function done(err, success){
      if(err){
          return console.log(err);
      }
      return console.log(success);
    }

    if(program.output){
      init(program.json, program.template, program.output, done);
    } else {
      init(program.json, program.template, done);
    }
}
