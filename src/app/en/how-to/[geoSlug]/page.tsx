import { notFound } from "next/navigation";
import {
  GeoGuidePage,
  createGeoMetadata,
  englishGeoGuides,
} from "../../../geo-guides";

type Props = {
  params: Promise<{ geoSlug: string }>;
};

export function generateStaticParams() {
  return Object.keys(englishGeoGuides).map((geoSlug) => ({ geoSlug }));
}

export async function generateMetadata({ params }: Props) {
  const { geoSlug } = await params;
  const guide = englishGeoGuides[geoSlug];
  if (!guide) return {};
  return createGeoMetadata(guide);
}

export default async function EnglishGeoGuidePage({ params }: Props) {
  const { geoSlug } = await params;
  const guide = englishGeoGuides[geoSlug];
  if (!guide) notFound();
  return <GeoGuidePage guide={guide} />;
}
