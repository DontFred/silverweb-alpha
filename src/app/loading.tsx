"use client"

import { Loading } from "@nextui-org/react"

export default function LoadingComponent() {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading size="xl" css={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -80%)"
      }}/>
    </div>
  )
}

