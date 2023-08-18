import Icon from "../Icon/Icon";

export default function CustomSelect() {
  return (
    <div className="bg-slate700 relative py-2.5 px-3 rounded-lg">
      <button className="flex items-center gap-2">
        <div className="bg-slate800 p-1 rounded-full">
          <Icon iconVariant="dollar" className="text-green200 text-xs" />
        </div>
        USD
        <Icon className="text-green200" iconVariant="chevDown" />
      </button>

      <div className="bg-slate700 absolute w-full right-0 rounded-lg top-12">
        <ul className="text-center">
          <li>
            <button>USD</button>
          </li>
          <li>
            <button>CAD</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
