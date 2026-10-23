// Prints an ADMIN_PASSWORD_HASH for a password.
//   npm run hash-password -- 'my new password'
// or with no argument, reads the password from ADMIN_PASSWORD.
import { hashPassword } from "../src/lib/password.js";

const password = process.argv[2] || process.env.ADMIN_PASSWORD;
if (!password) {
  console.error("Usage: npm run hash-password -- '<password>'");
  process.exit(1);
}
if (password.length < 12) {
  console.error("Use at least 12 characters.");
  process.exit(1);
}
console.log(await hashPassword(password));
