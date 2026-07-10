import * as dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { initializeApp, cert } from 'firebase-admin/app';
import { join } from 'path';
import * as fs from 'fs';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import compression from 'compression';

// Global TLS disable removed to prevent Node.js warnings.
// Redis TLS is properly handled in app.module.ts via the tls config object.

import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  enabled: process.env.NODE_ENV === 'production',
});

async function bootstrap() {
  let serviceAccountPath = join(
    process.cwd(),
    'src',
    'config',
    'firebase-service-account.json',
  );

  if (!fs.existsSync(serviceAccountPath)) {
    serviceAccountPath = join(
      __dirname,
      'config',
      'firebase-service-account.json',
    );
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
      );
      initializeApp({
        credential: cert(serviceAccount),
      });
      console.log(
        'Firebase Admin SDK initialized successfully from environment variable',
      );
    } catch (e) {
      console.error(
        'Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON from environment:',
        e,
      );
    }
  } else if (fs.existsSync(serviceAccountPath)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const serviceAccount = require(serviceAccountPath);
    initializeApp({
      credential: cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully from file');
  } else {
    console.warn(
      'Firebase service account not found! Please set FIREBASE_SERVICE_ACCOUNT_JSON in your environment.',
    );
  }

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableShutdownHooks();
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.useLogger(app.get(Logger));

  Sentry.setupConnectErrorHandler(app);

  // Security and Compression
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: true, // Dynamically allow the request origin
    credentials: true,
  });

  // Apply Global Pipes, Interceptors, and Filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3005, '0.0.0.0');
}
bootstrap();
// trigger reload
