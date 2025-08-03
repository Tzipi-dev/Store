from fastapi import APIRouter, Depends
from controllers.productController import (
    get_all_products,
    add_product,
    delete_product,
    update_product,
    get_product_by_id
)
from middlewares.verifyJWT import verify_jwt

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

@router.get("/")
async def route_get_all_products():
    return await get_all_products()

@router.post("/")
async def route_add_product():
    return await add_product()

@router.delete("/{id}")
async def route_delete_product(id: str):
    return await delete_product(id)

@router.put("/{id}")
async def route_update_product(id: str):
    return await update_product(id)

@router.get("/{id}")
async def route_get_product_by_id(id: str):
    return await get_product_by_id(id)