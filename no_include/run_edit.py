import requests


content = open("wikireality_common_js_mod.js", "r", encoding="utf-8").read()

# action=edit&title=Talk:Main_Page&section=new&summary=Hello%20World&text=Hello%20everyone!&watch&basetimestamp=2008-03-20T17:26:39Z&token=cecded1f35005d22904a35cc7b736e18%2B%5C
req = requests.post("http://wikireality.ru/w/index.php?title=MediaWiki:Common.js&action=submit", data = (
    ('wpSection', ''),
    ('wpStarttime', '20230205195753'),
    ('wpEdittime', '20221018170900'),
    ('wpScrolltop', ''),
    ('wpAutoSummary', 'd41d8cd98f00b204e9800998ecf8427e'),
    ('oldid', '0'),
    ('wpTextbox1', content),
    ('wpSummary', '.'),
    ('wpEditToken', '5cee2ea03eda812c71b8af53a8771b4c+\\'),
))
print(req.text)
import ipdb; ipdb.set_trace();