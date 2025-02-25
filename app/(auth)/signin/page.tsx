import { FC } from "react"
import Image from "next/image"

import Logo from "@/components/Assets/Logo.png"
import GoogleAuthForm from "@/components/PageAuth/GoogleAuthForm"

const page: FC = () => {
  return (
    <section className="container flex flex-col items-center min-h-screen py-10 gap-10">
      <div className="md:mt-16 w-full md:w-4/12 flex flex-col gap-10 items-center justify-center bg-background">
        <Image src={Logo} alt="kaleidoskye powder cannons south africa" className="w-72"/>
      <GoogleAuthForm />
      <h1>Signin with Google</h1>
      </div>
    </section>
  )
}

export default page
