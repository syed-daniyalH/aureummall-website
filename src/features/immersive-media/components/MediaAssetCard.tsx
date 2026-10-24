import type { ImmersiveMediaAsset } from '../data';

type MediaAssetCardProps = {
  asset: ImmersiveMediaAsset;
  onOpen: () => void;
};

export function MediaAssetCard({ asset, onOpen }: MediaAssetCardProps) {
  return (
    <article className="mediaAssetCard">
      <button className="mediaAssetButton" type="button" onClick={onOpen}>
        <span className="mediaAssetVisual" aria-hidden="true">
          <span>{asset.kind === 'floor-plan' ? 'Plan' : 'Image'}</span>
          <strong>Open project media</strong>
        </span>
        <span className="mediaAssetBody">
          <span className="eyebrow">{asset.label}</span>
          <strong>{asset.title}</strong>
          <span>{asset.description}</span>
        </span>
      </button>
      <p className="mediaAssetCaption">{asset.caption}</p>
    </article>
  );
}
