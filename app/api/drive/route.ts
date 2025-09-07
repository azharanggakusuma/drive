<<<<<<< HEAD
// app/api/drive/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    return NextResponse.json({ error: "Missing Google credentials" }, { status: 500 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    });

    const files = response.data.files;
    return NextResponse.json({ files });
  } catch (error) {
    console.error("The API returned an error: " + error);
    return NextResponse.json({ error: "Failed to fetch files from Google Drive" }, { status: 500 });
  }
=======
// app/api/drive/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    return NextResponse.json({ error: "Missing Google credentials" }, { status: 500 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    });

    const files = response.data.files;
    return NextResponse.json({ files });
  } catch (error) {
    console.error("The API returned an error: " + error);
    return NextResponse.json({ error: "Failed to fetch files from Google Drive" }, { status: 500 });
  }
>>>>>>> 0da2adc (feat: integrate Google Drive API for file listing)
}