import { Controller, Post, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Request } from 'express';

const UPLOAD_DIR = join(__dirname, '..', '..', 'uploads');

// Ensure upload dir exists
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true });
}

function generateFileName(originalName: string) {
  const fileExtName = extname(originalName);
  const name = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${name}${fileExtName}`;
}

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (_req, file, cb) => {
          cb(null, generateFileName(file.originalname));
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: any, @Req() req: Request) {
    const host = req.get('host');
    const protocol = req.protocol;
    const url = `${protocol}://${host}/uploads/${file.filename}`;

    return {
      url,
      filename: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }
}
