import { Injectable, Logger } from '@nestjs/common';
import { ImageKit } from '@imagekit/nodejs';
import { toFile } from '@imagekit/nodejs';

export interface UploadResult {
  url: string;
  fileId: string;
  name: string;
  filePath: string;
  size: number;
  fileType: string;
}

@Injectable()
export class ImageKitService {
  private readonly logger = new Logger(ImageKitService.name);
  private readonly ik: ImageKit;

  constructor() {
    this.ik = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    });
  }

  /**
   * Upload a file buffer to ImageKit.
   * Returns an UploadResult containing the public URL and fileId.
   */
  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'uploads',
  ): Promise<UploadResult> {
    // Security & Optimization: Global File Constraints
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        'File size exceeds the 5MB limit. Please compress your file before uploading.',
      );
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/webm',
      'application/pdf',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error(
        `File type ${file.mimetype} is not allowed. Supported formats: JPG, PNG, WEBP, GIF, MP4, PDF.`,
      );
    }

    const safeName = file.originalname.replace(/\s+/g, '_');
    const fileName = `${Date.now()}-${safeName}`;

    try {
      const blob = await toFile(file.buffer, fileName, { type: file.mimetype });

      const result = await this.ik.files.upload({
        file: blob,
        fileName,
        folder: `/${folder}`,
        useUniqueFileName: true,
      });

      return {
        url: (result as any).url,
        fileId: (result as any).fileId,
        name: (result as any).name,
        filePath: (result as any).filePath,
        size: (result as any).size,
        fileType: (result as any).fileType,
      };
    } catch (error) {
      this.logger.error(`ImageKit upload failed: ${error.message}`);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Delete a file from ImageKit by its fileId.
   */
  async deleteFile(fileId: string, _resourceType?: string): Promise<void> {
    try {
      await this.ik.files.delete(fileId);
    } catch (error) {
      this.logger.error(
        `ImageKit delete failed for ${fileId}: ${error.message}`,
      );
      // Don't re-throw — a failed delete should not break the main flow
    }
  }
}
