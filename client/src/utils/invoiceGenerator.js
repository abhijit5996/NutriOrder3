import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Extend jsPDF with autoTable plugin
jsPDF.autoTable = autoTable;

export function generateInvoice(order) {
  try {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Set margins and initial position
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = margin;
    
    // Add company header with background
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Add company title
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("ZestyLife Invoice", pageWidth / 2, 25, { align: 'center' });
    
    // Reset text color and position
    doc.setTextColor(0, 0, 0);
    yPosition = 50;
    
    // Add invoice details section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE DETAILS", margin, yPosition);
    doc.setFont("helvetica", "normal");
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.text(`Invoice Number: ${order.id}`, margin, yPosition);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, margin + 70, yPosition);
    doc.text(`Time: ${new Date(order.date).toLocaleTimeString()}`, margin + 140, yPosition);
    
    yPosition += 15;
    
    // Add customer information
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", margin, yPosition);
    doc.setFont("helvetica", "normal");
    
    yPosition += 7;
    doc.text(order.customer.name, margin, yPosition);
    yPosition += 5;
    doc.text(order.customer.phone, margin, yPosition);
    yPosition += 5;
    
    // Handle address text wrapping
    const addressLines = doc.splitTextToSize(order.customer.address, pageWidth - 2 * margin);
    doc.text(addressLines, margin, yPosition);
    yPosition += 5 * addressLines.length;
    
    yPosition += 10;
    
    // Add order items table
    doc.setFont("helvetica", "bold");
    doc.text("ORDER ITEMS", margin, yPosition);
    doc.setFont("helvetica", "normal");
    
    yPosition += 7;
    
    // Create the items table with proper column widths
    autoTable(doc, {
      startY: yPosition,
      head: [['Item', 'Quantity', 'Unit Price', 'Total']],
      body: order.items.map(item => [
        item.name,
        item.quantity.toString(),
        `₹${(item.price ?? 0).toFixed(2)}`,
        `₹${((item.quantity ?? 0) * (item.price ?? 0)).toFixed(2)}`
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center',
        font: 'helvetica'
      },
      bodyStyles: {
        halign: 'right',
        font: 'times'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      columnStyles: {
        0: { 
          halign: 'left',
          cellWidth: 80,
          fontStyle: 'bold',
          font: 'times'
        },
        1: { 
          halign: 'center',
          cellWidth: 25,
          font: 'times'
        },
        2: { 
          halign: 'right',
          cellWidth: 35,
          font: 'times'
        },
        3: { 
          halign: 'right',
          cellWidth: 35,
          fontStyle: 'bold',
          font: 'times'
        }
      },
      margin: { left: margin, right: margin },
      styles: {
        font: 'times',
        fontSize: 10,
        cellPadding: 3
      }
    });
    
    // Get the final Y position after the table
    const finalY = doc.lastAutoTable.finalY + 15;
    
    // Add bill summary box
    const summaryX = 120;
    const summaryWidth = 75;
    
    // Draw summary box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(summaryX, finalY, summaryWidth, 60, 3, 3, 'FD');
    
    // Add summary title
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 128, 185);
    doc.text("BILL SUMMARY", summaryX + summaryWidth/2, finalY + 8, { align: 'center' });
    
    // Add summary items
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("times", "normal");
    
    doc.text("Subtotal:", summaryX + 5, finalY + 20);
    doc.text(`₹${(order.subtotal ?? 0).toFixed(2)}`, summaryX + summaryWidth - 5, finalY + 20, { align: 'right' });
    
    doc.text("Tax:", summaryX + 5, finalY + 30);
    doc.text(`₹${(order.tax ?? 0).toFixed(2)}`, summaryX + summaryWidth - 5, finalY + 30, { align: 'right' });
    
    doc.text("Delivery Fee:", summaryX + 5, finalY + 40);
    doc.text(`₹${(order.deliveryFee ?? 0).toFixed(2)}`, summaryX + summaryWidth - 5, finalY + 40, { align: 'right' });
    
    // Add total with emphasis
    doc.setFont("times", "bold");
    doc.setTextColor(41, 128, 185);
    doc.text("TOTAL:", summaryX + 5, finalY + 55);
    doc.text(`₹${(order.total ?? 0).toFixed(2)}`, summaryX + summaryWidth - 5, finalY + 55, { align: 'right' });
    
    // Add footer
    const footerY = 270;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, footerY, pageWidth - margin, footerY);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont("times", "italic");
    doc.text("Thank you for ordering with ZestyLife!", pageWidth / 2, footerY + 10, { align: 'center' });
    
    // Add page border
    doc.setDrawColor(220, 220, 220);
    doc.rect(5, 5, pageWidth - 10, doc.internal.pageSize.getHeight() - 10);
    
    // Save the PDF
    doc.save(`invoice-${order.id}.pdf`);
    
    console.log('Invoice generated successfully');
  } catch (error) {
    console.error('Error generating invoice:', error);
  }
}