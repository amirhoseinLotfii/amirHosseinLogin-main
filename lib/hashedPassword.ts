import * as bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // The cost factor, higher values are more secure but slower
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Example of comparing a password with the hash
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export async function HashPassword(password: string) {
  const isMatch = await bcrypt.hash(password, 12);
  return isMatch;
}
