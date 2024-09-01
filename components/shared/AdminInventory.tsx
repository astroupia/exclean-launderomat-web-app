import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { InventoryItemParam } from "@/types"; // Importing the type definition for inventory items
import { useState } from "react";

const [inventory, setInventory] = useState<InventoryItemParam[]>([
  { id: 1, item: "string", quantity: 10 },
]);

const handleInventoryUpdate = (item: InventoryItemParam, quantity: number) => {
  setInventory(
    inventory.map((i) => (i.id === item.id ? { ...i, quantity } : i))
  );
};

// AdminInventory component for managing the inventory
function AdminInventory({
  inventory, // Array of inventory items passed as a prop
  handleInventoryUpdate, // Function to handle inventory updates passed as a prop
}: {
  inventory: InventoryItemParam[]; // Type definition for inventory items
  handleInventoryUpdate: (item: InventoryItemParam, quantity: number) => void; // Type definition for the update function
}) {
  return (
    <Card>
      {/* CardHeader for the title of the inventory management section */}
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* Table headers for the inventory table */}
              <TableHead>Item ID</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapping through the inventory array to create rows for each item */}
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminInventory;
