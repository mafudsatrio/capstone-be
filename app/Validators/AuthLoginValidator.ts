import { rules, schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthLoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.exists({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(8)]),
  });
  public messages: CustomMessages = {
    "email.required": "Email is required to login",
    "email.email": "Email is not valid",
    "email.exists": "Email does not exist",
    "password.required": "Password is required to login",
    "password.minLength": "Password must be at least 8 characters",
  };
}
