import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { readFile } from 'fs/promises';

@Controller()
export class AppController {
  @Get('/')
  async serveIndex(@Res() res: Response) {
    try {
      const html = await readFile('index.html', 'utf-8');
      res.type('html').send(html);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Internal Server Error';
      res.status(500).send(message);
    }
  }
}
