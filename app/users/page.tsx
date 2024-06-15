import MockApi from "@/utils/mockapi";

export default async function Users() {
  const users = await MockApi.getUsers();

  return (
  <div className="h-screen mx-32">
    {/* INSERT FILE TABLE WITH USERS */}
  </div>
  );
}
