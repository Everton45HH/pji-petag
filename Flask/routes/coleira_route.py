from flask import Blueprint, request, jsonify
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
def listColeiras(id):

    lista, erro = get_all_coleiras(id)
    if erro:
        erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']
    return jsonify(lista), 200

@coleira_bp.route('/api/coleira/<int:id>', methods=['DELETE'])
def deleteColeira(id):

    response, erro = delete_coleira(id)
    if erro:
        erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']
    
    return jsonify({'massage' : response}), 200

# @coleira_bp.route('/devices/<int:id>', methods=['GET'])
# def chosen_device(id):
#     device_found, erro  = chosen_device_list(id)
#     if erro:
#         erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
#         return jsonify({'message': erro_info['message']}), erro_info['status_code']
#     return jsonify(device_found.to_dict()), 200

# @coleira_bp.route('/devices/<int:id>', methods=['PATCH', 'PUT'])
# def update(id):
#     device, erro = update_device(id, request.json)
#     if erro:
#         erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
#         return jsonify({'message': erro_info['message']}), erro_info['status_code']
#     return jsonify(device.to_dict()), 200

# @coleira_bp.route('/devices/<int:id>', methods=['DELETE'])
# def delete(id):
#     result, erro = delete_device(id)
#     if erro:
#         erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
#         return jsonify({'message': erro_info['message']}), erro_info['status_code']
#     if result:
#         return "", 204