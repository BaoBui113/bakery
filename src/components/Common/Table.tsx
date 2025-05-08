import React from "react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  setSearch?: any;
  search?: string;
}

export function CommonTable<T>({
  columns,
  data,
  totalItems,
  totalPages,
  currentPage,
  setSearch,
}: CommonTableProps<T>) {
  console.log("data", data);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm text-gray-500">
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {(totalItems ?? 0) > 1 && (totalPages ?? 0) > 1 && (
        <div className="px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            {`Hiển thị ${currentPage}-${totalPages} của ${totalItems} sản phẩm`}
          </div>
          <div className="flex space-x-1 items-end">
            <button className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-50">
              {`<<`}
            </button>
            {(totalItems ?? 0) > 1 && (totalPages ?? 0) > 1 && (
              <div className="flex gap-2 mt-4">
                {Array.from({ length: totalPages ?? 0 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setSearch &&
                      setSearch((prev: any) => ({
                        ...prev,
                        page: i + 1,
                      }))
                    }
                    //   onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded text-sm transition cursor-pointer ${
                      i + 1 === Number(currentPage)
                        ? "bg-amber-50 text-amber-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}

            <button className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-50">
              {`>>`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
