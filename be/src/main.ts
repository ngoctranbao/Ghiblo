// src/main.js
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
      origin: 'http://localhost:3000', // or a list of allowed origins
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true, // if you need to include cookies or other credentials
    });
    
  await app.listen(8000);
}
bootstrap();

