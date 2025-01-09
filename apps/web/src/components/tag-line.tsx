interface TagLineProps {
  children: React.ReactNode;
}

export default function TagLine({ children }: TagLineProps) {
  return (
    <div
      className="group relative w-max flex rounded-full px-4 py-1.5 mb-4.5 text-xs font-semibold items-center
      transition border border-gray-800 text-gray-300 hover:cursor-pointer hover:bg-gray-900"
    >
      <span
        className="absolute -top-px left-[2.5rem] h-px w-[calc(100%-5rem)] bg-gradient-to-r from-red-600/0 
        via-red-600/80 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <span
        className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-[60px] bg-gradient-to-r from-red-300/0 
            via-red-300/50 to-red-300/0 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"
      />
      {children}
    </div>
  );
}
