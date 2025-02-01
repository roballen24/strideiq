from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/generate-route")
async def generate_route(start_location: str, distance_miles: float):
    # Validate inputs
    if not start_location or distance_miles <= 0:
        raise HTTPException(status_code=400, detail="Invalid input")

    # Generate route data (mocked for now)
    route = [
        {
            "distance": {"text": "1 ft", "value": 0},
            "duration": {"text": "1 min", "value": 0},
            "end_location": {"lat": 36.0300664, "lng": -86.75379679999999},
            "html_instructions": "Head on <b>Cottonport Dr</b>",
            "polyline": {"points": "}b|zEfbopO"},
            "start_location": {"lat": 36.0300664, "lng": -86.75379679999999},
            "travel_mode": "WALKING",
        }
    ]

    # Return only the route array
    return route
