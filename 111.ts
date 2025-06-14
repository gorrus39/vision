import z from "zod"

// all properties are required by default
const dogSchema = z
  .object({
    name: z.string(),
    age: z.number(),
  })
  .refine((val) => val.age > 5, { message: "must more then 5", path: ["asdf"] })

// extract the inferred type like this
type Dog = z.infer<typeof dogSchema>

const dog = {
  name: "asdf",
  age: 1,
}

const { success, data, error } = dogSchema.safeParse(dog)

if (error) {
  console.log(error.errors)
}
