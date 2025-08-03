from fastapi.middleware.cors import CORSMiddleware


allowed_origins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "http://localhost:7000",
    "http://localhost:5000",
    "http://localhost:3000",
]


def apply_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
