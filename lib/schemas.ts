import { z } from "zod";

export const apikeySchema = z.string({
  required_error: "apikey is required",
  invalid_type_error: "apikey must be a string",
});
