from fastapi import APIRouter, HTTPException, Request
from bson import ObjectId
from config.database import db  # הנחה: מחובר ל-MongoDB דרך db

router = APIRouter()
users_collection = db.users

@router.get("/")
async def get_all_users():
    try:
        cursor = users_collection.find()
        users = []
        async for user in cursor:
            user["_id"] = str(user["_id"])
            users.append(user)
        return users
    except Exception as error:
        print("Fail to get users:", error)
        raise HTTPException(status_code=500, detail="Fail to get users")

@router.get("/{id}")
async def get_user_by_id(id: str):
    try:
        user = await users_collection.find_one({"_id": ObjectId(id)})
        if not user:
            raise HTTPException(status_code=404, detail="user not found")
        user["_id"] = str(user["_id"])
        return user
    except Exception as error:
        print("Failed to get user:", error)
        raise HTTPException(status_code=500, detail="Failed to get user")

@router.post("/")
async def add_user(request: Request):
    try:
        user_data = await request.json()
        result = await users_collection.insert_one(user_data)
        new_user = await users_collection.find_one({"_id": result.inserted_id})
        new_user["_id"] = str(new_user["_id"])
        return new_user
    except Exception as error:
        print("Failed to add user:", error)
        raise HTTPException(status_code=500, detail="Failed to add user")

@router.put("/{id}")
async def update_user(id: str, request: Request):
    try:
        data = await request.json()
        update_result = await users_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": data},
            return_document=True
        )
        if not update_result:
            raise HTTPException(status_code=404, detail="user not found")
        update_result["_id"] = str(update_result["_id"])
        return update_result
    except Exception as error:
        print("Failed to update user:", error)
        raise HTTPException(status_code=500, detail="Failed to update user")

@router.delete("/{id}")
async def delete_user(id: str):
    try:
        delete_result = await users_collection.find_one_and_delete({"_id": ObjectId(id)})
        if not delete_result:
            raise HTTPException(status_code=404, detail="user not found")
        return {"message": "user deleted successfully"}
    except Exception as error:
        print("Fail to delete user:", error)
        raise HTTPException(status_code=500, detail="Fail to delete user")
