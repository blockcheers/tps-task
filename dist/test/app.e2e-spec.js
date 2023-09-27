"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../src/app.module");
describe('AuthController (e2e)', () => {
    let app;
    let accessToken;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('/auth/register (POST)', () => (0, supertest_1.default)(app.getHttpServer())
        .post('/auth/register')
        .send({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@smith.com',
        password: 'password',
    })
        .expect(200));
    it('/auth/login (POST)', async () => {
        const response = await (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send({
            email: 'john@smith.com',
            password: 'password',
        })
            .expect(200);
        accessToken = response.body.token.accessToken;
    });
    it('/auth/me (GET)', () => (0, supertest_1.default)(app.getHttpServer())
        .get('/auth/me')
        .set({ Authorization: `Bearer ${accessToken}` })
        .expect(200));
    afterAll(() => app.close());
});
//# sourceMappingURL=app.e2e-spec.js.map