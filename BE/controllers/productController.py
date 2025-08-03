from fastapi import APIRouter, HTTPException, Request
from bson import ObjectId
from config.database import db  # הנחה: מחובר ל-MongoDB דרך db

router = APIRouter()
products_collection = db.products

@router.get("/")
async def get_all_products():
    try:
        print("Fetching all products")
        cursor = products_collection.find()
        products = []
        async for product in cursor:
            product["_id"] = str(product["_id"])
            products.append(product)
        return products
    except Exception as error:
        print("Fail to get Products:", error)
        raise HTTPException(status_code=500, detail="Fail to get Products")

@router.get("/{id}")
async def get_product_by_id(id: str):
    try:
        product = await products_collection.find_one({"_id": ObjectId(id)})
        if not product:
            raise HTTPException(status_code=404, detail="product not found")
        product["_id"] = str(product["_id"])
        return product
    except Exception as error:
        print("Failed to get Product:", error)
        raise HTTPException(status_code=500, detail="Failed to get Product")

@router.post("/")
async def add_product(request: Request):
    try:
        product_data = await request.json()
        result = await products_collection.insert_one(product_data)
        new_product = await products_collection.find_one({"_id": result.inserted_id})
        new_product["_id"] = str(new_product["_id"])
        return new_product
    except Exception as error:
        print("Failed to add product:", error)
        raise HTTPException(status_code=500, detail="Failed to add product")

@router.put("/{id}")
async def update_product(id: str, request: Request):
    try:
        data = await request.json()
        update_result = await products_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": data},
            return_document=True
        )
        if not update_result:
            raise HTTPException(status_code=404, detail="product not found")
        update_result["_id"] = str(update_result["_id"])
        return update_result
    except Exception as error:
        print("Failed to update product:", error)
        raise HTTPException(status_code=500, detail="Failed to update product")

@router.delete("/{id}")
async def delete_product(id: str):
    try:
        delete_result = await products_collection.find_one_and_delete({"_id": ObjectId(id)})
        if not delete_result:
            raise HTTPException(status_code=404, detail="product not found")
        return {"message": "product deleted successfully"}
    except Exception as error:
        print("Fail to delete product:", error)
        raise HTTPException(status_code=500, detail="Fail to delete product")
