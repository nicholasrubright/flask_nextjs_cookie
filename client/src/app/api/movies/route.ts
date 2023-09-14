import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import setCookie from "set-cookie-parser";
import libCookie from "cookie";

// GET Movies
export async function GET(request: NextRequest) {
  console.log("Cookies before GET Movies response: ", cookies().getAll());

  const apiResponse = await fetch("http://api:8080/movies", {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
  });

  var responseCookies = setCookie.parse(apiResponse.headers.getSetCookie(), {
    decodeValues: true,
  });

  const apiData = await apiResponse.json();
  let response = NextResponse.json(apiData);

  const newSetCookie = responseCookies.map((cookie) => {
    return libCookie.serialize(cookie.name, cookie.value);
  });

  newSetCookie.forEach((cookie) => {
    response.headers.set("set-cookie", cookie);
  });

  return response;
}
