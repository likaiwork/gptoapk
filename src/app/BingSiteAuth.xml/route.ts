import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    '<?xml version="1.0"?>\n<users>\n <user>F9DDBF5E7468903E9C589BC6B8E3D6CB</user>\n</users>\n',
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
