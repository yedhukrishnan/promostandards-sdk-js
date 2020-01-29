'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js = require('xml2js');
exports.ensureArray = (obj) => (obj instanceof Array ? obj : [obj]);
exports.skipLevel = (obj) => {
    let key;
    if (obj instanceof Object) {
        for (key in obj) {
            if (obj.hasOwnProperty(key))
                return obj[key];
        }
    }
    return obj;
};
exports.replaceArrayTagsWithArrays = (obj) => {
    let key;
    if (obj instanceof Object) {
        for (key in obj) {
            if (obj.hasOwnProperty(key) && /.*Array/.test(key)) {
                obj[key] = exports.ensureArray(exports.skipLevel(obj[key]));
            }
            exports.replaceArrayTagsWithArrays(obj[key]);
        }
    }
    return obj;
};
exports.convertXMLtoJSON = (xml) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, {
            explicitArray: false,
            ignoreAttrs: true,
            tagNameProcessors: [xml2js.processors.stripPrefix],
            valueProcessors: [
                xml2js.processors.parseNumbers,
                xml2js.processors.parseBooleans,
            ],
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(exports.replaceArrayTagsWithArrays(data));
        });
    });
};
//# sourceMappingURL=Utils.js.map