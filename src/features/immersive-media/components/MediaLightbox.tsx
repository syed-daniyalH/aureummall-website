'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { ImmersiveMediaAsset } from '../data';

type MediaLightboxProps = {
  asset: ImmersiveMediaAsset;
  onClose: () => void;
};

function MediaSurface({ asset }: { asset: ImmersiveMediaAsset }) {
  if (asset.src) {
    return <Image className="mediaLightboxImage" src={asset.src} alt={asset.alt} width={asset.width ?? 1600} height={asset.height ?? 1000} priority />;
  }

  return <div className="mediaSurfaceFallback"><span>Project media</span><strong>The selected project media is not available in this format.</strong></div>;
}

export function MediaLightbox({ asset, onClose }: MediaLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="mediaLightbox" role="dialog" aria-modal="true" aria-labelledby="media-lightbox-title" onClick={onClose}>
      <div className="mediaLightboxPanel" onClick={(event) => event.stopPropagation()}>
        <div className="mediaLightboxHeader">
          <div>
            <span className="eyebrow">{asset.label}</span>
            <h2 id="media-lightbox-title">{asset.title}</h2>
          </div>
          <button className="mediaCloseButton" type="button" onClick={onClose} ref={closeButtonRef} aria-label="Close media viewer">Close</button>
        </div>
        <div className="mediaLightboxSurface"><MediaSurface asset={asset} /></div>
        <p className="mediaLightboxCaption">{asset.caption}</p>
      </div>
    </div>
  );
}
