from flask import Flask, Blueprint
from flask_restx import Api
from service.resources.scraper import api as scraper_namespace


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    blueprint = Blueprint("api", __name__, "/test")
    api = Api(
        title="Scraper",
        version="1.0",
        description="Provides Endpoints exclusively for the Scraper Frontend"
    )

    api.add_namespace(ns=scraper_namespace, path="/scraper")
    api.init_app(blueprint)
    app.register_blueprint(blueprint)
    return app


flask_app = create_app()
