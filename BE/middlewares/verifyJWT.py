from fastapi import Request, HTTPException, status, Depends
from jose import JWTError, jwt
import os

ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")

async def verify_jwt(request: Request):
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized"
        )

    token = auth_header.split(" ")[1]

    try:
        payload = jwt.decode(token, ACCESS_TOKEN_SECRET, algorithms=["HS256"])
        request.state.user = payload  # ניתן לשלוף אח"כ מה־request
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden"
        )
