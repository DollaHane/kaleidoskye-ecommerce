import React from "react"
import Link from "next/link"
import { currentYear } from "../lib/utils"
import { siteConfig } from "@/config/site"

export default function Footer() {
  return (
    <footer className=" z-50 h-auto w-full bg-gradient-to-br from-grOne via-grTwo to-grThr p-5">
      <div className="mb-2 flex h-full w-full flex-col justify-between gap-2 text-sm md:flex-row">
        <div className="flex h-full w-full flex-col items-end justify-end gap-2">
          <a
            className="flex w-full justify-center text-center"
            href={`mailto:${siteConfig.supportEmail}?subject=Hello!`}
          >
            {`${siteConfig.supportEmail}`}
          </a>
        </div>

        <div className="flex h-full w-full flex-col items-end justify-end gap-2">
          <Link
            href="/termsofservice"
            className="flex w-full justify-center text-center"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacypolicy"
            className="flex w-full justify-center text-center"
          >
            Privacy Policy
          </Link>
          <Link
            href="/disclaimer"
            className="flex w-full justify-center text-center"
          >
            Disclaimer
          </Link>
        </div>
      </div>

      <p className="my-auto h-auto w-full justify-center text-center text-xs">
        <span>Copyright © {currentYear} - Developed by </span>
        <a href="https://www.buildsoftware.co.za" target="_blank" rel="noreferrer">
          BuildSoftware.co.za
        </a>{" "}
        | All rights reserved
      </p>
    </footer>
  )
}
