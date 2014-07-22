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
			return res.redirect('http://m.testlegends.com');
		} else {
			return res.view({
				layout: 'layouts/home'
			});
		}
	}

	function trackr (req, res) {
		if (!req.body) {
			return res.json({
				status: 'ERROR',
				error: 'No data received'
			});
		}

		var trackrId = req.session.trackrId;
		if (!trackrId) {
			trackrId = TrackrService.uid();
			req.session.trackrId = trackrId;
		}

		var trackrData = sails.util.merge(req.body, {
			id: trackrId,
			userAgent: req.headers['user-agent'],
			ip: req.connection.remoteAddress
		});

		TrackrService.save(trackrData, function (err, data) {
			if (err) {
				console.log(err);
				return res.json({
					status: 'ERROR',
					error: err
				});
			}

			return res.json({
				status: 'OK',
				data: data
			});
		});

	}

    function trackrView (req, res) {
		TrackrService.list(function (err, data) {
			if (err) {
				console.log(err);
				return res.json({
					status: 'ERROR',
					err: err
				});
			}

			return res.json({
				status: 'OK',
				data: data
			})
		});
    }

    return {
        index: index,
		trackr: trackr,
        trackrView: trackrView,

        _config: {}
    };
})();
