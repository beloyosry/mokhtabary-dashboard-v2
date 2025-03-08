// utils/excelExports.ts

import * as XLSX from "xlsx";
import { jsonToSheetData } from "./jsonToSheetData";

/**
 * Exports the provided table data to an Excel file.
 *
 * @param data - Array of objects representing the table rows.
 * @param headers - Array of table headers to include as column headers in the Excel file.
 * @param fileName - The name for the downloaded Excel file.
 */
export const exportToExcel = <T>(
    data: T[],
    headers: string[],
    fileName: string = "export.xlsx"
) => {
    // Prepare data for the Excel sheet, replacing null values with an empty string
    const sheetData = jsonToSheetData(data);

    // If specific headers are provided, use them to map the data
    const formattedData = data.map((item) => {
        const row: any = {};
        headers.forEach((header) => {
            row[header] = item[header as keyof T] ?? ""; // Replace null values with an empty string
        });
        return row;
    });

    // Create a new worksheet from the formatted data
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate the Excel file and trigger download
    XLSX.writeFile(workbook, fileName);
};
