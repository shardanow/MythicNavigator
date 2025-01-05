from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from open_ai_integration import generate_story
from init_data import init_json_structure

app = FastAPI()

# Add CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow origin from localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "Hello, API is working! Select correct endpoint to use the API."}


@app.post("/test-data")
def read_test_data():
    return init_json_structure;

@app.post("/generate-story")
def generate(data: dict):
    return generate_story(data)