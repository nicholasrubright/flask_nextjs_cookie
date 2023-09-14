import { NextRequest, NextResponse } from "next/server";

// GET Movies
export async function GET(request: NextRequest) {
  const apiResponse = await fetch("http://api:8080/movies", {
    method: "GET",
    cache: "no-cache",
  });

  const apiData = await apiResponse.json();

  return NextResponse.json(apiData);
}
