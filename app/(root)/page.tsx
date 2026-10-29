import LandingPage from "@/components/homepage/LandingPage";
import { cms } from "@/lib/cms";
export const dynamic = "force-dynamic";
export default async function Page() {
  const services = await (await cms()).find({ collection: 'services', overrideAccess: false, depth: 0, limit: 100, sort: 'sortOrder' });
  return <LandingPage services={services.docs.map(s => ({ id: s.id, iconId: s.legacyId || 1, slug: s.slug, name: s.name, description: s.description, img: '', imageDesc: s.name }))} />;
}
