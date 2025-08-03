from fastapi import APIRouter
from controllers.authController import login

router = APIRouter(
    # prefix="/auth",
    tags=["auth"]
)

@router.post("/")
async def route_login():
    return await login()