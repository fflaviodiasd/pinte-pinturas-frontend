import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("E-mail obrigatório"),
  password: z.string().nonempty("Senha obrigatória"),
});
