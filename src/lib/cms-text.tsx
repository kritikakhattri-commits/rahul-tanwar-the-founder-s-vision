export function HighlightedText({
  text,
  highlight,
  className,
}: {
  text: string;
  highlight: string;
  className: string;
}) {
  if (!highlight || !text.includes(highlight)) {
    return <>{text}</>;
  }

  const [before, after] = text.split(highlight);

  return (
    <>
      {before}
      <em className={className}>{highlight}</em>
      {after}
    </>
  );
}
