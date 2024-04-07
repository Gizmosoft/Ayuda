from flask import Flask, request, jsonify, Blueprint

blueprint = Blueprint('auth_api', __name__)

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