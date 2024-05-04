import { jwtDecode } from "jwt-decode";

const decodedToken = (token: string) => {
  const user = jwtDecode(token as string);
  return user;
};
export default decodedToken;
