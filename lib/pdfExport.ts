// utils/pdfExport.ts

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { jsonToTableData } from "./jsonToTableData..";

/**
 * Exports the provided table data to a PDF file.
 *
 * @param data - Array of objects representing the table rows.
 * @param fileName - The name for the downloaded PDF file.
 */
export const generatePDF = <T>(data: T[], fileName: string = "export.pdf") => {
    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Use jsonToTableData to handle null values and get headers and formatted table data
    const { headers, tableData } = jsonToTableData(data);

    // Generate the table in the PDF
    autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: 10, // Start position for the table
        margin: { top: 10, left: 10, right: 10 },
        styles: {
            fontSize: 10,
            cellPadding: 3,
            overflow: "linebreak",
        },
        headStyles: { fillColor: [52, 58, 64], textColor: 255 }, // Dark header with white text
    });

    // Save the generated PDF
    doc.save(fileName);
};
