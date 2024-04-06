from flask import Flask

def create_app():
    app = Flask(__name__)
    # configure app here with app.config settings

    from app.api import post_api  # Importing API modules

    # Register Blueprints or add routes from your API
    app.register_blueprint(post_api.blueprint)

    return app
