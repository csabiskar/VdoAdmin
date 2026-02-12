export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-green-600 mb-10">
          Vale Naturals
        </h1>

        <p className="text-gray-400 mb-3 text-sm">Product</p>

        <nav className="space-y-3">
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Products
          </div>
          <div className="text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg">
            Categories
          </div>
          <div className="text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg">
            Deals
          </div>
          <div className="text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg">
            Blogs
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-3 mt-10">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <span className="text-sm font-medium">Abiskar</span>
      </div>
    </aside>
  );
}
