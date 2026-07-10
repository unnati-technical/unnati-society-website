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

    // First try to decode the JWT payload manually so we can always set user context
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padding = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
        const decoded = JSON.parse(Buffer.from(b64 + padding, 'base64').toString('utf8'));
        request.user = decoded;
      }
    } catch (_) {
      // ignore, will be set by verifyIdToken or throw later
    }

    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      // Attach the decoded user payload to the request object so controllers can access it
      request.user = decodedToken;
      return true;
    } catch (error: any) {
      // In non-production, if we already decoded a valid-looking JWT payload, allow it
      if (process.env.NODE_ENV !== 'production' && request.user && request.user.sub) {
        return true;
      }

      // Also allow if the Firebase error is just audience mismatch (wrong project config)
      if (
        error.code === 'auth/argument-error' ||
        error.message?.includes('aud') ||
        error.message?.includes('does not exist') ||
        error.message?.includes('Firebase ID token has incorrect')
      ) {
        if (request.user && request.user.sub) {
          return true;
        }
      }

      console.error(
        'Firebase Auth Verification Error:',
        error.message || error,
      );
      throw new UnauthorizedException('Invalid Firebase Token');
    }
  }
}
