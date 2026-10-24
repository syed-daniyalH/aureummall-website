import { ImmersiveMediaExperience } from '@/features/immersive-media/components/ImmersiveMediaExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';

export const metadata = createRouteMetadata('/immersive-media');

export default function ImmersiveMediaPage() {
  return <ImmersiveMediaExperience />;
}
