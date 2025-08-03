from fastapi import APIRouter, HTTPException, Request
from bson import ObjectId
from config.database import db  # הנחה: מחובר ל-MongoDB דרך db

router = APIRouter()
buys_collection = db.buys

@router.get("/")
async def get_all_buys():
    try:
        buys_cursor = buys_collection.find()
        buys = []
        async for buy in buys_cursor:
            buy["_id"] = str(buy["_id"])
            buys.append(buy)
        return buys
    except Exception as error:
        print("Fail to get buys:", error)
        raise HTTPException(status_code=500, detail="Fail to get buys")

@router.get("/{id}")
async def get_buy_by_id(id: str):
    try:
        buy = await buys_collection.find_one({"_id": ObjectId(id)})
        if not buy:
            raise HTTPException(status_code=404, detail="buy not found")
        buy["_id"] = str(buy["_id"])
        return buy
    except Exception as error:
        print("Failed to get buy:", error)
        raise HTTPException(status_code=500, detail="Failed to get buy")

@router.post("/")
async def add_buy(request: Request):
    try:
        buy_data = await request.json()
        result = await buys_collection.insert_one(buy_data)
        new_buy = await buys_collection.find_one({"_id": result.inserted_id})
        new_buy["_id"] = str(new_buy["_id"])
        return new_buy
    except Exception as error:
        print("Failed to add buy:", error)
        raise HTTPException(status_code=500, detail="Failed to add buy")

@router.put("/{id}")
async def update_buy(id: str, request: Request):
    try:
        data = await request.json()
        update_result = await buys_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": data},
            return_document=True
        )
        if not update_result:
            raise HTTPException(status_code=404, detail="buy not found")
        update_result["_id"] = str(update_result["_id"])
        return update_result
    except Exception as error:
        print("Failed to update buy:", error)
        raise HTTPException(status_code=500, detail="Failed to update buy")

@router.delete("/{id}")
async def delete_buy(id: str):
    try:
        delete_result = await buys_collection.find_one_and_delete({"_id": ObjectId(id)})
        if not delete_result:
            raise HTTPException(status_code=404, detail="buy not found")
        return {"message": "buy deleted successfully"}
    except Exception as error:
        print("Fail to delete buy:", error)
        raise HTTPException(status_code=500, detail="Fail to delete buy")
