import React, { useState } from 'react';
import { Upload, X, Plus, Calendar, Package, Tag, DollarSign, Image as ImageIcon, Save, Eye } from 'lucide-react';

export default function ProductManager() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    detailedDescription: '',
    price: '',
    discountPercent: '',
    category: '',
    weight: '',
    stockQuantity: '',
    sku: '',
    expirationStart: '',
    expirationEnd: '',
    images: [
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop'
    ]
  });

  const [activeImage, setActiveImage] = useState(0);

  const calculateDiscountedPrice = () => {
    if (productData.price && productData.discountPercent) {
      const price = parseFloat(productData.price);
      const discount = parseFloat(productData.discountPercent);
      return (price - (price * discount / 100)).toFixed(2);
    }
    return '0.00';
  };

  const handleInputChange = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const removeImage = (index) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    if (activeImage >= productData.images.length - 1) {
      setActiveImage(Math.max(0, productData.images.length - 2));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Via Naturals</h1>
              <p className="text-xs text-slate-500">Product Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all duration-200 flex items-center gap-2 border border-emerald-200/50">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-emerald-500/25">
              <Save className="w-4 h-4" />
              Publish Product
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex max-w-7xl mx-auto">
        <aside className="w-56 bg-white/60 backdrop-blur-sm min-h-screen border-r border-slate-200/60 p-4">
          <nav className="space-y-1.5">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Product
            </div>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg shadow-md shadow-emerald-500/20">
              <Package className="w-4 h-4" />
              Products
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100/80 rounded-lg transition-colors">
              <Tag className="w-4 h-4" />
              Categories
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100/80 rounded-lg transition-colors">
              <DollarSign className="w-4 h-4" />
              Deals
            </button>
          </nav>
          
          <div className="mt-8 px-3 py-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abishkar" 
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Abishkar</p>
                <p className="text-xs text-slate-600">Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Add Product</h2>
            <p className="text-slate-600 mt-1">Create and publish your product listing</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Details & Pricing */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-transparent border-b border-slate-200/60">
                  <h3 className="text-lg font-semibold text-slate-900">Basic Details</h3>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      value={productData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product Description
                    </label>
                    <textarea
                      placeholder="Enter product description"
                      rows="3"
                      value={productData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all resize-none bg-white text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Detailed Description
                    </label>
                    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white">
                      <div className="flex items-center gap-1 px-3 py-2 bg-slate-50 border-b border-slate-200">
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 text-sm font-medium">B</button>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 text-sm italic">I</button>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 text-sm underline">U</button>
                        <div className="w-px h-4 bg-slate-300 mx-1" />
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600">•</button>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600">1.</button>
                      </div>
                      <textarea
                        placeholder="Enter detailed product description"
                        rows="4"
                        value={productData.detailedDescription}
                        onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
                        className="w-full px-4 py-3 outline-none resize-none text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-transparent border-b border-slate-200/60">
                  <h3 className="text-lg font-semibold text-slate-900">Pricing</h3>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
                      <input
                        type="number"
                        placeholder="1000.00"
                        value={productData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="w-full pl-10 pr-24 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <img src="https://flagcdn.com/w40/in.png" alt="INR" className="w-5 h-4 rounded" />
                        <span className="text-xs text-slate-500">INR</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Discounted Price <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="20"
                        value={productData.discountPercent}
                        onChange={(e) => handleInputChange('discountPercent', e.target.value)}
                        className="w-32 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400"
                      />
                      <div className="flex-1 flex items-center justify-between px-5 py-3 bg-emerald-50 rounded-xl border border-emerald-200/60">
                        <span className="text-sm font-medium text-slate-700">Sale Price</span>
                        <span className="text-lg font-bold text-emerald-700">₹{calculateDiscountedPrice()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-transparent border-b border-slate-200/60">
                  <h3 className="text-lg font-semibold text-slate-900">Inventory</h3>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="Enter stock quantity"
                        value={productData.stockQuantity}
                        onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        placeholder="Enter SKU"
                        value={productData.sku}
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Images & Details */}
            <div className="space-y-6">
              {/* Upload Product Image */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-transparent border-b border-slate-200/60">
                  <h3 className="text-lg font-semibold text-slate-900">Product Images</h3>
                </div>
                <div className="p-6">
                  {/* Main Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl overflow-hidden mb-4 group border border-slate-200/60">
                    <img 
                      src={productData.images[activeImage]} 
                      alt="Product" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex-1 px-4 py-2 bg-white/90 backdrop-blur-sm text-sm font-medium text-slate-900 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4" />
                        Replace
                      </button>
                      <button className="px-4 py-2 bg-white/90 backdrop-blur-sm text-sm font-medium text-slate-900 rounded-lg hover:bg-white transition-colors">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {productData.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all group ${
                          activeImage === idx 
                            ? 'border-emerald-500 ring-2 ring-emerald-200' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(idx);
                          }}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </button>
                    ))}
                    
                    {/* Add Image Button */}
                    <button className="aspect-square border-2 border-dashed border-slate-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50/50 transition-all flex items-center justify-center group">
                      <Plus className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-transparent border-b border-slate-200/60">
                  <h3 className="text-lg font-semibold text-slate-900">Categories</h3>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product Category
                    </label>
                    <select
                      value={productData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all bg-white text-slate-900"
                    >
                      <option value="">Select category</option>
                      <option value="snacks">Snacks</option>
                      <option value="beverages">Beverages</option>
                      <option value="organic">Organic Products</option>
                      <option value="health">Health Foods</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product Weight
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 750gm"
                      value={productData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Expiration */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-transparent border-b border-slate-200/60">
                  <h3 className="text-lg font-semibold text-slate-900">Expiration</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={productData.expirationStart}
                        onChange={(e) => handleInputChange('expirationStart', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all bg-white text-slate-900"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={productData.expirationEnd}
                        onChange={(e) => handleInputChange('expirationEnd', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all bg-white text-slate-900"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}