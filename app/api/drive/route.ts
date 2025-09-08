import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Pastikan Anda sudah mengatur variabel ini di file .env.local
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

// Fungsi terpusat untuk otentikasi dan mendapatkan layanan Drive
async function getDriveService() {
  // Pastikan kredensial ada di environment variables
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Kredensial Google Service Account tidak ditemukan di .env.local');
  }

  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Mengatasi format private key
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    // Scope ini memberikan izin penuh (baca, tulis, hapus)
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  return google.drive({ version: 'v3', auth });
}

/**
 * [GET] - Mengambil daftar file dari folder Google Drive
 * Mengembalikan daftar file dalam format JSON.
 */
export async function GET() {
  if (!FOLDER_ID) {
    return NextResponse.json({ error: 'ID Folder Google Drive belum diatur di .env.local' }, { status: 500 });
  }

  try {
    const drive = await getDriveService();
    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false`,
      // Meminta field tambahan untuk ditampilkan di frontend
      fields: 'files(id, name, mimeType, webViewLink, thumbnailLink, size, modifiedTime)',
      orderBy: 'folder, modifiedTime desc', // Urutkan folder dulu, lalu file terbaru
    });
    return NextResponse.json(response.data.files);
  } catch (error: any) {
    console.error('Error saat mengambil file dari Google Drive:', error);
    // Memberikan pesan error yang lebih informatif ke client
    return NextResponse.json({ error: `Gagal mengambil file: ${error.message}` }, { status: 500 });
  }
}

/**
 * [POST] - Mengunggah file baru ke folder Google Drive
 * Menerima file dari FormData.
 */
export async function POST(request: Request) {
  if (!FOLDER_ID) {
    return NextResponse.json({ error: 'ID Folder Google Drive belum diatur di .env.local' }, { status: 500 });
  }

  try {
    const drive = await getDriveService();
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang ditemukan untuk diunggah.' }, { status: 400 });
    }

    const fileMetadata = {
      name: file.name,
      parents: [FOLDER_ID],
    };

    const media = {
      mimeType: file.type,
      body: file.stream(),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name', // Meminta kembali ID dan nama file yang baru dibuat
    });

    return NextResponse.json({ success: true, file: response.data });
  } catch (error: any) {
    console.error('Error saat mengunggah file ke Google Drive:', error);
    return NextResponse.json({ error: `Gagal mengunggah file: ${error.message}` }, { status: 500 });
  }
}
