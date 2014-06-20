/**
 * HomeController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

var Html = require('../helpers/HtmlHelper.js');
var MobileDetect = require('mobile-detect');


module.exports = (function(){

	function index (req, res) {
		var md = new MobileDetect(req.headers['user-agent']);

		if (md.mobile()) {
			//return res.redirect('http://m.testlegends.com');
			return res.redirect('http://testlegends-mobile.herokuapp.com');
		} else {
			return res.view({
				layout: 'layouts/home'
			});
		}
	}

    function docs (req, res) {

    }

    return {
        index: index,
        docs: docs,

        _config: {}
    };
})();
