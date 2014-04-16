/**
 * Project
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 * @created     :: 2014/03/25
 */

 module.exports = {

     tableName: 'projects',

     attributes: {
         name: {
             type: 'string',
             required: true
         },
         desc: {
             type: 'string'
         },
         link: {
             type: 'url'
         },
         info: {
             type: 'json'
         },
         tool: {
             type: 'json'
         },
         repo: {
             type: 'array'
         }
     }
 };
