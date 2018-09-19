# LeadsNearby DNI

**Version:** 1.1.1<br/>
**Tested up to:** 4.9.8

Provides Dynamic Insertion functionality on a Wordpress website, using call tracking numbers, to track calls based on the web source of the user/customer.

***Version 1.0.0 - Initial Release***
***Version 1.1.0 - Fixes and Tweaks***
***Version 1.1.1 - Fixed Referrer Functionality and Updated Number Switching***


## How to Use
***

LeadsNearby DNI works by setting a cookie based on URL Parameters or document.referrer and matching that to a predefined list of sources or any custom source.  The cookie is currently set for 30 days before it can be reset to a new source.

* Install the Plugin in Wordpress

* Navigate to Settings > LNB-DNI in the Wordpress Dashboard to access the settings page

* Click Add New Number to add a new row

* The input on the far left column will be where the tracking number can be inserted. (The formatting will be displayed the same on the   front end page)

* Select a common source from the dropdown or click custom for a custom referrer
  * A third field will be appear under the Custom Source Input column once custom is selected from the list.
  * The Custom Source input much exactly match the document.referrer of the source domain that you want to track(ex. Angies List will be 'https://www.angieslist.com')
  
 * Click Save Options and be done

