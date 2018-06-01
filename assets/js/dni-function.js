window.addEventListener('load', function () {
    var dniCookie = "";
    var cookieIsSet = "";

    // Check to see if the Cookie is already set.
    if (document.cookie) {
        var dCookies = document.cookie;
        dCookies = dCookies.split('; ');
        dCookies.forEach(function (cookies) {
            c = cookies.split('=');

            if (c[0] == 'dniCookie') {
                cookieIsSet = true;
            }
        });
    }

    // Set the Cookie based on the Source
    // Match based on URL Params First and if Cookie is not already set
    if (Object.keys(dniUrlAttributes).length > 0 && cookieIsSet !== true) {
        var dniParamEntries = Object.entries(dniUrlAttributes);

        dniParamEntries.forEach(function (attributes) {
            if (attributes[1] == 'Marketing Automation' || attributes[1] == 'Monthly Newsletter') {
                setCookie('dniCookie', 'ma', 3);
            }
            if (attributes[0] == 'clid') {
                setCookie('dniCookie', 'ppc', 3);
            }
        });

    } else if (cookieIsSet !== true) {
        // Match based on Document Referrer if no URL Params and Cookie is not already set
        switch (document.referrer) {
        case "":
            setCookie('dniCookie', 'direct', 30);
            break;
        case 'https://www.google.com/':
            setCookie('dniCookie', 'google.com', 30);
            break;
        case 'https://www.bing.com':
            setCookie('dniCookie', 'bing.com', 30);
            break;
        case 'https://www.yelp.com':
            setCookie('dniCookie', 'yelp.com', 30);
            break;
        case 'https://www.facebook.com':
            setCookie('dniCookie', 'facebook.com', 30);
            break;
        default:
            break;
        }
    }

    // Get the Cookies, then the value of the DNI Cookie
    if (document.cookie) {
        var dCookies = document.cookie;
        dCookies = dCookies.split('; ');

        dCookies.forEach(function (cookies) {
            c = cookies.split('=');

            if (c[0] == 'dniCookie') {
                dniCookie = c[1];
            }
        });
    }

    // Match the Cookie to the Data and switch the enumber
    if (Object.keys(dniData).length > 0) {
        Object.entries(dniData).forEach(function (data) {
            if (dniCookie === data[1]['source-select']) {
                numberMatch = data[1]['phone-number'];
                document.querySelector('.phone-num').outerHTML = `<a class="phone-num" href="tel:${numberMatch}">${numberMatch}</a>`;
            }
        });
    }

    // Cookie Set Function
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

});
