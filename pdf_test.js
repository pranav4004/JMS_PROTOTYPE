async function generatePDFWithTemplate(items, totalAmount) {
    try {
      // Load the existing PDF template
      const existingPdfBytes = await fetch('Sales_template.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  
      // Get the first page of the PDF
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
  
      // Define font size and starting position for text
      const fontSize = 12;
      const yStart = 700; // Adjust based on your template layout
      let yPos = yStart;
  
      // Add items to the PDF
      items.forEach((item, index) => {
        const itemText = `${item["Item Name"]} - ${item["Item Type"]} - ₹${item["Total Price (₹)"]}`;
        firstPage.drawText(itemText, {
          x: 50, // Adjust X position as needed
          y: yPos,
          size: fontSize,
        });
        yPos -= 20; // Move down for the next item
      });
  
      // Add total amount
      firstPage.drawText(`Total Amount: ₹${totalAmount}`, {
        x: 50, // Adjust X position as needed
        y: yPos - 20,
        size: fontSize,
      });
  
      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
  
      // Trigger download and print
      downloadAndPrintPDF(modifiedPdfBytes, "Sales_Invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }
  
  // Function to download and print the PDF
  function downloadAndPrintPDF(pdfBytes, fileName) {
    // Create a Blob from the PDF bytes
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Open the PDF in a new window
    const printWindow = window.open(url);
  
    // Wait for the PDF to load, then trigger print
    printWindow.onload = () => {
      printWindow.print();
    };
  }
  
  // Example usage
  const items = [
    { "Item Name": "Ring", "Item Type": "Gold", "Quantity": 2, "Price Per Unit (₹)": 5000, "Total Price (₹)": 10000 },
    { "Item Name": "Necklace", "Item Type": "Silver", "Quantity": 1, "Price Per Unit (₹)": 3000, "Total Price (₹)": 3000 },
  ];
  const totalAmount = items.reduce((sum, item) => sum + item["Total Price (₹)"], 0);
  
  generatePDFWithTemplate(items, totalAmount);