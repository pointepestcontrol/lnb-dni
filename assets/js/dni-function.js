window.addEventListener('load', function() {
    var dniCookie = '';
    var cookieIsSet = '';
    //console.log(dniData);

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

    } else if (cookieIsSet !== true) {
        // Match based on Document Referrer if no URL Params and Cookie is not already set
        var dniReferrer = document.referrer != '' ? document.referrer.match(/:\/\/(.[^/]+)/)[1] : '';
        // 		console.log(dniReferrer);
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
                numberMatch = data[1]['phone-number'];
                dniDataClass = data[1]['class'];
                dniClass = document.querySelectorAll('.' + dniDataClass);
				Object.entries(dniClass).forEach(function(numbers) {
					numbers[1].outerHTML = `<a class="${dniDataClass}" href="tel:${numberMatch}">${numberMatch}</a>`;
				}); 
            } else if (
                data[1]['source-select'] === 'custom' &&
                data[1]['custom-referrer'].replace(/\/?(\?|#|$)/, '/$1') === dniCookie
            ) {
                numberMatch = data[1]['phone-number'];
                dniClass = document.querySelectorAll(data[1]['class']);
				Object.entries(dniClass).forEach(function(numbers) {
					numbers[1].outerHTML = `<a class="${dniDataClass}" href="tel:${numberMatch}">${numberMatch}</a>`;
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
});
