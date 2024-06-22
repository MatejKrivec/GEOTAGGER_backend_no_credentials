"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('GeotaggerAPI')
        .setDescription('API for geotagger web application')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: 'https://geotagger-dpsnsyhip-matej-krivecs-projects.vercel.app'
    });
    await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
exports.default = bootstrap;
//# sourceMappingURL=main.js.map