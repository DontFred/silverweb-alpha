"use client";

import { trpc } from "@/lib/trpcProvider";
import { faker } from "@faker-js/faker";
import React from "react";

export default function ListUsers() {
  let { data: users, isLoading, isFetching } = trpc.getUsers.useQuery();

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 20,
      }}
    >
      {users?.map((user) => (
        <div
          key={user.id}
          style={{ border: "1px solid #ccc", textAlign: "center" }}
        >
    <img
    src={faker.internet.avatar()}
      width={500}
      height={500}
      alt={user.name}
    />
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
}
