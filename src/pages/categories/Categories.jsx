import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import { CiSearch } from "react-icons/ci";
import { IoMdImage } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
import { CiCircleRemove } from "react-icons/ci";
import Img from "../../assets/product.png";
import ModalCard from "../../components/ui/modelcard";
import editIcon from "../../assets/Dashboradicons/edit.svg";
import deleteIcon from "../../assets/Dashboradicons/delete.svg";
import {
  getCategory,
  getProductsForCategory,
  editCategory,
  addCategory,
  uploadCategoryImage,
} from "../../api/category.api";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import toast, { Toaster } from "react-hot-toast";

// ── Image compressor (same as product) ───────────────────────────────────────
const compressImage = (file) =>
  new Promise((resolve) => {
    const MAX_SIZE = 1024;
    const QUALITY = 0.8;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width > height) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) =>
            resolve(
              new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              }),
            ),
          "image/jpeg",
          QUALITY,
        );
      };
    };
  });

// ── Reusable category image uploader ─────────────────────────────────────────
function CategoryImageUploader({ imageUrl, setImageUrl }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const compressed = await compressImage(file);
      const res = await uploadCategoryImage(compressed);
      if (res?.url) {
        setImageUrl(res.url);
      } else {
        setUploadError("Upload failed. Please try again.");
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleReplace = () => {
    setImageUrl("");
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        fileInputRef.current.click();
      }
    }, 0);
  };

  return (
    <div className="space-y-3">
      <label className="text-[14px] text-[#023337] font-medium">
        Category Image
      </label>

      {/* Preview box */}
      <div className="border rounded-lg border-[#E5E7EB] h-44 flex items-center justify-center text-gray-400 bg-[#F9FAFB] overflow-hidden">
        {uploading ? (
          <span className="text-sm animate-pulse text-gray-400">
            Uploading...
          </span>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="category"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <IoMdImage size={36} />
            <span className="text-xs">No image selected</span>
          </div>
        )}
      </div>

      {uploadError && <p className="text-red-500 text-xs">{uploadError}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
          className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-3 flex gap-1.5 items-center cursor-pointer disabled:opacity-50 hover:bg-gray-50 transition"
        >
          <IoMdImage size={16} /> Browse
        </button>

        {imageUrl && (
          <>
            <button
              type="button"
              onClick={handleReplace}
              disabled={uploading}
              className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-3 flex gap-1.5 items-center cursor-pointer disabled:opacity-50 hover:bg-gray-50 transition"
            >
              <LuRefreshCw size={14} /> Replace
            </button>
            <button
              type="button"
              onClick={() => setImageUrl("")}
              disabled={uploading}
              className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-red-400 px-3 flex gap-1.5 items-center cursor-pointer disabled:opacity-50 hover:bg-red-50 transition"
            >
              <CiCircleRemove size={16} /> Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function Categories() {
  const { removeProduct, loading } = useProducts();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("");
  const [modalType, setModalType] = useState(null);

  // Add category
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");
  const [addCategorySaving, setAddCategorySaving] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState("");

  // Edit category
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState("");
  const [editCategorySaving, setEditCategorySaving] = useState(false);
  const [editCategoryError, setEditCategoryError] = useState("");

  // Delete product confirm
  const [productToDelete, setProductToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    handelAllCategory();
  }, []);
  useEffect(() => {
    handelAllProduct();
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    const active = category.find((c) => c._id === categoryId);
    if (active) setActiveCategory(active.categoryName);
  }, [categoryId, category]);

  // ── Modal openers ──────────────────────────────────────────────────────────
  const handleOpenAdd = () => {
    setNewCategoryName("");
    setNewCategoryImage("");
    setAddCategoryError("");
    setModalType("add");
  };

  const handleOpenEditCategory = () => {
    const active = category.find((c) => c.categoryName === activeCategory);
    if (!active) {
      toast.error("Please select a category to edit.");
      return;
    }
    setEditCategoryId(active._id);
    setEditCategoryName(active.categoryName);
    setEditCategoryImage(active.image || active.imageUrl || "");
    setEditCategoryError("");
    setModalType("editCategory");
  };

  const handleClose = () => {
    setModalType(null);
    setProductToDelete(null);
    setAddCategoryError("");
    setEditCategoryError("");
  };

  // ── Save: Add Category ─────────────────────────────────────────────────────
  const handleSaveAdd = async () => {
    if (!newCategoryName.trim()) {
      setAddCategoryError("Category name cannot be empty.");
      return;
    }
    setAddCategorySaving(true);
    setAddCategoryError("");
    try {
      const payload = { categoryName: newCategoryName.trim() };
      if (newCategoryImage) payload.image = newCategoryImage;

      const res = await addCategory(payload);
      const created = res?.category || res;
      if (created) setCategory((prev) => [...prev, created]);

      toast.success("Category added successfully");
      setModalType(null);
    } catch {
      setAddCategoryError("Failed to add category. Please try again.");
    } finally {
      setAddCategorySaving(false);
    }
  };

  // ── Save: Edit Category ────────────────────────────────────────────────────
  const handleSaveEditCategory = async () => {
    if (!editCategoryName.trim()) {
      setEditCategoryError("Category name cannot be empty.");
      return;
    }
    setEditCategorySaving(true);
    setEditCategoryError("");
    try {
      const payload = { categoryName: editCategoryName.trim() };
      if (editCategoryImage) payload.image = editCategoryImage;

      await editCategory(editCategoryId, payload);

      setCategory((prev) =>
        prev.map((c) =>
          c._id === editCategoryId
            ? {
                ...c,
                categoryName: editCategoryName.trim(),
                image: editCategoryImage,
              }
            : c,
        ),
      );

      const wasActive = category.find((c) => c._id === editCategoryId);
      if (wasActive?.categoryName === activeCategory) {
        setActiveCategory(editCategoryName.trim());
      }

      toast.success("Category updated successfully");
      setModalType(null);
    } catch {
      setEditCategoryError("Failed to update category. Please try again.");
    } finally {
      setEditCategorySaving(false);
    }
  };

  // ── Delete product ─────────────────────────────────────────────────────────
  const handleOpenDeleteConfirm = (product) => {
    setProductToDelete(product);
    setModalType("deleteConfirm");
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await removeProduct(productToDelete._id);
      setAllProduct((prev) =>
        prev.filter((p) => p._id !== productToDelete._id),
      );
      toast.success(`"${productToDelete.name}" deleted successfully`);
      setModalType(null);
      setProductToDelete(null);
    } catch {
      toast.error("Failed to delete product. Please try again.");
    }
  };

  // ── Data ───────────────────────────────────────────────────────────────────
  const filteredProducts = allProduct
    .filter((item) => (categoryId ? item.categoryId?._id === categoryId : true))
    .filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const handelAllCategory = async () => {
    try {
      const res = await getCategory();
      setCategory(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handelAllProduct = async () => {
    try {
      const res = await getProductsForCategory();
      setAllProduct(res.products);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductImage = (product) => {
    const images = product?.variants?.[0]?.images;
    if (images && images.length > 0) return images[0];
    return Img;
  };

  return (
    <>
      <Toaster />
      <div className="w-full min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
          <h1 className="text-[22px] font-semibold text-[#023337]">
            Categories
          </h1>
          <div className="flex gap-6">
            <Button variant="outline" onClick={handleOpenEditCategory}>
              Edit Category
            </Button>
            <Button onClick={handleOpenAdd}>Add New Category</Button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-5">
          {category.map((value, index) => (
            <div
              key={index}
              className="border rounded-sm border-black/20 w-62.5 h-12.5 text-[12px] flex gap-2 px-12 items-center cursor-pointer"
              onClick={() => {
                setActiveCategory(value.categoryName);
                setSearchParams({ categoryId: value._id });
              }}
            >
              <span
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  activeCategory === value.categoryName
                    ? "border-[#00B207]"
                    : "border-gray-300"
                }`}
              >
                {activeCategory === value.categoryName && (
                  <span className="w-3 h-3 bg-[#00B207] rounded-full" />
                )}
              </span>
              {value.categoryName}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#F9FAFB] rounded-md border border-gray-300 shadow-sm mb-16 mt-12">
          <div className="flex justify-end items-center h-24.5 pr-12 relative">
            <input
              type="text"
              placeholder="search your product"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-66 h-9 rounded-lg border px-2 border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00B207] transition placeholder:text-black placeholder:text-sm placeholder:font-light"
            />
            <CiSearch size={22} className="absolute right-14" />
          </div>

          <div className="overflow-x-auto">
            <table className="border-collapse w-full text-left">
              <thead className="bg-[#EAF8E7]">
                <tr>
                  <th className="px-4 sm:px-6 w-16 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    No
                  </th>
                  <th className="px-4 sm:px-6 w-60.75 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    Product
                  </th>
                  <th className="px-4 sm:px-6 w-60.75 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    Created Date
                  </th>
                  <th className="px-4 sm:px-6 w-60.75 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    Variants
                  </th>
                  <th className="px-4 sm:px-6 w-60.75 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td className="text-center py-12" colSpan="5">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((value, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-300 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap align-middle">
                        {index + 1}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap align-middle">
                        <div className="flex items-center gap-2">
                          <img
                            src={value?.variants[0]?.images[1]}
                            className="object-cover w-10 h-10 border rounded-sm border-[#E5E7EB] shrink-0"
                            alt=""
                          />
                          <span>{value.name}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap align-middle">
                        {new Date(value.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap align-middle">
                        {value.variants?.length ?? 0}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap align-middle">
                        <div className="flex items-center gap-3">
                          <img
                            src={editIcon}
                            className="cursor-pointer"
                            alt="edit"
                            onClick={() =>
                              navigate(`/products/edit/${value._id}`)
                            }
                          />
                          <img
                            src={deleteIcon}
                            className="cursor-pointer"
                            alt="delete"
                            onClick={() => handleOpenDeleteConfirm(value)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Add New Category Modal ── */}
      {modalType === "add" && (
        <ModalCard
          title="Add New Category"
          onCancel={handleClose}
          onSave={handleSaveAdd}
          cancelLabel="Cancel"
          saveLabel={addCategorySaving ? "Saving..." : "Save"}
        >
          <div className="space-y-5">
            {/* Image uploader */}
            <CategoryImageUploader
              imageUrl={newCategoryImage}
              setImageUrl={setNewCategoryImage}
            />

            {/* Name input */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
                Category name
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                  setAddCategoryError("");
                }}
                placeholder="Enter the new category name"
                className="w-full h-12 rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:border-[#00B207] transition"
              />
            </div>

            {addCategoryError && (
              <p className="text-red-500 text-xs">{addCategoryError}</p>
            )}
          </div>
        </ModalCard>
      )}

      {/* ── Edit Category Modal ── */}
      {modalType === "editCategory" && (
        <ModalCard
          title="Edit Category"
          onCancel={handleClose}
          onSave={handleSaveEditCategory}
          cancelLabel="Cancel"
          saveLabel={editCategorySaving ? "Saving..." : "Save"}
        >
          <div className="space-y-5">
            {/* Image uploader — pre-filled with existing image */}
            <CategoryImageUploader
              imageUrl={editCategoryImage}
              setImageUrl={setEditCategoryImage}
            />

            {/* Name input */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
                Category name
              </label>
              <input
                type="text"
                value={editCategoryName}
                onChange={(e) => {
                  setEditCategoryName(e.target.value);
                  setEditCategoryError("");
                }}
                placeholder="Enter the category name"
                className="w-full h-12 rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:border-[#00B207] transition"
              />
            </div>

            {editCategoryError && (
              <p className="text-red-500 text-xs">{editCategoryError}</p>
            )}
          </div>
        </ModalCard>
      )}

      {/* ── Delete Confirm Modal ── */}
      {modalType === "deleteConfirm" && productToDelete && (
        <ModalCard
          title="Delete Product"
          onCancel={handleClose}
          onSave={handleConfirmDelete}
          cancelLabel="Cancel"
          saveLabel={loading ? "Deleting..." : "Delete"}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-[#E5E7EB]">
              <img
                src={getProductImage(productToDelete)}
                className="w-12 h-12 object-cover rounded-sm border border-[#E5E7EB] shrink-0"
                alt=""
              />
              <div>
                <p className="text-sm font-medium text-[#023337]">
                  {productToDelete.name}
                </p>
                <p className="text-xs text-gray-400">
                  {productToDelete.variants?.length ?? 0} variant(s)
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#023337]">
                "{productToDelete.name}"
              </span>
              ? This action cannot be undone.
            </p>
          </div>
        </ModalCard>
      )}
    </>
  );
}

export default Categories;
