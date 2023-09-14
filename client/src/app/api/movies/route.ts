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

  // const newSetCookies = responseCookies.map((cookie) => {
  //   return libCookie.serialize(cookie.name, cookie.value);
  // });

  // console.log("newSetCookies: ", newSetCookies);

  responseCookies.forEach((cookie) => {
    //cookies().set(cookie.name, cookie.value);
    response.headers.set("Set-Cookie", `${cookie.name}=${cookie.value}`);
  });

  //console.log("responseCookies: ", responseCookies);

  //console.log("cookies currently set: ", cookies().getAll());

  // newSetCookies.forEach((cookie) => {
  //   response.headers.set("set-cookie", cookie);
  // });

  return response;
}
