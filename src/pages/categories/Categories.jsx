import React, { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { CiSearch } from "react-icons/ci";
import Img from "../../assets/product.png";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import ModalCard from "../../components/ui/modelcard";
import EditCategoryStatus from "../../components/ui/Editcategorystatus";
import DeleteModal from "../../components/ui/Deletemodal";
import editIcon from "../../assets/Dashboradicons/edit.svg";
import deleteIcon from "../../assets/Dashboradicons/delete.svg";
import { getCategory, getProductsForCategory } from "../../api/category.api";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

function Categories() {
  const { categoryData, setCategoryData, getAllProducts, getSingleProduct } =
    useProducts();

  const [activeCategory, setActiveCategory] = useState("Noodles");
  const [modalType, setModalType] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editRowName, setEditRowName] = useState("");
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
    const active = categoryData.find((data) => data._id === categoryId);
    if (active) {
      setActiveCategory(active.categoryName);
    }
  }, [categoryId, categoryData]);

  const handleOpenAdd = () => {
    setNewCategoryName("");
    setModalType("add");
  };

  const handleOpenEdit = () => {
    setEditCategoryName(activeCategory || "");
    setModalType("edit");
  };

  const handleOpenRowEdit = (product) => {
    setEditRowName(product);
    setModalType("rowEdit");
  };

  const handleClose = () => {
    setModalType(null);
  };

  const handleSaveAdd = () => {
    setModalType(null);
  };

  const handleSaveEdit = () => {
    setModalType(null);
  };

  const handleSaveRowEdit = () => {
    setModalType(null);
  };

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
      throw err;
    }
  };

  const handelAllProduct = async () => {
    try {
      const res = await getProductsForCategory();
      setAllProduct(res.products);
    } catch (err) {
      throw err;
    }
  };

  // Helper: safely get first available image from a product
  const getProductImage = (product) => {
    console.log(product, "image");
    const images = product?.variants?.[1]?.images;
    if (images && images.length > 0) return images[1];
    return images;
  };

  return (
    <>
      <div className="w-full min-h-screen">
        {/* header */}
        <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
          <h1 className="text-[22px] font-semibold text-[#023337]">
            Categories
          </h1>

          <div className="flex gap-6">
            <Button variant="outline" onClick={handleOpenEdit}>
              Edit Category
            </Button>
            <Button onClick={handleOpenAdd}>Add New Category</Button>
          </div>
        </div>

        {/* category pills */}
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

        {/* category table */}
        <div className="bg-[#F9FAFB] rounded-md border border-gray-300 shadow-sm mb-16 mt-12">
          {/* search */}
          <div className="flex justify-end items-center h-24.5 pr-12 relative">
            <input
              type="text"
              placeholder="search your product"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-66 h-9 rounded-lg border px-2 border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00B207] transition placeholder:text-black placeholder:text-sm placeholder:font-light"
            />
            <CiSearch size={22} className="absolute right-14" />
          </div>

          {/* table */}
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
                    Varients
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

                      {/* Product — left-aligned with image + name */}
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
                        {value.variants.length}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap align-middle">
                        <div className="flex items-center gap-3">
                          <img
                            src={editIcon}
                            className="cursor-pointer"
                            onClick={() => handleOpenRowEdit(value.name)}
                            alt="edit"
                          />
                          <img
                            src={deleteIcon}
                            className="cursor-pointer"
                            alt="delete"
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
          saveLabel="Save"
        >
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
              New Category name
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter the New Category name"
              className="w-full h-12 rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:border-[#00B207] transition"
            />
          </div>
        </ModalCard>
      )}

      {/* ── Edit Category Modal ── */}
      {modalType === "edit" && (
        <ModalCard
          title="Edit Category Status"
          onCancel={handleClose}
          onSave={handleSaveEdit}
          cancelLabel="Cancel"
          saveLabel="Save"
        >
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
              Edit Category name
            </label>
            <input
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              placeholder="Enter the Category name"
              className="w-full h-12 rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:border-[#00B207] transition"
            />
          </div>
        </ModalCard>
      )}

      {/* ── Row Edit Modal ── */}
      {modalType === "rowEdit" && (
        <ModalCard
          title="Edit Product"
          onCancel={handleClose}
          onSave={handleSaveRowEdit}
          cancelLabel="Cancel"
          saveLabel="Save"
        >
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
              Product name
            </label>
            <input
              type="text"
              value={editRowName}
              onChange={(e) => setEditRowName(e.target.value)}
              placeholder="Enter the Product name"
              className="w-full h-12 rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:border-[#00B207] transition"
            />
          </div>
        </ModalCard>
      )}
    </>
  );
}

export default Categories;
