/**
 * Created by emyr on 16/02/17.
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: '.__store/hcldata' });
db.loadDatabase();
module.exports = db;