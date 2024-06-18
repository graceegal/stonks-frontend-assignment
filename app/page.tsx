import MockApi from "@/lib/mockapi";
import { User, columns } from "@/components/UserTable/columns";
import { DataTable } from "@/components/UserTable/data-table";
import Head from "next/head";

export default async function Home() {
  const users: User[] = await MockApi.getUsers();

  return (
    <div>
      <Head>
        <title>Chat with your friends!</title>
      </Head>
      <main className="min-h-screen grid grid-cols-3 gap-8 items-center justify-between mx-auto">
        <div className="data-table h-screen container col-span-2">
          <DataTable columns={columns} data={users} />
        </div>
        <div className="chat col-span-1"></div>
      </main>
    </div>
  );
}
