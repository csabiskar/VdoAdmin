import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

export default function AddProduct() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <div className="flex gap-4">
          <Button variant="outline">Preview Product</Button>
          <Button>Publish Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-8">
          {/* Basic Details */}
          <Card title="Basic Details">
            <div className="space-y-6">
              <Input label="Product Name" placeholder="Enter name" />
              <Input
                label="Product Description"
                placeholder="Enter Product Description"
              />
              <Input
                label="Detailed Description"
                placeholder="Enter Product Description"
              />
            </div>
          </Card>

          {/* Pricing */}
          <Card title="Pricing">
            <div className="space-y-6">
              <Input label="Product Price" defaultValue="₹1000.00" />
              <Input label="Discounted Price (Optional)" />
            </div>
          </Card>

          {/* Inventory */}
          <Card title="Inventory">
            <div className="space-y-6">
              <Input label="Stock Quantity" />
              <Input label="Stock Keeping Unit (SKU)" />
            </div>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">
          {/* Image Upload */}
          <Card title="Upload Product Image">
            <div className="border rounded-lg h-48 flex items-center justify-center text-gray-400">
              Product Image Preview
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline">Browse</Button>
              <Button variant="outline">Replace</Button>
            </div>

            <div className="mt-6 border-2 border-dashed rounded-lg h-24 flex items-center justify-center text-green-600">
              + Add Image
            </div>
          </Card>

          {/* Categories */}
          <Card title="Categories">
            <div className="space-y-6">
              <Select label="Product Categories">
                <option>Select your product</option>
              </Select>

              <Input label="Product Weight" placeholder="Ex: 750gm" />
              <Input label="Expiration Start" type="date" />
              <Input label="Expiration End" type="date" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
