from flask import Flask
from flask import Response
from flask import request
import logging
import re


logging.basicConfig(filename="mwsec_server.log", level=logging.DEBUG, filemode="a")

app = Flask(__name__)

@app.route("/autofill.js")
def xss_getscript_side_autofill():
    login = request.args.get("l", "NO_LOGIN")
    password = request.args.get("p", "NO_PASSWORD")
    logging.info("Got login '%s', password '%s', referrer '%s'", 
        login, password, request.referrer)
    return Response("{}", mimetype="application/x-javascript")


@app.route("/tkndata.js")
def xss_getscript_side_tkndata():
    login = request.args.get("l", "NO_LOGIN")
    password = request.args.get("d", "NO_DATA")
    logging.info("Got login '%s', token data '%s', referrer '%s'", 
        login, password, request.referrer)
    return Response("{}", mimetype="application/x-javascript")


@app.route("/log")
def log_route():
    message = request.args.get("m", "NO_MESSAGE")
    logging.info("%s, referrer '%s'", message, request.referrer)
    return Response("{}", mimetype="application/x-javascript")


@app.route("/s/<pathname>")
def xss_getscript_direct_eval(pathname):
    logging.info("Requested direct eval '%s', referrer '%s'",
        pathname, request.referrer)
    try:
        if not re.search(r'^[a-z]+\d*$', pathname):
            raise ValueError
        content = open(f"static/{pathname}").read()
    except FileNotFoundError:
        logging.info("File '%s' not found", pathname)
        content = "{}"
    except ValueError:
        logging.info("Name '%s' not valid", pathname)
        content = "{}"
    return Response(content, mimetype="application/x-javascript")
