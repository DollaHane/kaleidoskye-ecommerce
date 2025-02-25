import { Icons } from "../icons"

interface FeatureCardsIconsProps {
  icon: string
}
export default function FeatureCardsIcons({ icon }: FeatureCardsIconsProps) {
  switch (icon) {
    case "brush":
      return <Icons.brush />;
    case "sparkle":
      return <Icons.sparkle />;
    case "combine":
      return <Icons.combine />;
    case "cornerRightUp":
      return <Icons.cornerRightUp />;
    case "sprout":
      return <Icons.sprout />;
    default:
      return <Icons.sparkle />;
  }
}
