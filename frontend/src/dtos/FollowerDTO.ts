export type FollowerDTO = {
  id: string,
  name: string,
  semester: number,
  course: {
    name: string
  }
}