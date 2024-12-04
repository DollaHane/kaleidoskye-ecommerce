
import React from 'react'

interface PageProps {
  params: {
    buildingId: string
  }
}

export default async function BuildingAssets({params}: PageProps) {
  const param = params
  const decodedParam = decodeURIComponent(param.buildingId)

  return (
    <div>{decodedParam}</div>
  )
}
