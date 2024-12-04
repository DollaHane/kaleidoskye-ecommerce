import { FC } from "react"
import SignIn from "@/components/PageAuth/SignIn"
import Image from "next/image"
import Logo from "@/components/Assets/Logo"

const page: FC = () => {
  return (
    <section className="container flex flex-col items-center min-h-screen py-10 gap-10">
      <div className="md:mt-16 w-full md:w-4/12 flex-col items-center justify-center bg-background">
        <Logo/>
      </div>
      <SignIn />
    </section>
  )
}

export default page
