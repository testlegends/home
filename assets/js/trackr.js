/**
 * Trackr Plugin
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/06/24
 */

(function($){

    var trackrAppName = '';

    var trackrApiUrl = '';

    var ajaxUrls = [];

    var viewportElems = [];

    var elementConditions = [];

    var pageWaitTime = 1000;

    function trackAjax () {
        $(document).ajaxSuccess(function(event, xhr, settings){
            if ($.inArray(settings.url, ajaxUrls) !== -1) {
                save({
                    event: 'ajax',
                    elem: null
                }, cb);
            }
        });
    }

    function handleEvent (tracker) {
        // wait for AngularJS to finish loading the templates
        setTimeout(function(){
            $(tracker.element).on(tracker.event, function(e){
                e.preventDefault();

                if (validateConditions()) {
                    if (tracker.event === 'keyup') {
                        var code = (e.keyCode ? e.keyCode : e.which);
                        if (code === 13) {
                            save({
                                name: tracker.name,
                                event: tracker.event,
                                elem: tracker.element
                            }, tracker.callback);
                        }
                    } else {
                        save({
                            name: tracker.name,
                            event: tracker.event,
                            elem: tracker.element
                        }, tracker.callback);
                    }
                }
            });
        }, pageWaitTime);
    }

    function registerConditions (conditions) {

    }

    function validateConditions () {
        return true;
    }
/*
    function trackViewport () {
        $(window).bind('mousewheel wheel',  $.debounce(300, checkViewport));
        $(window).keyup($.debounce(250, function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code === 40 || code === 38) {
                // For fullpage.js, wait until the events is finished
                setTimeout(checkViewport, 750);
            }
        }));

        function checkViewport() {
            viewportElems.forEach(function(el){
                if (isElementInViewport($(el.element))) {
                    save({
                        event: 'viewport',
                        elem: el.element
                    }, el.callback);
                }
            });
        }
    }

    function isElementInViewport (el) {
        //special bonus for those using jQuery
        if (el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
*/
    /** Source: https://developer.mozilla.org/en-US/docs/Web/API/Window.location **/
    function queryStrings (sVar) {
        return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    function save (data, cb) {
        $.ajax({
            global: false,
            type: 'POST',
            url: trackrApiUrl,
            data: {
                name: trackrAppName,
                userCategory: queryStrings('cat'),
                refCode: queryStrings('ref') || queryStrings('refCode'),
                email: queryStrings('email'),
                info: {
                    name: data.name,
                    event: data.event,
                    elem: data.elem
                }
            }
        }).done(function(response){
            cb(response);
        }).fail(function(){
            cb('Error');
        });
    }

    $.trackr = function (config) {
        if (!config.dbUrl) {
            console.log('Need baseUrl');
            return false;
        }

        if (!$.isArray(config.trackers)) {
            console.log('Trackers need to be array');
            return false;
        }

        trackrAppName = config.name;
        trackrApiUrl = config.dbUrl;
        pageWaitTime = config.pageWaitTime || 1000;

        $.each(config.trackers, function (index, tracker) {
            if (!tracker.name) {
                tracker.name = tracker.element;
            }

            if (!tracker.event) {
                console.log('Ignoring tracker ' + tracker.toString());
                return false;
            }

            if (tracker.conditions) {
                registerConditions(tracker.conditions);
            }

            if (!tracker.callback) {
                tracker.callback = function () {
                    //console.log('logged ' + tracker.element);
                };
            }

            if (tracker.event === 'ajax') {
                ajaxUrls.push(tracker.url);
            } else if (tracker.event === 'viewport') {
                viewportElems.push({
                    name: tracker.name,
                    element: tracker.element,
                    callback: tracker.callback
                });
            } else {
                handleEvent({
                    name: tracker.name,
                    element: tracker.element,
                    event: tracker.event,
                    callback: tracker.callback
                });
            }
        });

        trackAjax();
        //trackViewport();
    };

    /** For fullpage.js since the scroll timer above is not accurate **/
    $.trackr.logPage = function (currentPageIndex) {
        save({
            name: 'Page ' + currentPageIndex,
            event: 'viewport',
            elem: 'page ' + currentPageIndex
        }, function () {});
    };
})(jQuery);
