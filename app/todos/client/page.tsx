"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [todos, setTodos] = useState<any[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.log("CLIENT TODO - NOT AUTHENTICATED");
        return router.push("/login"); // go to login page
      }
      console.log("Client UUID", user?.id);
      // const { data } = await supabase.from("todos").select();
      const { data: todos } = await supabase
        .from("todos")
        .select()
        .eq("author", user?.id);
      console.log("After", todos);
      setLoading(false);
      setUser(user);
      setTodos(todos);
    };
    getData();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {" "}
            <h1>Client </h1>
            <pre>{JSON.stringify(todos, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}
