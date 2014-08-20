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

module.exports = (function(){

    var model = null,
        values = null;

    function create (_model, options) {
        if (!_.isEmpty(_model)) {
            try {
                model = require('../models/' + _model);
                if (options.values) {
                    values = options.values;
                    delete values.password;
                    delete values.password_reset_key;
                    delete options.values;
                }
            } catch (e) {
                model = _model;
            }
        }

        options = _.extend({
            method: 'GET',
            action: '',
            encoding: 'utf8',
            name: model + 'Form'
        }, options);

        return Html._tags.form({ action: options.action, attrs: Html._parseAttributes(options, ['action']) });
    }

    function input (fieldName, options) {
        options = _.extend({
            id: fieldName + Math.floor(Math.random()*1000),
            class: ''
        }, options);

        options.class += ' form-control';

        var type = options.type || model.attributes[fieldName].type || model.attributes[fieldName];

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
        } else if (model.attributes && model.attributes[fieldName] && model.attributes[fieldName].in) {
            selectOptions = model.attributes[fieldName].in;
        }

        var result = "";

        if (selectOptions) {
            if (type === 'radio' || type === 'boolean' || type === 'string') {
                if (type === 'radio' || type === 'boolean' || selectOptions.length < 5) {
                    for (var key in selectOptions) {
                        if (key === 'length') continue;
                        result += _singleSelectField(fieldName, options, key, selectOptions[key]);
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
            result = _textField(fieldName, options);
        } else if (type === 'string' && !selectOptions) {
            options.type = 'text';
            result = _textField(fieldName, options);
        } else if (type === 'email' || type === 'text' || type === 'number') {
            options.type = type;
            result = _textField(fieldName, options);
        } else if (type === 'date' || type === 'time' || type === 'datetime') {

        } else if (type === 'button' || type === 'submit') {

        }

        result = Html.div('form-group') + Html._tags.label({ id: options.id, name: ChangeCase.titleCase(fieldName), attrs: null }) + result + '</div>';

        return result;
    }

    function _singleSelectField (fieldName, options, value, text, type) {
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
    }

    function _multipleSelectField () {
        // if too many use multi select, if not checkbox
    }

    function _textField (fieldName, options) {
        if (values && values[fieldName]) {
            options.value = values[fieldName];
        }

        return Html._tags.input({
            name: fieldName,
            attrs: Html._parseAttributes(options)
        });
    }

    function _datetimeField () {

    }

    function submit (caption, options) {
        options = _.extend({
            class: 'btn btn-primary btn-large'
        }, options);

        var result = Html.div('form-group') + Html._tags.submit({
            name: caption,
            attrs: Html._parseAttributes(options)
        }) + '</div>';

        return result;
    }

    function end (options) {
        var submitBtn = "";
        if (_.isString(options)) {
            submitBtn = submit(options);
        }

        return submitBtn + Html._tags.formend;
    }

    return {
        create: create,
        input: input,
        submit: submit,
        end: end
    };

})();
