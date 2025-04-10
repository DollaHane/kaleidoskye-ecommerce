export type Cannon = {
  id: string
  heading: string
  priceAd: number
  priceCart: number
}

const shipping = 150

// These values have global effects:
export const products = [
  {
    id: "24INCH",
    heading: `24" Cannon`,
    priceAd: 150,
    priceCart: 100,
    priceShipping: shipping
  },
  {
    id: "32INCH",
    heading: `32" Cannon`,
    priceAd: 200,
    priceCart: 150,
    priceShipping: shipping
  },
]

export const contents = [
  {
    category: "Powders",
    colours: [
      "White",
      "Red",
      "Orange",
      "Mustard",
      "Yellow",
      "Green",
      "Blue",
      "Lilac",
      "Purple",
      "Pink",
      "Baby Pink",
    ],
    priceCart: 50,
  },
  {
    category: "Confetties",
    colours: [
      "Gold",
      "White",
      "Red",
      "Orange",
      "Lime",
      "Green",
      "Blue",
      "Dark Blue",
      "Purple",
      "Pink",
    ],
    priceCart: 50,
  },
]
