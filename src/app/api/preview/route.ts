import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  (await draftMode()).enable();
  return NextResponse.redirect(new URL("/", req.url));
}
