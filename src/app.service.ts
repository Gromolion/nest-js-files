import { Injectable } from '@nestjs/common';
import { FileDto } from './dto/file-dto';
import { writeFile, readFileSync, existsSync, unlink } from 'fs';

@Injectable()
export class AppService {
  getFile(name: string) {
    const path = __dirname + `/files/${name}`;

    if (existsSync(path)) {
      const content = readFileSync(path, { encoding: 'utf-8' });

      return {
        name: name,
        content: content,
      };
    }

    return {
      error: `Файла с именем ${name} не существует`,
    };
  }

  createFile(fileDto: FileDto) {
    const path = __dirname + `/files/${fileDto.name}`;

    if (!existsSync(path)) {
      writeFile(path, fileDto.content, function (err) {
        if (err) throw err;
      });

      return {
        result: `Файл с именем ${fileDto.name} создан`,
      };
    }

    return {
      error: `Файл с именем ${fileDto.name} уже существует`,
    };
  }

  updateFile(name: string, fileDto: FileDto) {
    const path = __dirname + `/files/${name}`;

    if (existsSync(path)) {
      unlink(path, (err) => {
        if (err) throw err;

        writeFile(
          __dirname + `/files/${fileDto.name}`,
          fileDto.content,
          function (err) {
            if (err) throw err;
          },
        );
      });

      return {
        result: `Файл с именем ${name} обновлен. Новое имя файла: ${fileDto.name}`,
      };
    }

    return {
      error: `Файла с именем ${name} не существует`,
    };
  }

  deleteFile(name: string) {
    const path = __dirname + `/files/${name}`;

    if (existsSync(path)) {
      unlink(path, (err) => {
        if (err) throw err;
      });

      return {
        result: `Файл с именем ${name} удален.`,
      };
    }

    return {
      error: `Файла с именем ${name} не существует`,
    };
  }
}
