import React from "react";

export default function Tag({ label }: { label: string }) {
  return <div className="tag">#{label}</div>;
}
