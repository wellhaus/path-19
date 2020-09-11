// export interface LocationSchema {
//   name: string,
//   lat: number,
//   long: number,
//   timestamp: number,
//   proximity: number,
// };
export interface LocationSchema {
  _id: number,
  name: string,
  longitude: number,
  latitude: number,
  onset: string,
  date_visited: string,
  proximity: number,
};