import MockApi from "@/lib/mockapi";
import { User, columns } from "@/components/UserTable/columns";
import { DataTable } from "@/components/UserTable/data-table";
import Head from "next/head";
import Chat from "@/components/Chat/chat";

// Note: would use UseRouter here to implement saving state of user filters in query params

export default async function Home() {
  const users: User[] = await MockApi.getUsers();

  return (
    <div>
      <Head>
        <title>Chat with your friends!</title>
      </Head>
      <main className="min-h-screen grid grid-cols-3 gap-8 mx-auto">
        <div className="data-table h-screen overflow-y-auto container col-span-2">
          <DataTable columns={columns} data={users} />
        </div>
        <div className="chat col-span-1 container h-screen flex flex-col">
          <Chat />
        </div>
      </main>
    </div>
  );
}
