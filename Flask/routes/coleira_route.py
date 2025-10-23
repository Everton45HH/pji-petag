from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required , get_jwt_identity
from services.device_service import *
from utils.error_messages import ERROR as ERRO

coleira_bp = Blueprint('coleiras', __name__, url_prefix='')

@coleira_bp.route('/api/coleira', methods=['POST'])
def create():
    info = request.json

    for valor in info.values():
        if valor == "" or valor is None:
            return jsonify({'message': "Não pode haver campos vazios"}), 400
    response, erro = create_coleira(info)

    if erro:
        erro_info = ERRO.get(erro, {'message': response, 'status_code': 500})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']

    return jsonify({'message': response}), 201

@coleira_bp.route('/api/coleira/<int:id>', methods=['GET'])
@jwt_required(locations=["Cookies"])
def listColeiras(id):

    user = get_jwt_identity()

    if not user:
        return jsonify({'message': "Usuário não autenticado"}), 401
    
    lista, erro = get_all_coleiras(id)

    if erro:
        erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']
    
    return jsonify(lista), 200

@coleira_bp.route('/api/coleira/<int:id_coleira>', methods=['DELETE'])
def deleteColeira(id_coleira):
    data = request.json
    userID = data.get("userID")
    response, erro = delete_coleira(id_coleira, userID)
    if erro:
        erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']
    
    return jsonify({'massage' : response}), 200

@coleira_bp.route('/devices/<int:id_coleira>/coords', methods=['PATCH', 'PUT'])
def updateCoords(id_coleira):
    data = request.json
    userID = data.get('userID')
    response, erro = update_device_coords(id_coleira, data , userID)
    if erro:
        erro_info = ERRO.get(erro, {'message': 'Dados invalidos', 'status_code': 400})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']
    return jsonify({'massage' : response}), 200

@coleira_bp.route('/devices/<int:id_coleira>/settings', methods=['PATCH', 'PUT'])
def updateSettings(id_coleira):
    data = request.json
    userID = data.get('userID')
    response, erro = update_device_settings(id_coleira, data , userID)
    if erro:
        erro_info = ERRO.get(erro, {'message': 'Dados invalidos', 'status_code': 400})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']
    return jsonify({'massage' : response}), 200