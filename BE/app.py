import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from config.corsOptions import apply_cors
from config.dbConn import connect_db  # פונקציית החיבור שלך

load_dotenv()

app = FastAPI()
apply_cors(app)

db_client = None
db = None

@app.on_event("startup")
async def startup_db_client():
    global db_client, db
    db_client = await connect_db()
    if db_client:
        db = db_client.your_database_name  # שנה לשם מסד הנתונים שלך
    else:
        print("Failed to connect to MongoDB")

@app.on_event("shutdown")
async def shutdown_db_client():
    global db_client
    if db_client:
        db_client.close()

# ייבוא ראוטרים - תחליף את השמות והנתיבים בהתאם לפרויקט שלך
from routes.buyRouter import router as buy_router
from routes.userRouter import router as user_router
from routes.productRouter import router as product_router
from routes.loginRouter import router as login_router
from routes.saleRouter import router as sale_router
from routes.cityRouter import router as city_router

app.include_router(buy_router, prefix="/buys")
app.include_router(user_router, prefix="/users")
app.include_router(product_router, prefix="/products")
app.include_router(login_router, prefix="/login")
app.include_router(sale_router, prefix="/sales")
app.include_router(city_router, prefix="/cities")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
