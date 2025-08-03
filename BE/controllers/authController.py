import os
from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from jose import jwt
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from bson import ObjectId

# טעינת משתני סביבה מקובץ .env (אם יש)
from dotenv import load_dotenv
load_dotenv()

# חיבור למסד MongoDB - כל הפרטים מה־env
mongo_url = os.getenv("CONECTION_URL")
mongo_db_name = os.getenv("MONGO_DB_NAME")  # מוסיף שם DB מתוך env

client = AsyncIOMotorClient(mongo_url)
db = client[mongo_db_name]
users_collection = db.users

ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

# Pydantic Models
class UserIn(BaseModel):
    name: str
    email: str
    phone: str
    password: str
    address: str
    allBuys: list
    FavoriteProducts: list

class UserOut(BaseModel):
    id: str = Field(alias="_id")
    name: str
    email: str
    phone: str
    password: str
    address: str
    allBuys: list
    FavoriteProducts: list

# Helpers
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    return jwt.encode(data, ACCESS_TOKEN_SECRET, algorithm="HS256")

# Routes

@router.post("/login")
async def login(request: Request):
    body = await request.json()
    email = body.get("email")
    password = body.get("password")
    if not email or not password:
        raise HTTPException(status_code=400, detail="please fill all the required parameters")
    found_user = await users_collection.find_one({"email": email})
    if not found_user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    if not verify_password(password, found_user["password"]):
        raise HTTPException(status_code=401, detail="Unauthorized")

    user_info = {
        "_id": str(found_user["_id"]),
        "name": found_user["name"],
        "email": found_user["email"],
        "phone": found_user["phone"],
        "password": found_user["password"],
        "address": found_user["address"],
        "allBuys": found_user.get("allBuys", []),
        "FavoriteProducts": found_user.get("FavoriteProducts", []),
    }
    access_token = create_access_token(user_info)
    return JSONResponse({"accessToken": access_token, "user": user_info})

@router.post("/registerUser")
async def register_user(request: Request):
    try:
        body = await request.json()
        result = await users_collection.insert_one(body)
        return JSONResponse({"message": "User created successfully", "id": str(result.inserted_id)}, status_code=201)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/register")
async def register(request: Request):
    body = await request.json()
    required_fields = ["name", "email", "phone", "password", "address", "allBuys", "FavoriteProducts"]
    if any(field not in body or not body[field] for field in required_fields):
        raise HTTPException(status_code=400, detail="please fill all the required parameters")

    duplicate = await users_collection.find_one({"password": body["password"]})
    if duplicate:
        raise HTTPException(status_code=409, detail="duplicated user name")

    hashpwd = hash_password(body["password"])

    user_object = {
        "name": body["name"],
        "email": body["email"],
        "phone": body["phone"],
        "password": hashpwd,
        "address": body["address"],
        "allBuys": body["allBuys"],
        "FavoriteProducts": body["FavoriteProducts"],
    }

    user = await users_collection.insert_one(user_object)
    if not user.inserted_id:
        raise HTTPException(status_code=400, detail="invalid user received")

    created_user = await users_collection.find_one({"_id": user.inserted_id})

    user_info = {
        "_id": str(created_user["_id"]),
        "name": created_user["name"],
        "email": created_user["email"],
        "phone": created_user["phone"],
        "password": created_user["password"],
        "address": created_user["address"],
        "allBuys": created_user.get("allBuys", []),
        "FavoriteProducts": created_user.get("FavoriteProducts", []),
    }
    access_token = create_access_token(user_info)
    return JSONResponse({"accessToken": access_token, "user": user_info}, status_code=201)
