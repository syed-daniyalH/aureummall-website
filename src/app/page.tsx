import { Hero } from '@/components/Hero';
import { getNewsCards } from '@/features/news/posts';
import { WordPressHomeExperience } from '@/features/wordpress-conversion/components/WordPressHomeExperience';

export default function HomePage() {
  return <><Hero /><WordPressHomeExperience latestNews={getNewsCards(3)} /></>;
}
