from flask import Blueprint, request, jsonify
from services.user_service import *
from utils.error_messages import ERROR as ERRO

users_bp = Blueprint('users', __name__, url_prefix='')

@users_bp.route('/user/register', methods=['POST'])
def create():

    info_body = request.json

    for campo , valor in info_body.items():
        if valor == "" or valor is None:
            return jsonify({'message': "Não pode haver campos vazios"}), 400

    response, erro = get_user_by_email(info_body.get("email"))

    if response:
        return jsonify({'message': "Email já cadastrado"}), 409

    response, erro = create_user(info_body)

    if erro:
        erro_info = ERRO.get(erro, {'message': response, 'status_code': 500})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']

    return jsonify({'message': response}), 201

@users_bp.route('/user/login' , methods=['POST'])
def login():

    info_body = request.json

    for campo , valor in info_body.items():

        if valor == "" or valor is None:

            return jsonify({'message': "Não pode haver campos vazios"}), 400
        
    email = info_body.get("email")
    senha = info_body.get("senha")
    user , error = get_user_by_email(email)

    if error:
        return jsonify({"message": "Email não encontrado"}), 404
    if user["senha"] == senha:
        return jsonify({"message": "Login realizado com sucesso","userID":user["userID"]}), 200
    else:
        return jsonify({"message": "Senha incorreta"}), 401

# Se o insomia quiser fazer alguma ação que não envolva o front end(DELETE,PUT,etc) eu fiz de uma forma que ele mande direto para o back end
# Se eu usar o mesmo caminho da requisiçaõ do front para o back ele vai dar conflito,pois o caminho do delete no front iria tenta carregar uma tela que nao existe


@users_bp.route('/api/user/<int:id>', methods=['PATCH','PUT'])
def update(id):
    user, erro = update_user(id, request.json)
    if erro == "Email already exists":
        return jsonify({'message': 'Email já existe'}), 409 
    return jsonify(user), 200

@users_bp.route('/api/user/<int:id>', methods=['DELETE'])
def delete(id):
    response, erro = delete_user(id)
    if erro:
        erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']
    return jsonify({'message':response}) , 200

@users_bp.route('/api/getAllUsers', methods=['GET'])
def list_users():
    users, erro = get_all_users()
    if erro:
        erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']
    return jsonify(users), 200

@users_bp.route('/api/user/<int:id>', methods=['GET'])
def list_user(id):
    users, erro = get_user_by_id(id)
    if erro:
        erro_info = ERRO.get(erro, {'message': 'Unknown error', 'status_code': 500})
        return jsonify({'message': erro_info['message']}), erro_info['status_code']
    return jsonify(users), 200