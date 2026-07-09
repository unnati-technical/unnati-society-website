import { google } from 'googleapis';
import * as path from 'path';

async function test() {
  try {
    const keyFilePath = path.join(__dirname, 'google-service-account.json');
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    console.log('Fetching events...');
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    console.log('SUCCESS! Events found:', response.data.items?.length);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

test();
