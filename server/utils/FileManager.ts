import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as multer from 'multer';

export class FileManager {
    private folder: any;

  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = FileManager.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }

  static multer(){
    return multer({
        storage: multer.memoryStorage(),
        limits: {
           fileSize: 100 * 1024 * 1024,
         }
   });
  }
}