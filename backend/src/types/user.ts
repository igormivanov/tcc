import { Course, Interest, RepublicInterest, Ride, User } from "@prisma/client"

type AdditionalProperties = {
  course: Course;
  republicInterest?: RepublicInterest;
  interests?: Interest[];
  ride?: Ride;
}

export type UserWithNewProperties = User & AdditionalProperties

export type UserDTO = {
    name: String
    email: String
    semester: Number
    tel: String
    course: {
      name: String
      duration: Number
    },
    interest?: Interest[]
    republicInterest?: RepublicInterest
    ride?: Ride
}

  
