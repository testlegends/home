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

    function trackViewport () {
        $(window).bind('mousewheel wheel',  $.debounce(300, checkViewport));
        $(window).keyup($.debounce(250, function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code === 40 || code === 38) {
                // wait until the events is finished
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

    function handleEvent (el, event, cb) {
        // wait for AngularJS to finish loading the templates
        setTimeout(function(){
            $(el).on(event, function(e){
                e.preventDefault();

                if (event === 'keyup') {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if (code === 13) {
                        save({
                            event: event,
                            elem: el
                        }, cb);
                    }
                } else {
                    save({
                        event: event,
                        elem: el
                    }, cb);
                }
            });
        }, 8000);
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
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

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
                refCode: queryStrings('ref'),
                info: {
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

        $.each(config.trackers, function (index, tracker) {
            if (!tracker.event) {
                console.log('Ignoring tracker ' + tracker.toString());
                return false;
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
                    element: tracker.element,
                    callback: tracker.callback
                });
            } else {
                handleEvent(tracker.element, tracker.event, tracker.callback);
            }
        });

        trackAjax();
        trackViewport();
    };

})(jQuery);
