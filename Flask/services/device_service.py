from DAO.coleiraDAO import ColeiraDAO

daoService = ColeiraDAO()

def create_coleira(info):
    response , error = daoService.createColeiraDAO(info)
    return response, error

def get_all_coleiras(id):
    response , error = daoService.getAllColeirasDAO(id)
    return response , error

def delete_coleira(id):
    response , error = daoService.deleteColeiraDAO(id)
    return response , error

# def device_list():
#     if not devices:
#         return None, "devices not found"
#     return [x.to_dict() for x in devices], None

# def chosen_device_list(id):
#     for x in devices:
#         if x.id == id:
#             return x, None
#     return None, "device not found"

# def update_device(id, new_info):
#     device_found, erro = chosen_device_list(id)

#     device_parms = ['userId', 'deviceName', 'longitude', 'latitude']

#     for param in device_parms:
#         if param not in new_info:
#             return None, "bad request"

#     if erro:
#         return None, erro
#     for x in devices:
#         if x.deviceName == new_info['deviceName'] and x.id != id:
#             return None, "the device name already exists"
#     # if device_found:
#     #     device_found.deviceName = new_info['deviceName'] if 'deviceName' in new_info else device_found.deviceName
#     #     return device_found, None


#     if device_found:
#         device_found.deviceName = new_info['deviceName'] if 'deviceName' in new_info else device_found.deviceName
#         device_found.longitude = new_info['longitude'] if 'longitude' in new_info else device_found.longitude
#         device_found.latitude = new_info['latitude'] if 'latitude' in new_info else device_found.latitude
#         device_found.userId = new_info['userId'] if 'userId' in new_info else device_found.userId
#         return device_found, None
    

    
# def delete_device(id):
#     global devices
#     device, erro = chosen_device_list(id)
#     if device:
#         devices.remove(device)
#         return True, None
#     return None, erro
    