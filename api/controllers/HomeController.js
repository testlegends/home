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
var SHA256 = require('sha256');

module.exports = (function(){

	function index (req, res) {
		var md = new MobileDetect(req.headers['user-agent']);

		if (md.mobile()) {
			return res.redirect(process.env.MOBILE_URL);
		} else {
			return res.view({
				layout: 'layouts/home'
			});
		}
	}

	function share (req, res) {
		return res.view({
			Html: Html
		});
	}

	function invite (req, res) {
		var classInfo = req.body.classInfo;
		var email = req.body.email;

		User.create({
			name: email,
			email: email,
			password: SHA256(email),
			password_reset_key: SHA256(email + (new Date().getTime()).toString()),
			role: 'regular',
			meta: {
				invitedBy: classInfo.owner.id
			}
		}, function (err, user) {
			EmailService.sendInviteEmail({
				email: user.email,
				password_reset_key: user.password_reset_key,
				classInfo: classInfo
			}, function (err, data) {
				return res.json({
					status: 'OK',
					data: user
				});
			});
		});
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
		share: share,
		invite: invite,
		trackr: trackr,
        trackrView: trackrView,

        _config: {}
    };
})();
