from fastapi import APIRouter, Depends
from controllers.userController import (
    add_user,
    get_all_users,
    delete_user,
    update_user,
    get_user_by_id
)
from controllers.authController import register
from middlewares.verifyJWT import verify_jwt

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.post("/")
async def route_register_and_add_user(user_data=Depends(register)):
    return await add_user(user_data)

@router.get("/")
async def route_get_all_users():
    return await get_all_users()

@router.delete("/{id}")
async def route_delete_user(id: str, user=Depends(verify_jwt)):
    return await delete_user(id)

@router.put("/{id}")
async def route_update_user(id: str, user=Depends(verify_jwt)):
    return await update_user(id)

@router.get("/{id}")
async def route_get_user_by_id(id: str, user=Depends(verify_jwt)):
    return await get_user_by_id(id)