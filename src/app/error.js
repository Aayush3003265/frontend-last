"use client";

function RootError({ error }) {
  return <div>{error.message}</div>;
}

export default RootError;
