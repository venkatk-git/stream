import TabsMenu from './tabs-menu';

interface DetailsProps {
  title: string;
}

export default function Details({ title }: DetailsProps) {
  return (
    <section className="h-full flex flex-col w-full border border-gray-800 rounded-lg bg-gray-900">
      <div className="min-h-36 max-h-52 p-3 border-b border-gray-800 text-gray-300">
        <p className="line-clamp-3 text-sm font-medium">{title}</p>
      </div>
      <div className="flex-1 h-0 overflow-hidden">
        <TabsMenu />
      </div>
    </section>
  );
}
