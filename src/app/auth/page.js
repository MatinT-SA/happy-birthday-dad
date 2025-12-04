"use client";

import { useState } from "react";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "arash") {
      document.cookie = "secret=arash; path=/; max-age=31536000";
      window.location.href = "/real";
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Enter Password</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="password"
          placeholder="Password…"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
        <button type="submit" style={{ padding: "8px" }}>
          Enter
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
