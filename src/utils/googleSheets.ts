import type { MenuCategory, MenuItem } from '../types';

const SPREADSHEET_ID = '1D9dHy4wlD1-D0agK9WXBIsQigOyGGd2SGmqjJSNw0cM';

// Simple CSV parser that handles basic quotes and commas
function parseCSV(csvText: string) {
  const lines: string[][] = [];
  const rows = csvText.split(/\r?\n/);
  
  for (let row of rows) {
    if (!row.trim()) continue;
    
    const columns: string[] = [];
    let currentColumn = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        columns.push(currentColumn.trim().replace(/^"|"$/g, ''));
        currentColumn = '';
      } else {
        currentColumn += char;
      }
    }
    columns.push(currentColumn.trim().replace(/^"|"$/g, ''));
    lines.push(columns);
  }
  
  return lines;
}

export async function fetchMenuFromGoogleSheets(): Promise<MenuCategory[]> {
  try {
    const categoriesUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=categorias`;
    const itemsUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=platos`;

    const [categoriesRes, itemsRes] = await Promise.all([
      fetch(categoriesUrl),
      fetch(itemsUrl)
    ]);

    if (!categoriesRes.ok || !itemsRes.ok) {
      throw new Error('Failed to fetch from Google Sheets');
    }

    const categoriesCsv = await categoriesRes.text();
    const itemsCsv = await itemsRes.text();

    const categoriesData = parseCSV(categoriesCsv);
    const itemsData = parseCSV(itemsCsv);

    // Skip headers (assuming Categoria, ImagenURL)
    const categoriesMap = new Map<string, string>();
    for (let i = 1; i < categoriesData.length; i++) {
      const [name, imageUrl] = categoriesData[i];
      if (name) categoriesMap.set(name, imageUrl || '');
    }

    // Skip headers (assuming Categoria, Nombre, Precio)
    const itemsByCategory = new Map<string, MenuItem[]>();
    for (let i = 1; i < itemsData.length; i++) {
      const [category, name, priceStr] = itemsData[i];
      if (!category || !name) continue;

      const price = parseFloat(priceStr.replace(/[^\d.-]/g, '')) || 0;
      const item: MenuItem = {
        id: `gs-${i}`,
        nombre: name,
        precio: price
      };

      if (!itemsByCategory.has(category)) {
        itemsByCategory.set(category, []);
      }
      itemsByCategory.get(category)?.push(item);
    }

    // Combine into MenuCategory array
    const result: MenuCategory[] = [];
    
    // We prioritize categories from the categories sheet to maintain order
    for (const [catName, imageUrl] of categoriesMap.entries()) {
      const items = itemsByCategory.get(catName) || [];
      result.push({
        categoria: catName,
        imagen: imageUrl || undefined, // We will merge this in App.tsx with defaults
        items: items
      });
    }

    // Add any categories from items sheet not in categories sheet
    for (const [catName, items] of itemsByCategory.entries()) {
      if (!categoriesMap.has(catName)) {
        result.push({
          categoria: catName,
          items: items
        });
      }
    }

    return result;
  } catch (error) {
    console.error('Error fetching menu from Google Sheets:', error);
    throw error;
  }
}
