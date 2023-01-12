import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, mkdir } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const filesPath = __dirname + '/files';

  if (!existsSync(filesPath))
    mkdir(filesPath, (err) => {
      if (err) throw err;
    });
}
bootstrap();
