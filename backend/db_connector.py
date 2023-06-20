import mysql.connector
import os
from dotenv import load_dotenv
load_dotenv()

class Database:
    connection = None
    def __init__(self):
        if self.connection is None or self.connection.is_connected() == False:
            self.connection = mysql.connector.connect(
                user=str(os.environ.get('DB_USER', 'root')),
                password=str(os.environ.get('DB_PASSWORD', '')),
                host=str(os.environ.get('DB_HOST', 'localhost')),
                database=str(os.environ.get('DB_NAME', 'file_uploader')),
                port=3306
            )
            self.connection.autocommit = False
    def query(self, query, autoCommit=None, fetch="ALL"):
        try:
            cursor = self.connection.cursor()
            result = cursor.execute(query)
            if autoCommit is not None:
                self.connection.commit()
                operation = True if cursor.lastrowid == 0 else {"id": cursor.lastrowid}
                return {"data": operation}
            
            fields = [field_md[0] for field_md in cursor.description]
            if fetch != "SINGLE":
                result = [dict(zip(fields, row)) for row in cursor.fetchall()]
                return {"data": result}
            else:
                result = [dict(zip(fields, row)) for row in cursor.fetchone()]
                return {"data": result}
        except Exception as e:
            return {"data": None, "error": e, "query": query}