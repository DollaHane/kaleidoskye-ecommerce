import Link from "next/link"
import { Cog } from "lucide-react"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "./ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-5">
            <Link href="/">
              <div className="rounded-lg border border-muted p-2 shadow-md hover:bg-muted">
                Dashboard
              </div>
            </Link>
            <Link href="/assets">
              <div className="rounded-lg border border-muted p-2 shadow-md hover:bg-muted">
                Assets
              </div>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Cog className="flex w-full" />
              </Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
