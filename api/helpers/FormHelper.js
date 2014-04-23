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
		if (!_.isUndefined(this.model.attributes)) {
			selectOptions = this.model.attributes[fieldName].in;
		}

		var result = "";
		if (selectOptions) {

		} else if (fieldName === 'password' || type === 'password') {
            options.type = 'password';
			result = this._textField(fieldName, options);
		} else if (type === 'string' || type === 'text') {
			options.type = 'text';
			result = this._textField(fieldName, options);
        } else if (type === 'email') {
            options.type = 'email';
            result = this._textField(fieldName, options);
		} else if (type === 'date') {

		} else if (type === 'time') {

		} else if (type === 'datetime') {

		} else if (type === 'boolean') {

		} else if (type === 'button' || type === 'submit') {

        } else if (type === 'hidden') {
            return Html._tags.hidden({
                name: fieldName,
                value: options.value
            });
        }

		result = Html.div('form-group') + Html._tags.label({ id: options.id, name: ChangeCase.titleCase(fieldName), attrs: null }) + result + '</div>';

		return result;
	},

	_textField: function(fieldName, options) {
		return Html._tags.input({
			name: fieldName,
			attrs: Html._parseAttributes(options)
		});
	},

	_selectField: function() {

	},

	_checkboxField: function() {

	},

	_dateField: function() {

	},

	_timeField: function() {

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
