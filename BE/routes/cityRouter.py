from fastapi import APIRouter
from controllers.cityController import get_all_cities_in_israel

router = APIRouter(
    prefix="/cities",
    tags=["cities"]
)

@router.get("/")
async def route_get_all_cities():
    return await get_all_cities_in_israel()