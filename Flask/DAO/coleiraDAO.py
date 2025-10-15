import sqlite3

class ColeiraDAO:

    def get_connection(self):
        conn = sqlite3.connect("Database/databasePeTAG.db")
        cursor = conn.cursor()
        return conn, cursor

    def createColeiraDAO(self,coleira):

        conn, cursor = self.get_connection()

        try:
            query = "INSERT INTO Coleira (nomeColeira, userID, longitude, latitude 	, distanciaMaxima) VALUES (?, ?, ?, ?, ?)"
            cursor.execute(query, (coleira["nomeColeira"], coleira["userID"], coleira["longitude"], coleira["latitude"],coleira["distanciaMaxima"]))
            conn.commit()
            return "Coleira criada com sucesso" , None
        except Exception as e:
            return "Algo deu errado (BDD)" , 404
        finally:
            cursor.close()
            conn.close()

    def getAllColeirasDAO(self, id):
        conn, cursor = self.get_connection()
        try:
            query = "SELECT * FROM Coleira WHERE userID = ?"
            cursor.execute(query, (id,))
            rows = cursor.fetchall()
            coleiras = [{'idColeira': row[0], 'userID': row[1], 'nomeColeira': row[2], 'longitude': row[3], 'latitude': row[4] , 'distanciaMaxima':row[5]} for row in rows]

            return coleiras, None
        except Exception as e:
            return None, 404
        finally:
            cursor.close()
            conn.close()
    
    def deleteColeiraDAO(self, id_coleira , userID):
        conn, cursor = self.get_connection()
        try:
            query = "DELETE FROM Coleira WHERE idColeira = ? and userID = ?"

            cursor.execute(query, (
                id_coleira,
                userID
            ))

            conn.commit()

            return {"message": "Coleira deletada com sucesso"}, None
        
        except Exception as e:
            print("Erro no deleteColeiraDAO:", e)  # debug no console
            return None, 500
        finally:
            cursor.close()
            conn.close()
    
    def updateSettingsColeiraDAO(self, id_coleira, data , userID):
        conn, cursor = self.get_connection()
        try:
            query = """
            UPDATE Coleira
            SET nomeColeira = ?,distanciaMaxima = ?
            WHERE idColeira = ? and userID = ?
            """
            cursor.execute(query, (
                data["nomeColeira"],
                data["distanciaMaxima"],
                id_coleira,
                userID
            ))
            conn.commit()

            if cursor.rowcount == 0:
                return None, 404

            return {"message": "Dados da coleira atualizados "}, None
        except Exception as e:
            print("Erro no updateColeiraDAO:", e)
            return None, 500
        finally:
            cursor.close()
            conn.close()

    def updateCoordsColeiraDAO(self, id_coleira, data , userID):
        conn, cursor = self.get_connection()
        try:
            query = """
            UPDATE Coleira
            SET longitude = ?, latitude = ?
            WHERE idColeira = ? and userID = ?
            """
            cursor.execute(query, (
                data["longitude"],
                data["latitude"],
                id_coleira,
                userID
            ))
            conn.commit()

            if cursor.rowcount == 0:
                return None, 404

            return {"message": "Coordenadas atualizadas"}, None
        except Exception as e:
            print("Erro no updateColeiraDAO:", e)
            return None, 500
        finally:
            cursor.close()
            conn.close()