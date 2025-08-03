import os
import motor.motor_asyncio
from dotenv import load_dotenv
load_dotenv()
async def connect_db():
    connection_url = os.getenv("CONECTION_URL")
    if not connection_url:
        print("Missing CONECTION_URL environment variable")
        return None
    try:
        client = motor.motor_asyncio.AsyncIOMotorClient(connection_url)
        await client.admin.command('ping')
        print("MongoDB Connected")
        return client
    except Exception as e:
        print("MongoDB Connection Error:", e)
        return None