const nodeCommon = require("../../config/common/nodeCommon");
nodeCommon.deleteFile("doc/jsdoc/out/fonts");
nodeCommon.deleteFile("doc/jsdoc/out/img");
nodeCommon.deleteFile("doc/jsdoc/out/scripts");
nodeCommon.deleteFile("doc/jsdoc/out/styles");
nodeCommon.copyFile("doc/jsdoc/docstrap/template/static/","doc/jsdoc/out/");