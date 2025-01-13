import TabsMenu from './tabs-menu';

export default function Details() {
  return (
    <section className="h-full lg:max-w-96 w-full border border-gray-800 rounded-lg bg-gray-900 overflow-hidden">
      <div className="min-h-36 max-h-52 p-3 border-b border-gray-800 text-gray-300">
        <span className="">You are watching</span>
      </div>
      <div className="p-3">
        <TabsMenu />
      </div>
    </section>
  );
}
