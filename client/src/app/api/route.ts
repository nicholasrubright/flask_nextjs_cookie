import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  if (cookies().has("session")) {
    const apiResponse = await fetch("http://api:8080/movies/liked", {
      method: "GET",
      cache: "no-cache",
      headers: {
        Cookie: ("session=" + cookies().get("session")?.value) as string,
      },
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      return NextResponse.json(data);
    }
  }

  return NextResponse.json(null);
}

export async function POST(request: NextRequest) {
  const formData = await request.json();

  const apiResponse = await fetch("http://api:8080/movies", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formData.join("&"),
  });

  const sessionCookie = apiResponse.headers.getSetCookie()[0];
  if (sessionCookie) {
    const cookie = sessionCookie.split("session=")[1];
    cookies().set("session", cookie);
  }

  return NextResponse.json(null);
}
