from flask import request, jsonify, Blueprint, current_app

blueprint = Blueprint('user_api', __name__)


@blueprint.route('/submit-profile', methods=['POST'])
def submit_profile():
    if request.method == 'POST':
        # get mongo instance
        mongo = current_app.mongo
        # Assuming the user data is sent in a JSON format
        user_data = request.json
        print(user_data)
        # Insert the data into the 'Users' collection
        user_id = mongo.db.Users.insert_one(user_data).inserted_id

        # Return a success response
        return jsonify({"message": "Profile submitted successfully", "user_id": str(user_id)}), 201
    else:
        return jsonify({"error": "Method not allowed"}), 405