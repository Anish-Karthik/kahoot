"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "Please enter your username" }),
});

const UsernameForm = ({ href }: { href?: string }) => {
  const [username, setUsername] = React.useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (
      !formSchema.parse({
        username,
      })
    ) {
      e.preventDefault();
    } else {
      const route = href + `&username=${username}`;
      console.log(route);
      e.preventDefault();
      router.push(route);
    }
  };
  return (
    <form
      className="flex flex-col gap-4 p-4 bg-white rounded-sm w-72 scale-110"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-center font-bold w-full rounded-sm"
      />
      <Button className="text-center font-bold bg-black/90 w-full rounded-sm">
        Join
      </Button>
    </form>
  );
};

export default UsernameForm;
