import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ServerTodos() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("SERVER TODO - NOT AUTHENTICATED");
    return redirect("/login");
  }
  const todos = await prisma.todos.findMany({
    // where: { author: user.id },
    //re: { user.id },
    // include: { author: true },
  });
  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1>
            {todo.title} {todo.author} {user.id}
          </h1>
        </div>
      ))}
    </>
  );
}
