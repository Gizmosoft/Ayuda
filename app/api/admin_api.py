from flask import request, jsonify, Blueprint, current_app
from ..database.db import get_config

blueprint = Blueprint('admin_api', __name__)

config = get_config()

'''
This Admin API allows admins to add new access codes for users
access_code = {
    'admin_key'
    'code'
    'validity'
}
'''
@blueprint.route('/admin/add-code', methods=['POST'])
def add_access_codes():
    if request.method == 'POST':
        # get mongo instance
        mongo = current_app.mongo
        access_code = request.json

        print(config['ADMIN']['ADMIN_KEY'])

        if not access_code or 'admin_key' not in access_code:
            return jsonify({"error": "Missing 'admin_key' field"}), 400
        elif access_code['admin_key'] != config['ADMIN']['ADMIN_KEY']:
            return jsonify({"error": "Wrong 'admin_key' entered!"}), 400

        if 'validity' not in access_code:
            return jsonify({"error": "Missing 'validity' field"}), 400

        # Validate that the "code" field exists
        if 'code' not in access_code:
            return jsonify({"error": "Missing 'code' field"}), 400

        # result = mongo.db.AccessCodes.insert_one({"code": access_code['code']})
        result = mongo.db.AccessCodes.insert_one(access_code)
        # Respond with success
        return jsonify({"message": "Access Code added successfully", "id": str(result.inserted_id)}), 201
    else:
        return jsonify({"error": "Method not allowed"}), 405