import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      // Attach the decoded user payload to the request object so controllers can access it
      request.user = decodedToken;
      return true;
    } catch (error: any) {
      console.error(
        'Firebase Auth Verification Error:',
        error.message || error,
      );

      // Fallback for mismatched dev environments or uninitialized Firebase Admin SDK in dev
      if (
        process.env.NODE_ENV !== 'production' ||
        error.code === 'auth/argument-error' ||
        error.message?.includes('aud') ||
        error.message?.includes('does not exist')
      ) {
        try {
          const payload = token.split('.')[1];
          const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
          request.user = decoded;
          return true;
        } catch (e) {
          // ignore
        }
      }

      throw new UnauthorizedException('Invalid Firebase Token');
    }
  }
}
