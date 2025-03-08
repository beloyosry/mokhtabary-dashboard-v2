// utils/jsonToSheetData.js

// Helper function to convert JSON data to worksheet format, handling null values.
export const jsonToSheetData = (jsonData: any[]) => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
        return []; // Return empty if there's no data.
    }

    // Get the headers from the keys of the first row
    const headers = Object.keys(jsonData[0]);

    // Convert JSON data to 2D array format, replacing null values with an empty string
    const sheetData = jsonData.map((row) =>
        headers.map((header) => (row[header] !== null ? row[header] : ""))
    );

    // Add headers as the first row
    return [headers, ...sheetData];
};
