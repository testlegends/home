/**
 * FormHelper
 *
 * @module      :: Helper
 * @description :: Form helpers for the views.
 * @author      :: Jeff Lee
 * @created     :: 2014/02/11
 */

var Html = require('./HtmlHelper.js'),
    ChangeCase = require('change-case'),
	_ = require('underscore');

module.exports = {
	create: function(model, options) {
		if (!_.isEmpty(model)) {
			try {
				this.model = require('../models/' + model);
                if (options.values) {
                    this.values = options.values;
                    delete this.values.password;
                    delete this.values.password_reset_key;
                    delete options.values;
                }
			} catch (e) {
				this.model = model;
			}
		} else {
			this.model = null;
		}

		options = _.extend({
			method: 'GET',
			action: '',
			encoding: 'utf8',
            name: model + 'Form'
		}, options);

		return Html._tags.form({ action: options.action, attrs: Html._parseAttributes(options, ['action']) });
	},

	input: function(fieldName, options) {
		options = _.extend({
			id: fieldName + Math.floor(Math.random()*1000),
			class: ''
		}, options);

		options.class += ' form-control';

		var type = options.type || this.model.attributes[fieldName].type || this.model.attributes[fieldName];

		var selectOptions = null;
		if (options.in) {
            selectOptions = options.in;
            if (!_.isArray(selectOptions)) {
                selectOptions.length = (function(){
                    var size = 0;
                    for (var key in selectOptions) {
                        if (selectOptions.hasOwnProperty(key)) size++;
                    }
                    return size;
                })();
            }
        } else if (this.model.attributes && this.model.attributes[fieldName] && this.model.attributes[fieldName].in) {
            selectOptions = this.model.attributes[fieldName].in;
        }

		var result = "";

		if (selectOptions) {
            if (type === 'radio' || type === 'boolean' || type === 'string') {
                if (type === 'radio' || type === 'boolean' || selectOptions.length < 5) {
                    var that = this;
                    for (var key in selectOptions) {
                        if (key === 'length') continue;
                        result += that._singleSelectField(fieldName, options, key, selectOptions[key]);
                    }
                    result = Html.div('btn-group col-lg-4', null, { 'data-toggle': 'buttons' }) + result + '</div>';
                } else {
                    // TODO use select2
                }

            } else if (type === 'checkbox' || type === 'array') {
                // TODO multiple select
            }
		}

        if (type === 'hidden') {
            return Html._tags.hidden({
                name: fieldName,
                value: options.value
            });
        }

        if (fieldName === 'password' || type === 'password') {
            options.type = 'password';
			result = this._textField(fieldName, options);
		} else if (type === 'string' && !selectOptions) {
			options.type = 'text';
			result = this._textField(fieldName, options);
        } else if (type === 'email' || type === 'text' || type === 'number') {
            options.type = type;
            result = this._textField(fieldName, options);
		} else if (type === 'date' || type === 'time' || type === 'datetime') {

		} else if (type === 'button' || type === 'submit') {

        }

		result = Html.div('form-group') + Html._tags.label({ id: options.id, name: ChangeCase.titleCase(fieldName), attrs: null }) + result + '</div>';

		return result;
	},

    _singleSelectField: function(fieldName, options, value, text, type) {
        // if too many use dropdown, if not radio
        if (type && type === 'dropdown') {

        } else {
            return '<label class="btn btn-default">' +
                Html._tags.radio({
                    name: fieldName,
                    value: value,
                    attrs: Html._parseAttributes(options),
                    displayText: text
                }) + "</label>";
        }
    },

    _multipleSelectField: function() {
        // if too many use multi select, if not checkbox
    },

	_textField: function(fieldName, options) {
        if (this.values && this.values[fieldName]) {
            options.value = this.values[fieldName];
        }

		return Html._tags.input({
			name: fieldName,
			attrs: Html._parseAttributes(options)
		});
	},

	_datetimeField: function() {

	},

	submit: function(caption, options) {
		options = _.extend({
			class: 'btn btn-primary btn-large'
		}, options);

		var result = Html.div('form-group') + Html._tags.submit({
			name: caption,
			attrs: Html._parseAttributes(options)
		}) + '</div>';

		return result;
	},

	end: function(options) {
		var submitBtn = "";
		if (_.isString(options)) {
			submitBtn = this.submit(options);
		}

		return submitBtn + Html._tags.formend;
	}
};
