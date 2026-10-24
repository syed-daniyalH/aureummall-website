export function PageLoading({ label = 'Loading Aureum' }: { label?: string }) {
  return (
    <section className="pageLoading" aria-busy="true" aria-live="polite">
      <div className="container pageLoadingInner">
        <span className="loadingBrand">AUREUM</span>
        <span className="srOnly">{label}</span>
        <div className="loadingLine loadingLineShort" />
        <div className="loadingLine loadingLineLong" />
        <div className="loadingPanel" />
      </div>
    </section>
  );
}
