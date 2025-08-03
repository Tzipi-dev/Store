from fastapi import APIRouter, Depends, HTTPException
from controllers.buyController import (
    get_all_buys,
    add_buy,
    delete_buy,
    update_buy,
    get_buy_by_id
)
from middlewares.verifyJWT import verify_jwt

router = APIRouter(
    # prefix="/buys",  # אפשר לשנות לפי הצורך
    tags=["buys"]
)

@router.get("/")
async def route_get_all_buys():
    return await get_all_buys()

@router.post("/")
async def route_add_buy():
    return await add_buy()

@router.delete("/{id}")
async def route_delete_buy(id: str, user=Depends(verify_jwt)):
    return await delete_buy(id)

@router.put("/{id}")
async def route_update_buy(id: str, user=Depends(verify_jwt)):
    return await update_buy(id)

@router.get("/{id}")
async def route_get_buy_by_id(id: str, user=Depends(verify_jwt)):
    return await get_buy_by_id(id)