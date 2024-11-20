import { db } from "@/server/db"
import { assets } from "@/server/db/schema"
import { assetPlaceholder } from "@/lib/rhenus-data/assets"
import { assetType } from "@/types/db"
import { assetColumns } from "@/components/PageAssetsTable/AssetsColumns"
import { DataTable } from "@/components/PageAssetsTable/AssetsTable"



export default async function AssetsPage() {

  const assetData: assetType = await db.select().from(assets);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="container mx-auto py-10">
        <DataTable columns={assetColumns} data={assetData} />
      </div>
    </section>
  )
}


// Data asset table needs additional data