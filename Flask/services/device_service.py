from DAO.coleiraDAO import ColeiraDAO

daoService = ColeiraDAO()

def create_coleira(info):
    response , error = daoService.createColeiraDAO(info)
    return response, error

def get_all_coleiras(id):
    response , error = daoService.getAllColeirasDAO(id)
    return response , error

def delete_coleira(id_coleira, userID):
    response , error = daoService.deleteColeiraDAO(id_coleira, userID)
    return response , error

def update_device_settings(id_coleira,data,userID):
    response , error = daoService.updateSettingsColeiraDAO(id_coleira,data,userID)
    return response , error

def update_device_coords(id_coleira,data,userID):
    response , error = daoService.updateCoordsColeiraDAO(id_coleira,data,userID)
    return response , error
