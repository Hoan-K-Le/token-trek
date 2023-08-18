import Icon from "../Icon/Icon";

export default function Theme() {
  return (
    <button className="bg-slate700 p-4 rounded-lg">
      {/* Set conditional for icon switch */}
      <Icon iconVariant="sun" />
    </button>
  );
}
