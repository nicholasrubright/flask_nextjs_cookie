import { NextRequest, NextResponse } from "next/server";

// GET Liked Movies
export async function GET(request: NextRequest) {
  const apiResponse = await fetch("http://api:8080/movies/liked", {
    method: "GET",
    cache: "no-cache",
  });

  const apiData = await apiResponse.json();

  return NextResponse.json(apiData);
}

// POST Like Movies
export async function POST(request: NextRequest) {}
