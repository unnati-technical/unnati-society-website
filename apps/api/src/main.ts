import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp, cert } from 'firebase-admin/app';
import { join } from 'path';
import * as fs from 'fs';

// Global TLS disable removed to prevent Node.js warnings. 
// Redis TLS is properly handled in app.module.ts via the tls config object.

async function bootstrap() {
  let serviceAccountPath = join(process.cwd(), 'src', 'config', 'firebase-service-account.json');
  
  if (!fs.existsSync(serviceAccountPath)) {
    serviceAccountPath = join(__dirname, 'config', 'firebase-service-account.json');
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      initializeApp({
        credential: cert(serviceAccount)
      });
      console.log("Firebase Admin SDK initialized successfully from environment variable");
    } catch (e) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON from environment:", e);
    }
  } else if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    initializeApp({
      credential: cert(serviceAccount)
    });
    console.log("Firebase Admin SDK initialized successfully from file");
  } else {
    console.warn("Firebase service account not found! Please set FIREBASE_SERVICE_ACCOUNT_JSON in your environment.");
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
