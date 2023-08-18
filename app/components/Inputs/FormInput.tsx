type FormInputProps = {
  label: string;
} & React.ComponentProps<"input">;

export default function FormInput({
  label,
  id,
  type,
  name,
  placeholder,
  onChange,
}: FormInputProps) {
  return (
    <>
      <label className="hidden" htmlFor={id}>
        {label}
      </label>
      <input
        className="bg-slate700 placeholder:text-white100  py-3 px-10 rounded-lg"
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}
