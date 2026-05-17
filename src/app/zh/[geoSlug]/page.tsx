import { notFound } from "next/navigation";
import {
  GeoGuidePage,
  chineseGeoGuides,
  createGeoMetadata,
} from "../../geo-guides";

type Props = {
  params: Promise<{ geoSlug: string }>;
};

export function generateStaticParams() {
  return Object.keys(chineseGeoGuides).map((geoSlug) => ({ geoSlug }));
}

export async function generateMetadata({ params }: Props) {
  const { geoSlug } = await params;
  const guide = chineseGeoGuides[geoSlug];
  if (!guide) return {};
  return createGeoMetadata(guide);
}

export default async function ChineseGeoGuidePage({ params }: Props) {
  const { geoSlug } = await params;
  const guide = chineseGeoGuides[geoSlug];
  if (!guide) notFound();
  return <GeoGuidePage guide={guide} />;
}
