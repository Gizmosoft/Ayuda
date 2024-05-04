from flask import request, jsonify, Blueprint, current_app
from ..utils.date_time import get_datetime
from ..utils.api_base_route import get_api_base_route

blueprint = Blueprint('user_api', __name__)

baseRoute = get_api_base_route()

@blueprint.route(baseRoute + '/users/get-user', methods=['GET'])
def get_user_by_email():
    if request.method == 'GET':
        user_data = request.json
        email = user_data.get('email')
        print(email)
        # get mongo instance
        mongo = current_app.mongo
        user = mongo.db.Users.find_one({"email": email})
        if user:
            user['_id'] = str(user['_id'])  # Convert ObjectId to string
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404


@blueprint.route('/submit-profile', methods=['POST'])
def submit_profile():
    if request.method == 'POST':
        # get mongo instance
        mongo = current_app.mongo
        # Assuming the user data is sent in a JSON format
        user_data = request.json
        user_data['last_login'] = get_datetime()
        print(user_data)
        # Insert the data into the 'Users' collection
        user_id = mongo.db.Users.insert_one(user_data).inserted_id

        # Return a success response
        return jsonify({"message": "Profile submitted successfully", "user_id": str(user_id)}), 201
    else:
        return jsonify({"error": "Method not allowed"}), 405