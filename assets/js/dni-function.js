
/**
 * JS to execute the Dynamic Number Switching
 * Sets a Cookie based on the document referrer or a URL parameter.  
 * Matches the Cookie Against Localized DB Data and Switches the number if a match
 */

window.addEventListener('load', function() {
    var dniCookie = '';
    var cookieIsSet = '';

    // Check to see if the Cookie is already set.
    if (document.cookie) {
        var dCookies = document.cookie;
        dCookies = dCookies.split('; ');
        dCookies.forEach(function(cookies) {
            c = cookies.split('=');

            if (c[0] == 'dniCookie') {
                cookieIsSet = true;
            }
        });
    }

    // Set the Cookie based on the Source
    // Match based on URL Params First and if Cookie is not already set
    if (window.location.href.indexOf('?') > 0 && cookieIsSet !== true) {
        
            if (window.location.href.indexOf('Marketing%20Automation') > 0 || window.location.href.indexOf('Monthly%20Newsletter') > 0) {
                setCookie('dniCookie', 'ma', 30);
            }
            if (window.location.href.indexOf('gclid') > 0) {
                setCookie('dniCookie', 'ppc', 30);
            }

            // Custom Referrer Field now checks for Custom URL Parameters also
            Object.entries(dniData).forEach(function(data) {
                if (window.location.href.indexOf(data[1]['custom-referrer']) > 0) {
                    setCookie('dniCookie', data[1]['custom-referrer'], 30);
                }
            });

    } else if (cookieIsSet !== true) {
        // Match based on Document Referrer if no URL Params and Cookie is not already set
        var dniReferrer = document.referrer != '' ? document.referrer.match(/:\/\/(.[^/]+)/)[1] : '';
        switch (document.referrer) {
            case '':
                setCookie('dniCookie', 'direct', 30);
                break;
            default:
                setCookie('dniCookie', dniReferrer, 30);
                break;
        }
    }

    // Get the Cookies, then the value of the DNI Cookie
    if (document.cookie) {
        var dCookies = document.cookie;
        dCookies = dCookies.split('; ');

        dCookies.forEach(function(cookies) {
            c = cookies.split('=');

            if (c[0] == 'dniCookie') {
                dniCookie = c[1];
            }
        });
    }

    // Match the Cookie to the Data and switch the number
    if (Object.keys(dniData).length > 0) {
        Object.entries(dniData).forEach(function(data) {
            if (dniCookie === data[1]['source-select']) {
                var numberMatch = data[1]['phone-number'];
                var dniDataClass = data[1]['class'];
                var dniClass = document.querySelectorAll('.' + dniDataClass);

                // Send Event
                sendAnalytics();
                
                // Do the Switching
				Object.entries(dniClass).forEach(function([key, numbers]) {
                    var originClass = numbers.className;
                    numbers.innerHTML = numbers.innerHTML.replace(/[\+]?[(]?[0-9]{3}[)]?[-\s\.\xB7]?[0-9]{3}[-\s\.\xB7]?[0-9]{4,6}$/im, numberMatch);
                    numbers.href = `tel:${numberMatch}`;
				});
                
            } else if (
                data[1]['source-select'] === 'custom' &&
                data[1]['custom-referrer'].replace(/\/?(\?|#|$)/, '/$1') === dniCookie
            )  {
                var numberMatch = data[1]['phone-number'];
                var dniDataClass = data[1]['class'];
                var dniClass = document.querySelectorAll('.' + data[1]['class']);

                // Send Event
                sendAnalytics();
                
                // Do the Switching
				Object.entries(dniClass).forEach(function([key, numbers]) {
                    var originClass = numbers.className;
                    numbers.innerHTML = numbers.innerHTML.replace(/[\+]?[(]?[0-9]{3}[)]?[-\s\.\xB7]?[0-9]{3}[-\s\.\xB7]?[0-9]{4,6}$/im, numberMatch);
                    numbers.href = `tel:${numberMatch}`;
				});
            }

            else if (
                data[1]['source-select'] === 'custom' &&
                data[1]['custom-referrer'] === dniCookie
            ) {
                var numberMatch = data[1]['phone-number'];
                var dniClass = document.querySelectorAll('.' + data[1]['class']);
                var dniDataClass = data[1]['class'];
                
                // Send Event
                sendAnalytics();

                // Do the Changing
				Object.entries(dniClass).forEach(function([key, numbers]) {
                    var originClass = numbers.className;
                    numbers.innerHTML = numbers.innerHTML.replace(/[\+]?[(]?[0-9]{3}[)]?[-\s\.\xB7]?[0-9]{3}[-\s\.\xB7]?[0-9]{4,6}$/im, numberMatch);
                    numbers.href = `tel:${numberMatch}`;
				});
            }
        });
    }

    // Cookie Set Function
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    // Function to Send Analytics Events
    function sendAnalytics() {
        // Send GA Event
        if (typeof ga === 'function') {
            var tracker = ga.getAll()[0].get('name');
            ga(tracker+'.send', 'event', {'eventCategory': 'LNB-DNI', 'eventAction': 'change', 'eventLabel': 'DNI Number Change Triggered'});;
        } else if (typeof gtag === 'function') {
            gtag('event', 'change', {
                'event_category': 'LNB-DNI',
                'event_label': 'DNI Number Change Triggered'
              });
        }
    }

});
