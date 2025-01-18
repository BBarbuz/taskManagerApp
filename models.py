from peewee import Model, CharField, BooleanField, SqliteDatabase

# Database connection
db = SqliteDatabase("database.db")

class BaseModel(Model):
    class Meta:
        database = db

class User(BaseModel):
    username = CharField(unique=True)
    password_hash = CharField()

class Task(BaseModel):
    title = CharField()
    description = CharField()
    completed = BooleanField(default=False)

# Initialize the database
db.connect()
db.create_tables([User, Task])