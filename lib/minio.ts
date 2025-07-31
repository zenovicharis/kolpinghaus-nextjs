import * as Minio from 'minio';

const useSSL = process.env.MINIO_USE_SSL === 'true';
const port = parseInt(process.env.MINIO_PORT!);

const config: Minio.ClientOptions = {
  endPoint: process.env.MINIO_ENDPOINT!,
  useSSL: useSSL,
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
};

if (port && !((useSSL && port === 443) || (!useSSL && port === 80))) {
  config.port = port;
}

export const minioClient = new Minio.Client(config);
