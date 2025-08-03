from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter()

@router.get("/cities")
async def get_all_cities_in_israel():
    resource_id = '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba'
    url = f'https://data.gov.il/api/3/action/datastore_search?resource_id={resource_id}&limit=1000'

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            cities = [record['שם_ישוב'] for record in data['result']['records']]
            unique_cities = list(set(cities))
            return unique_cities
        except httpx.HTTPStatusError as exc:
            print(f"שגיאה בקריאה ל-API: {exc.response.status_code} {exc.response.text}")
            raise HTTPException(status_code=exc.response.status_code, detail="שגיאה בקבלת נתונים מה-API")
        except Exception as e:
            print(f"Fail to get cities: {e}")
            raise HTTPException(status_code=500, detail="Fail to get cities")