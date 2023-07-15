import React from "react";
import Console from "@/comp/sw/app/Console";


export default function NotFound() {

  return (
    <Console error={["    Page not found.", "    This page isn't implemented yet,", "    or it will never be implemented"]} errorCode={404} />
  );
}
