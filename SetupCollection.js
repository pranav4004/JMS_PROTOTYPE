import { db, addDoc, collection, Timestamp } from "./firebase.js";

// Function to add an inventory item
async function addInventoryItem(item, itemType, price, quantity) {
    try {
        const cgst = (price * 1.5) / 100; // 1.5% CGST
        const sgst = (price * 1.5) / 100; // 1.5% SGST
        const totalAmountWithGST = price + cgst + sgst;

        const docRef = await addDoc(collection(db, "inventory"), {
            item: item,
            itemType: itemType,
            price: price,
            quantity: quantity,
            cgst: cgst,
            sgst: sgst,
            totalAmountWithGST: totalAmountWithGST,
            addedAt: Timestamp.now()
        });
        console.log("Inventory item added with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding inventory item: ", error);
    }
}

// Function to record a sale
async function recordSale(itemName, itemType, quantity, pricePerUnit, includeGST) {
    try {
        const totalPriceWithoutGST = quantity * pricePerUnit;
        let cgst = 0, sgst = 0, totalPriceWithGST = totalPriceWithoutGST;

        if (includeGST) {
            cgst = (totalPriceWithoutGST * 1.5) / 100; // 1.5% CGST
            sgst = (totalPriceWithoutGST * 1.5) / 100; // 1.5% SGST
            totalPriceWithGST = totalPriceWithoutGST + cgst + sgst;
        }

        const docRef = await addDoc(collection(db, "sales"), {
            itemName: itemName,
            itemType: itemType,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            totalPriceWithoutGST: totalPriceWithoutGST,
            includeGST: includeGST,
            cgst: cgst,
            sgst: sgst,
            totalPriceWithGST: totalPriceWithGST,
            customerName: customerName, // Add customer name
            customerPhone: customerPhone, // Add customer phone
            customerEmail: customerEmail || "", 
            soldAt: Timestamp.now()
        });
        console.log("Sale recorded with ID: ", docRef.id);
    } catch (error) {
        console.error("Error recording sale: ", error);
    }
}

// Add Sample Inventory Items
addInventoryItem("Gold Necklace", "Necklace", 50000, 10);
addInventoryItem("Diamond Ring", "Ring", 100000, 5);
addInventoryItem("Pearl Earrings", "Earring", 20000, 20);

// Record Sample Sales
recordSale("Gold Necklace", "Necklace", 2, 50000, true,"sohail","9888882312"); // With GST
recordSale("Diamond Ring", "Ring", 1, 100000, false); // Without GST