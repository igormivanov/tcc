export type FriendDTO = {
  id: string,
  name: string,
  semester: number,
  course: {
    name: string
  }
}