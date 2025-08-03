import os
import motor.motor_asyncio
from dotenv import load_dotenv

load_dotenv()

connection_url = os.getenv("CONECTION_URL")
mongo_db_name = os.getenv("MONGO_DB_NAME")

client = motor.motor_asyncio.AsyncIOMotorClient(connection_url)
db = client[mongo_db_name]