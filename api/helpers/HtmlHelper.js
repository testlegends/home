/**
 * HtmlHelper
 *
 * @module      :: Helper
 * @description :: Html helpers for the views.
 * @author      :: Jeff Lee
 * @created     :: 2014/02/11
 */

var _ = require('underscore'),
    UglifyJS = require("uglify-js");

module.exports = (function(){
	var _tags = {
		meta: _.template('<meta<%= attrs %>/>'),
		charset: _.template('<meta http-equiv="Content-Type" content="text/html; charset="<%= charset %>" />'),
		metalink: _.template('<link href="<%= href %>"<%= attrs %>/>'),

		link: _.template('<a href="<%= href %>"<%= attrs %>><%= title %></a>'),
		mailto: '<a href="mailto:%s" %s>%s</a>',
		image: _.template('<img src="<%= src %>"<%= attrs %>/>'),

		form: _.template('<form action="<%= action %>"<%= attrs %>>'),
		formend: '</form>',
		label: _.template('<label for="<%= id %>"<%= attrs %>><%= name %></label>'),
		input: _.template('<input name="<%= name %>"<%= attrs %>/>'),
		textarea: '<textarea name="%s"%s>%s</textarea>',
		hidden: _.template('<input type="hidden" name="<%= name %>" value="<%= value %>" />'),
		checkbox: '<input type="checkbox" name="%s" %s/>',
		checkboxmultiple: '<input type="checkbox" name="%s[]"%s />',
		radio: _.template('<input type="radio" name="<%= name %>" value="<%= value %>"<%= attrs %> /> <%= displayText %>'),
		selectstart: '<select name="%s"%s>',
		selectmultiplestart: '<select name="%s[]"%s>',
		selectempty: '<option value=""%s>&nbsp;</option>',
		selectoption: '<option value="%s"%s>%s</option>',
		selectend: '</select>',
		optiongroup: '<optgroup label="%s"%s>',
		optiongroupend: '</optgroup>',
		checkboxmultiplestart: '',
		checkboxmultipleend: '',
		password: '<input type="password" name="%s" %s/>',
		file: '<input type="file" name="%s" %s/>',
		file_no_model: '<input type="file" name="%s" %s/>',
		submit: _.template('<button type="submit"<%= attrs %>><%= name %></button>'),
		submitimage: '<input type="image" src="%s" %s/>',
		button: '<button%s>%s</button>',

		tableheader: '<th%s>%s</th>',
		tablecell: '<td%s>%s</td>',
		tablerow: '<tr%s>%s</tr>',
		ul: '<ul%s>%s</ul>',
		ol: '<ol%s>%s</ol>',
		li: '<li%s>%s</li>',

		block: '<div%s>%s</div>',
		blockstart: _.template('<div<%= attrs %>>'),
		//blockend: '</div>',
		//hiddenblock: '<div style="display:none;">%s</div>',
		tag: _.template('<<%= name %><%= attrs %>><%= text %></<%= name %>>'),
		//tagstart: '<%s%s>',
		//tagend: '</%s>',
		//tagselfclosing: '<%s%s/>',

		para: '<p%s>%s</p>',
		parastart: '<p%s>',
		fieldset: '<fieldset%s>%s</fieldset>',
		fieldsetstart: '<fieldset><legend>%s</legend>',
		fieldsetend: '</fieldset>',
		legend: '<legend>%s</legend>',

		css: _.template('<link rel="<%= rel %>" type="text/css" href="<%= href %>" <%= attrs %>/>'),
		style: '<style type="text/css"%s>%s</style>',
		javascriptlink: _.template('<script type="text/javascript" src="<%= src %>"<%= attrs %>></script>'),
		//javascriptblock: '<script%s>%s</script>',
		javascriptstart: '<script>',
		javascriptend: '</script>'
	};

	var _docTypes = {
		'html4-strict': '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
		'html4-trans' : '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
		'html4-frame' : '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">',
		'html5'       : '<!DOCTYPE html>',
		'xhtml-strict': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
		'xhtml-trans' : '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
		'xhtml-frame' : '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">',
		'xhtml11'     : '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
	};

	function docType (type) {
		if (_.isUndefined(type)) {
			type = 'html5';
		}

		if (!_.isUndefined(_docTypes[type])) {
			return _docTypes[type];
		}

		return null;
	}

    function meta (type, url, options) {
		if (!_.isObject(type)) {
			var types = {
				rss: { type: 'application/rss+xml', rel: 'alternate', title: type, link: url },
				atom: { type: 'application/atom+xml', title: type, link: url },
				icon: { type: 'image/x-icon', rel: 'icon', link: url },
				keywords: { name: 'keywords', content: url },
				description: { name: 'description', content: url },
			};

			if (type === 'icon' && _.isUndefined(url)) {
				types.icon.link = 'favicon.ico';
			}

			if (!_.isUndefined(types[type])) {
				type = types[type];
			} else if (!_.isUndefined(options) && !_.isUndefined(options.type) && !_.isUndefined(types[options.type])) {
				type = types[options.type];
				delete options.type;
			} else {
				type = {};
			}
		}

		options = _.extend(type, options);
		var out = "";

		if (!_.isUndefined(options.link)) {
			if (_.isUndefined(options.rel) && options.rel === 'icon') {
				out = _tags.metalink({ href: options.link, attrs: _parseAttributes(options, ['link']) });
				options.rel = 'shortcut icon';
			}
			out += _tags.metalink({ href: options.link, attrs: _parseAttributes(options, ['link']) });
		} else {
			out = _tags.meta({ attrs: _parseAttributes(options, ['type']) });
		}

		return out;
	}

	function charset (charset) {
		if (_.isUndefined(charset)) {
			charset = 'utf-8';
		}

		return _tags.charset({ charset: charset });
	}

	function link (title, url, options) {
		var escapeTitle = true;
		if (_.isUndefined(url)) {
			url = _url(title);
		} else {
			url = _url(url);
		}

		return _tags.link({
			href: url,
			title: title,
			attrs: _parseAttributes(options)
		});
	}

	function image (path, options) {
		// parse path

		return _tags.image({
			src: path,
			attrs: _parseAttributes(options)
		});
	}

	function css (path, options) {
		// if starts with /, don't prepend
		// add options support
		if (!_.isArray(path)) {
			if (path.indexOf("//") === -1) {
				path = '/styles/' + path;
			}

			return _tags.css({
				rel: 'stylesheet',
				href: path,
				attrs: _parseAttributes(options)
			});
		} else {
			var out = '';
			for (var i in path) {
				out += "\n\t" + css(path[i]);
			}
			return out;
		}
	}

	function script (path, options) {
		if (process.env.NODE_ENV) {
			return _uglifyScript(path, options);
		} else {
			return _regularScript(path, options);
		}
	}

    function _regularScript (path, options) {
        if (!_.isArray(path)) {
            if (path.indexOf("//") === -1) {
                path = '/js/' + path;
            }

            return _tags.javascriptlink({
                src: path,
                attrs: _parseAttributes(options)
            });
        } else {
            var out = '';
            for (var j in path) {
                out += "\n\t" + _regularScript(path[j]);
            }
            return out;
        }
    }

    function _uglifyScript (path, options) {
        if (!_.isArray(path)) {
            path = [path];
        }

        var externalPaths = [], internalPaths = [];
        for (var i in path) {
            if (path[i].indexOf("//") === -1) {
                internalPaths.push('assets/js/' + path[i]);
            } else {
                externalPaths.push(path[i]);
            }
        }

        var uglify = UglifyJS.minify(internalPaths);

        var internalOutput = _tags.javascriptstart + uglify.code + _tags.javascriptend;
        var externalOutput = _regularScript(externalPaths, options);

        return externalOutput + internalOutput;
    }

	function style (data) {
		if (!_.isObject(data)) {
			return data;
		}

		var out = [];
		for (var i in data) {
			out.push(i + ': ' + data[i] + ';');
		}

		return out.join(' ');
	}

	function div (class_name, text, options) {
		if (class_name) {
			if (_.isUndefined(options)) {
				options = {};
			}
			options.class = class_name;
		}

		if (_.isUndefined(text) || _.isEmpty(text)) {
			return _tags.blockstart({ attrs: _parseAttributes(options) });
		} else {
			return tag('div', text, options);
		}
	}

    function tag (name, text, options) {
		if (!_.isUndefined(name)) {
			if (!_.isUndefined(options) && !_.isUndefined(options.escape) && options.escape) {
				text = _.escape(text);
				delete options.escape;
			}

			return _tags.tag({ name: name, text: text, attrs: _parseAttributes(options) });
		}
	}

	function _parseAttributes (options, exclude) {
		var out = '';

		if (!_.isString(options)) {
			options = _.extend({ escape: true }, options);

			if (!_.isUndefined(exclude)) {
				if (!_.isArray(exclude)) {
					exclude = [exclude];
				}
			} else {
				exclude = [];
			}
			exclude.push('escape');

			var attributes = [];
			for (var key in options) {
				if (_.indexOf(exclude, key) === -1) {
					if (options.escape) {
						attributes.push(key + '="' + _.escape(options[key]) + '"');
					} else {
						attributes.push(key + '="' + options[key] + '"');
					}
				}
			}

			out = attributes.join(' ');
		} else {
			out = options;
		}

		return ' ' + out;
	}

	function _url (url) {
		if (_.isObject(url)) {
			var newUrl = '/' + url.controller + '/' + url.action;

			if (!_.isUndefined(url.params)) {
				// TODO Need a way to use routes
				newUrl += '/' + url.params;
			}

			return newUrl;
		} else {
			return url;
		}
	}

    return {
        docType: docType,
        meta: meta,
        charset: charset,
        link: link,
        image: image,
        css: css,
        script: script,
        style: style,
        div: div,
        tag: tag,

        _tags: _tags,
        _parseAttributes: _parseAttributes
    };
})();
