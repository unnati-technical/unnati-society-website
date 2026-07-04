import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditLogsService } from '../modules/audit-logs/audit-logs.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, user, ip, body, params } = req;

    // Only log mutations
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      return next.handle().pipe(
        tap((response) => {
          // Extract entity name from URL (e.g., /api/v1/volunteers -> volunteers)
          const entity = url.split('/')[3] || url.split('/')[2] || 'unknown';
          const entityId = params.id || response?.id || null;

          const actionMap: Record<string, string> = {
            POST: 'CREATE',
            PUT: 'UPDATE',
            PATCH: 'UPDATE',
            DELETE: 'DELETE',
          };
          const action = actionMap[method] || method;

          this.auditLogsService.logAction({
            userId: user?.id,
            userEmail: user?.email,
            action,
            entity,
            entityId,
            previousData: undefined, // Hard to capture generically without Prisma extensions
            updatedData: JSON.stringify(body),
            ipAddress: ip,
          }).catch(err => console.error('Failed to save audit log:', err));
        }),
      );
    }

    return next.handle();
  }
}
