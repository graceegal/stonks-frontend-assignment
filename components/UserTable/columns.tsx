"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
  createdAt: string;
  username: string;
  avatar: string;
  active: boolean;
  fullName: string;
  id: string;
};

// only including username, full name and active status - can add in columns for avatar, id, etc here if need be
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "active",
    header: "Active",
  },
];
