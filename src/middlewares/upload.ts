import multer from '@koa/multer';
import fsExtra from 'fs-extra';
import Helper from '../utils/helper';

const defaultUploadDir = `uploads/${Helper.formatDate()}`;

const upload = (uploadDir: string = defaultUploadDir, fileName?: string) => {
  const uploadDirIsExist = fsExtra.existsSync(uploadDir);
  if (!uploadDirIsExist) {
    fsExtra.mkdirpSync(uploadDir);
  }

  const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
      cb(null, uploadDir);
    },
    filename: function(_req, file, cb) {
      const defaultFileNameArr = fileName ? fileName.split('.') : file.originalname.split('.');
      cb(null, `${Date.now()}.${defaultFileNameArr[defaultFileNameArr.length - 1]}`);
    }
  });
  return multer({
    storage: storage
  });
};

export default upload;
