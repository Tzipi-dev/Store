from fastapi import APIRouter, Depends
from controllers.saleController import (
    get_all_sales,
    add_sale,
    delete_sale,
    update_sale,
    get_sale_by_id
)
from middlewares.verifyJWT import verify_jwt

router = APIRouter(
    prefix="/sales",
    tags=["sales"]
)

@router.get("/")
async def route_get_all_sales():
    return await get_all_sales()

@router.post("/")
async def route_add_sale():
    return await add_sale()

@router.delete("/{id}")
async def route_delete_sale(id: str, user=Depends(verify_jwt)):
    return await delete_sale(id)

@router.put("/{id}")
async def route_update_sale(id: str, user=Depends(verify_jwt)):
    return await update_sale(id)

@router.get("/{id}")
async def route_get_sale_by_id(id: str, user=Depends(verify_jwt)):
    return await get_sale_by_id(id)