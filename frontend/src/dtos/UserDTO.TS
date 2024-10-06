import { RepublicInterestDTO } from './RepublicInterestDTO';
import { RideDTO } from './RideDTO';
import { InterestDTO } from './InterestDTO';
import { CourseDTO } from './CourseDTO';
export type UserDTO = {
  id: string,
  name: string,
  email: string,
  semester: number,
  tel: string,
  photo: string,
  course: CourseDTO,
  republicInterest?: RepublicInterestDTO
  ride?: RideDTO
  interests?: InterestDTO[]
}
