import Link from "next/link"
import { db } from "@/server/db"
import { assets, buildings } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth/auth-options"
import { users } from "@/server/db/schema"

import { assetType, buildingType, taskType } from "@/types/db"

export default async function AssetsPage() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  const user = await db
    .select({ firstSignin: users.firstSignin })
    .from(users)
    .where(eq(users.emailVerified, session.user.email!))
    
    if (user[0].firstSignin === true) {
      redirect("/password-update")
    }

  const data = await db
    .select({
      building: buildings,
      assets: assets,
    })
    .from(buildings)
    .leftJoin(assets, eq(buildings.id, assets.location))

  const result = data.reduce<
    Record<number, { building: buildingType; assets: assetType[] }>
  >((acc, row) => {
    const building: any = row.building
    const asset = row.assets

    if (!acc[building.id]) {
      acc[building.id] = { building, assets: [] }
    }

    if (asset) {
      acc[building.id].assets.push(asset)
    }

    return acc
  }, {})

  return (
    <section className="container items-center min-h-screen py-5 md:py-10">
      <h1 className="p-5">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {Object.values(result).map(({ building }) => (
          <Link key={building.name} href={`/building/${building.id}`} className="w-full p-5 transition duration-100 hover:scale-[0.99]">
            <div className="bg-muted h-20 rounded-lg shadow-md p-2">
            <h2 key={building.id} className="w-full text-lg font-bold">{building.id}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
