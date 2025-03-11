// utils/jsonToTableData.ts

/**
 * Helper function to convert JSON data to table format, handling null values.
 *
 * @param jsonData - Array of objects representing the table data.
 * @returns Array of headers and formatted rows, with null values replaced by empty strings.
 */
export const jsonToTableData = (jsonData: any[]) => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
        return { headers: [], tableData: [] }; // Return empty if there's no data.
    }

    // Get headers from the keys of the first row
    const headers = Object.keys(jsonData[0]);

    // Map JSON data to 2D array format, replacing null values with an empty string
    const tableData = jsonData.map((row) =>
        headers.map((header) =>
            row[header] !== null && row[header] !== undefined ? row[header] : ""
        )
    );

    return { headers, tableData };
};
