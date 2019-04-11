import fdb
from decouple import config


class FirebirdConnector:
    CHARSET = 'utf-8'

    def __init__(self, **kwargs):
        self.host = kwargs.get('host', config('FB_HOST'))
        self.database = kwargs.get('database', config('FB_DATABASE'))
        self.user = kwargs.get('user', config('FB_USER'))
        self.password = kwargs.get('password', config('FB_PASSWORD'))
        self.connection: fdb.connect = None

        self.connect()

    def connect(self):
        """
        Connect with database
        """
        self.connection = fdb.connect(
            host=self.host,
            database=self.database,
            user=self.user,
            password=self.password,
            charset=self.CHARSET
        )

    def select_all(self, table):
        """
        Return list of data with base SELECT statement
        """
        cursor = self.connection.cursor()
        cursor.execute(f'SELECT * FROM {table}', None)
        columns = [col[0].lower() for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

    def get(self, query, params=None):
        """
        Return list of data with base SELECT statement
        """
        cursor = self.connection.cursor()
        cursor.execute(query, params)
        columns = [col[0].lower() for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

# Doc
# https://fdb.readthedocs.io/en/v2.0/getting-started.html#quick-start-guide
