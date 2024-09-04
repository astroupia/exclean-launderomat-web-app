import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Product } from "@/types";
import {
  getAllProducts,
  updateProductById,
} from "@/lib/actions/product.action";

// AdminInventory component for managing the inventory
function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditQuantity(product.quantity);
  };

  const handleSave = async (product: Product) => {
    try {
      await updateProductById(product.id, { quantity: editQuantity });
      setEditingId(null);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditQuantity("");
  };

  return (
    <Card className="w-full">
      {/* CardHeader for the title of the inventory management section */}
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* Table headers for the inventory table */}
              <TableHead>Product ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapping through the products array to create rows for each product */}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <Input
                      type="number"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                    />
                  ) : (
                    product.quantity
                  )}
                </TableCell>
                <TableCell>${product.unitPrice}</TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <>
                      <Button onClick={() => handleSave(product)}>Save</Button>
                      <Button onClick={handleCancel}>Cancel</Button>
                    </>
                  ) : (
                    <Button onClick={() => handleEdit(product)}>Edit</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminInventory;
