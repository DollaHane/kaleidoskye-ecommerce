import { FC } from "react"
import Image from "next/image"

import Logo from "@/components/Assets/Logo.png"
import GoogleAuthForm from "@/components/PageAuth/GoogleAuthForm"

const page: FC = () => {
  return (
    <section className="container flex min-h-screen flex-col items-center gap-10 py-10">
      <div className="flex w-full flex-col items-center justify-center gap-10 bg-background md:mt-16 md:w-4/12">
        <Image
          src={Logo}
          alt="kaleidoskye powder cannons south africa"
          className="w-72"
        />
        <GoogleAuthForm />
        <h1>Signin with Google</h1>
      </div>
    </section>
  )
}

export default page
