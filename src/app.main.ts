import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { AuthGuard } from "./users/user.guard"

async function bootstrap() {
  // Create the app and initialize the DI container
  const app = await NestFactory.create(AppModule)

  // Validate request bodies
  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalGuards(app.get(AuthGuard))

  // Start listening for requests
  await app.listen(4000)
}

// Start the app
bootstrap()
