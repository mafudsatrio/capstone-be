import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthLoginValidator from "App/Validators/AuthLoginValidator";

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    const { request, response, auth } = ctx;
    const { email, password } = await request.validate(AuthLoginValidator);

    try {
      const token = await auth.use("api").attempt(email, password);
      return response.ok(token);
    } catch (error) {
      return response.badRequest(error);
    }
  }
}
