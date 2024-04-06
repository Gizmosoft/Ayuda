from flask import Flask, request, jsonify, Blueprint
# from database.db import get_mongodb

# app = Flask(__name__)
blueprint = Blueprint('post_api', __name__)

# Hardcoded user data for demonstration purposes.
# In a real application, you should use a database and secure password handling.
users = {
    "vijayakumarhebbar.k@northeastern.edu": "PassApr11"
}

access_codes = ["PassApr11", "Code0Ayuda"]

# NEU mail domain
accepted_mail_domain = "@northeastern.edu"

# registered emails
registered_users = ["vijayakumarhebbar.k@northeastern.edu", "sahay.r@northeastern.edu"]

@blueprint.route('/submit-profile', methods=['POST'])
def submit_profile():
    if request.method == 'POST':
        # get mongo instance
        # mongo = get_mongodb(app)
        # Assuming the user data is sent in a JSON format
        user_data = request.json
        print(user_data)
        # Insert the data into the 'Users' collection
        user_id = mongo.db.Users.insert_one(user_data).inserted_id

        # Return a success response
        return jsonify({"message": "Profile submitted successfully", "user_id": str(user_id)}), 201
    else:
        return jsonify({"error": "Method not allowed"}), 405

'''
The below method logs users in based on the access code entered
'''
@blueprint.route('/access', methods=['POST'])
def code_login():
    data = request.json
    access_code = data.get('access_code')

    # custom auth logic
    # TODO: store access codes in database later
    if access_code in access_codes:
        return jsonify({"message": "Login successful", "status": "success"}), 200
    else:
        return jsonify({"message": "Invalid Access Code", "status": "error"}), 401

@blueprint.route('/login', methods=['POST'])
def email_login():
    data = request.json
    email = data.get('email')

    # check if the entered mail id is not from NEU
    if not email.endswith(accepted_mail_domain):
        return jsonify({"message": "Use Northeastern Email ID only", "status": "error"}), 401

    # TODO: check this on the DB
    if email in registered_users:
        return jsonify({"message": "Email found in DB, redirecting to homepage", "status": "success"}), 200
    else:
        return jsonify({"message": "Email not found in DB, redirecting to profile builder page", "status": "success"}), 200