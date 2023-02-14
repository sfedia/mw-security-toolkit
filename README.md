## mw-security-toolkit
At the moment, the repository contains some my exploits that allow disrupting the work of services running on the [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki) engine.

These exploits can be applied if you manage to make an [XSS-injection](https://en.wikipedia.org/wiki/Cross-site_scripting) on a MediaWiki-driven website, which is especially easy for versions prior to 1.35.

Some attack vectors of the exploits:
* Stealing CSRF-tokens of the target website and sending them to any server on a third-party domain that accepts GET-requests
  * using `$.getScript` allows to avoid blocking the request by browser (no CORS-rules needed to perform the attack)
* Pulling the saved password from the browser on the target website and sending it to the third-party server using getScript-technique
* Using a privileged account to write the exploit to the site skin and:
  * execute it further for all users (escalating attack level)
  * hide these changes in the site logs (reducing the risk of disclosure)
* Using a privileged account to do stupid but funny actions: deleting pages and blocking users

**Just in case:** the author is not responsible for possible damage caused by the use of exploits on MediaWiki sites or any other sites. The described exploits and tools for their generation are made for informational purposes.
