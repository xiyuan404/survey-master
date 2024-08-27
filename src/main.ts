import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform/transform.interceptor';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 注册全局请求接口前缀
  app.useGlobalInterceptors(new TransformInterceptor()); // 注册全局响应拦截，统一数据格式
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册全局异常捕获
  app.enableCors(); // 跨域
  await app.listen(3005);
}
bootstrap();
