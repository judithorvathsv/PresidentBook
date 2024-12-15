import { z } from "zod";

export const presidentSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }), 
  lastName: z.string().min(1, { message: "Last Name is required" }),  
  startYear: z.string()
    .trim()
    .refine(value => value !== "", { message: "Start Year is required" }) 
    .transform(value => {
      const num = parseInt(value, 10);
      if (isNaN(num)) {
        throw new Error("Start Year must be a valid number");
      }
      return num;
    })
    .refine((value) => value >= 1000 && value <= 9999, {
      message: "Start Year must be between 1000 and 9999",
    }),
  
    endYear: z.string().optional().refine((val) => 
      val === undefined || val === "" || val === "0" || (parseInt(val) >= 1000 && parseInt(val) <= 9999), 
      {
        message: "End Year must be either empty, 0, or between 1000 and 9999",
      }
    ),
  });


export type PresidentFormInput = z.infer<typeof presidentSchema>;