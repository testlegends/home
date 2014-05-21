/**
 * HomeController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

var Html = require('../helpers/HtmlHelper.js');

module.exports = (function(){

	function index (req, res) {
        return res.view({
            layout: 'layouts/home'
        });
	}

    function docs (req, res) {

    }

    return {
        index: index,
        docs: docs,

        _config: {}
    };
})();
