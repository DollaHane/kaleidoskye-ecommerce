import { db } from "@/server/db"
import { assets } from "@/server/db/schema"
import { assetType } from "@/types/db"
import { assetColumns } from "@/components/PageTable/AssetsColumns"
import { DataTable } from "@/components/PageTable/AssetsTable"



export default async function AssetsPage() {

  const data: assetType[] = await db.select().from(assets);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="container mx-auto py-10">
        <DataTable columns={assetColumns} data={data} />
      </div>
    </section>
  )
}


// Data asset table needs additional data