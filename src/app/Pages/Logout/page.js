"use client";
import AdminNavComponent from "@/AdminComponents/AdminNavbarComponent";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const navigate = useRouter();
  const Logout = () => {
    localStorage.removeItem("userData");
    navigate.push("/Pages/Admin");
  };
  return (
    <div>
      <AdminNavComponent />
      <button
        onClick={() => {
          Logout();
        }}>
        Logout
      </button>
    </div>
  );
}
