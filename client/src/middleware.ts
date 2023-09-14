import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  //   console.log("middleware request: ", request.url);

  //   console.log("middleware: ", request.headers);

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/movies", "/api/liked"],
};
