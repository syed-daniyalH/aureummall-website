import Image from 'next/image';

type BrandMarkProps = {
  tone?: 'dark' | 'light';
};

export function BrandMark({ tone = 'dark' }: BrandMarkProps) {
  return (
    <span className={`brandMark brandMark-${tone}`} aria-hidden="true">
      <Image src={tone === 'light' ? '/assets/aureum/logo-2.png' : '/assets/aureum/logo-1.png'} alt="" width={128} height={128} priority />
    </span>
  );
}
