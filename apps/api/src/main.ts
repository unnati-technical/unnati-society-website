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

  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    initializeApp({
      credential: cert(serviceAccount)
    });
    console.log("Firebase Admin SDK initialized successfully");
  } else {
    console.warn("Firebase service account file not found! Looked at: " + serviceAccountPath);
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
