import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
      session({
        secret: "kms",
        resave: false,
        saveUninitialized: false,
      })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log('Server started: http://localhost:3000');
}
bootstrap();
