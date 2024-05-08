"use client";

import { useEffect } from "react";
import Background from "@/components/Background";
import Main from "@/app/components/Main";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function Home() {

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready && window !== undefined) {
      setReady(true);
    }
  }, [ready]);

  return (

    <Background image="bg_game.jpg">
      <Loading>LOADING</Loading>
      {ready && <Main />}
    </Background>

  );
}

