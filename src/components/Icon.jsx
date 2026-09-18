export default function Icon({ path, color = 'currentColor', size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}
