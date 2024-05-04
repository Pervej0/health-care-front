import { removeUser } from "@/services/auth.services";

const logOutUser = (router: any) => {
  removeUser();
  router.push("/");
  router.refresh();
};

export default logOutUser;
