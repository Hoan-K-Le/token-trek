import Icon from "../Icon/Icon";

export default function CustomSelect() {
  return (
    <div className=" relative py-2.5 px-3 rounded-lg">
      <button className="flex items-center gap-2">
        <div className=" p-1 rounded-full">
          <Icon iconVariant="dollar" className=" text-xs" />
        </div>
        USD
        <Icon iconVariant="chevDown" />
      </button>

      <div className=" absolute w-full right-0 rounded-lg top-12">
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
