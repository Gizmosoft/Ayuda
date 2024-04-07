from flask_pymongo import PyMongo
import configparser, os

# Use configparser to load the .ini file
config = configparser.ConfigParser()
# config.read(os.path.abspath(os.path.join(".ini")))
config.read(os.path.abspath("db.ini"))

# Retrieve the DB_URI under the DEV section
db_uri = config['DEV']['DB_URI']

def get_mongodb(app):
    # Set the MongoDB URI in the Flask app's configuration
    app.config["MONGO_URI"] = db_uri
    mongo = PyMongo(app)
    return mongo
