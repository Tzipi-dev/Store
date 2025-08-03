from fastapi import APIRouter, HTTPException, Request
from bson import ObjectId
from config.database import db  # הנחה: מחובר ל-MongoDB דרך db

router = APIRouter()
sales_collection = db.sales

@router.get("/")
async def get_all_sales():
    try:
        cursor = sales_collection.find()
        sales = []
        async for sale in cursor:
            sale["_id"] = str(sale["_id"])
            sales.append(sale)
        return sales
    except Exception as error:
        print("Fail to get sales:", error)
        raise HTTPException(status_code=500, detail="Fail to get sales")

@router.get("/{id}")
async def get_sale_by_id(id: str):
    try:
        sale = await sales_collection.find_one({"_id": ObjectId(id)})
        if not sale:
            raise HTTPException(status_code=404, detail="sale not found")
        sale["_id"] = str(sale["_id"])
        return sale
    except Exception as error:
        print("Failed to get sale:", error)
        raise HTTPException(status_code=500, detail="Failed to get sale")

@router.post("/")
async def add_sale(request: Request):
    try:
        sale_data = await request.json()
        result = await sales_collection.insert_one(sale_data)
        new_sale = await sales_collection.find_one({"_id": result.inserted_id})
        new_sale["_id"] = str(new_sale["_id"])
        return new_sale
    except Exception as error:
        print("Failed to add sale:", error)
        raise HTTPException(status_code=500, detail="Failed to add sale")

@router.put("/{id}")
async def update_sale(id: str, request: Request):
    try:
        data = await request.json()
        update_result = await sales_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": data},
            return_document=True
        )
        if not update_result:
            raise HTTPException(status_code=404, detail="sale not found")
        update_result["_id"] = str(update_result["_id"])
        return update_result
    except Exception as error:
        print("Failed to update sale:", error)
        raise HTTPException(status_code=500, detail="Failed to update sale")

@router.delete("/{id}")
async def delete_sale(id: str):
    try:
        delete_result = await sales_collection.find_one_and_delete({"_id": ObjectId(id)})
        if not delete_result:
            raise HTTPException(status_code=404, detail="sale not found")
        return {"message": "sale deleted successfully"}
    except Exception as error:
        print("Fail to delete sale:", error)
        raise HTTPException(status_code=500, detail="Fail to delete sale")
