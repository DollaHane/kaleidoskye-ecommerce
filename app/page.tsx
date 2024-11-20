import Link from "next/link"
import { db } from "@/server/db"
import { assets, buildings, tasks } from "@/server/db/schema"
import { eq } from "drizzle-orm"

import { assetType, buildingType, taskType } from "@/types/db"

export default async function AssetsPage() {
  const data = await db
    .select({
      building: buildings,
      assets: assets,
      tasks: tasks
    })
    .from(buildings)
    .leftJoin(assets, eq(buildings.id, assets.location))
    .leftJoin(tasks, eq(assets.id, tasks.assetId))

  const result = data.reduce<
    Record<number, { building: buildingType; assets: assetType[]; tasks: taskType[] }>
  >((acc, row) => {
    const building: any = row.building
    const asset = row.assets
    const task = row.tasks

    if (!acc[building.id]) {
      acc[building.id] = { building, assets: [], tasks: [] }
    }

    if (asset) {
      acc[building.id].assets.push(asset)
    }

    if (task) {
      acc[building.id].tasks.push(task)
    }

    return acc
  }, {})

  return (
    <section className="container items-center min-h-screen py-5 md:py-10">
      <h1 className="p-5">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {Object.values(result).map(({ building, assets }) => (
          <Link key={building.name} href={`/building/${building.id}`} className="w-full p-5 transition duration-100 hover:scale-[0.99]">
            <div className="bg-muted h-40 rounded-lg shadow-md p-2">
            <h2 key={building.id} className="w-full text-lg font-bold">{building.id}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// get all buildings w/ asset status & #
// add button for scanning
