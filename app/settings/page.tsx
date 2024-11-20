import React from "react"
import CreateUserForm from "@/components/PageSettings/CreateUserForm"
import UserList from "@/components/PageSettings/UserList"

export default function Settings() {

  return (
    <section className="container items-center min-h-screen py-5 md:py-10">
      <h1 className="p-10 text-2xl font-semibold">Settings</h1>
      <hr></hr>
      <UserList/>
      <hr></hr>
      <CreateUserForm/>
      <hr></hr>
    </section>
  )
}
