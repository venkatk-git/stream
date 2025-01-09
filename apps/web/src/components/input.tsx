interface InputProps {
  placeholder: string;
}

export function Input({ placeholder = '' }: InputProps) {
  return (
    <input
      className="w-full border rounded-lg h-12 focus:outline-none px-3 font-normal bg-black-300 text-gray-200 border-gray-800 placeholder-gray-500"
      placeholder={placeholder}
    />
  );
}
