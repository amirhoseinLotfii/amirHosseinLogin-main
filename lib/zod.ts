import { z } from "zod";

export const SchemaSignUp = z.object({
  firstName: z.string().min(3, "نام باید حداقل شامل 3 حرف باشد"),
  lastName: z.string().min(3, "نام خانوادگی باید حداقل شامل 3 حرف باشد"),
  userName: z.string().min(3, "نام کاربری باید حداقل شامل 3 حرف باشد"),
  password: z
    .string()
    .min(7, "رمز عبور حداقل باید شامل 8 حرف باشد")
    .refine((val) => /[a-z]/.test(val) && /[A-Z]/.test(val), {
      message: "رمز عبور باید شامل حداقل یک حرف بزرگ و یک حرف کوچک باشد",
    }),
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z
    .string()
    .length(11, "شماره تماس باید 11 رقم باشد")
    .startsWith("09", "شماره تماس باید با 09 شروع شود"),
});

export const SchemaLogin = z.object({
  userName: z.string().min(3, "نام کاربری باید حداقل شامل 3 حرف باشد"),
  password: z
    .string()
    .min(7, "رمز عبور حداقل باید شامل 8 حرف باشد")
    .refine((val) => /[a-z]/.test(val) && /[A-Z]/.test(val), {
      message: "رمز عبور باید شامل حداقل یک حرف بزرگ و یک حرف کوچک باشد",
    }),
});
