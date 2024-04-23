import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("SERVER TODO - NOT AUTHENTICATED");
    return redirect("/login");
  }

  console.log("Server UUID", user?.id);
  const { data: todos } = await supabase
    .from("todos")
    .select()
    .eq("author", user?.id);
  console.log("After", todos);
  return (
    <>
      <div>
        <h1>--- Server ---</h1>
        <pre>{JSON.stringify(todos, null, 2)}</pre>
      </div>
    </>
  );
}
