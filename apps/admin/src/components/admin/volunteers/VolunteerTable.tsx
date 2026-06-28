import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Eye, MoreVertical } from 'lucide-react';
import { Volunteer, useVolunteerStore } from '../../../store/useVolunteerStore';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind class merging
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface VolunteerTableProps {
  data: Volunteer[];
}

const ActionCell = ({ volunteer }: { volunteer: Volunteer }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const { setSelectedVolunteerId } = useVolunteerStore();
  const queryClient = useQueryClient();
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdateStatus = async (status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['volunteers'] });
    // Snapshot the previous value
    const previousVolunteers = queryClient.getQueryData(['volunteers']);

    // Optimistically update the cache
    queryClient.setQueryData(['volunteers'], (old: any) => {
      if (!old) return old;
      return old.map((v: any) => v.id === volunteer.id ? { ...v, status } : v);
    });

    try {
      const res = await fetch(`/api/volunteers/${volunteer.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      toast.success(`Volunteer status updated to ${status}`);
      // Invalidate to ensure sync
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
    } catch (err) {
      console.error(err);
      // Rollback on error
      queryClient.setQueryData(['volunteers'], previousVolunteers);
      toast.error('Failed to update volunteer status');
    }
  };

  return (
    <div className="flex items-center gap-2" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setSelectedVolunteerId(volunteer.id);
        }}
        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Eye size={16} />
      </button>
      <div className="relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MoreVertical size={16} />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-8 w-40 bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] z-50 py-1 overflow-hidden" onClick={e => e.stopPropagation()}>
            <button onClick={(e) => handleUpdateStatus('Approved', e)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors">Approve</button>
            <button onClick={(e) => handleUpdateStatus('Rejected', e)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">Reject</button>
            <button onClick={(e) => handleUpdateStatus('Under Review', e)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">Under Review</button>
          </div>
        )}
      </div>
    </div>
  );
};

export const VolunteerTable: React.FC<VolunteerTableProps> = ({ data }) => {
  const { selectedVolunteerId, setSelectedVolunteerId } = useVolunteerStore();

  const columns = useMemo<ColumnDef<Volunteer>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: 'Volunteer',
        cell: ({ row }) => {
          const v = row.original;
          return (
            <div className="flex items-center gap-3">
              <img
                src={v.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(v.name)}`}
                alt={v.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-sm font-bold text-gray-900">{v.name}</p>
                <p className="text-xs text-gray-500">{v.volunteerId}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'email',
        header: 'Contact',
        cell: ({ row }) => {
          const v = row.original;
          return (
            <div>
              <p className="text-sm text-gray-700">{v.email}</p>
              <p className="text-xs text-gray-500">{v.phone}</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'program',
        header: 'Program / Role',
        cell: ({ row }) => {
          const v = row.original;
          return (
            <div>
              <p className="text-sm font-semibold text-gray-900">{v.program}</p>
              <p className="text-xs text-gray-500">{v.role}</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border",
                status === 'Pending' && "bg-yellow-50 text-yellow-700 border-yellow-200",
                status === 'Approved' && "bg-emerald-50 text-emerald-700 border-emerald-200",
                status === 'Rejected' && "bg-red-50 text-red-700 border-red-200",
                status === 'Under Review' && "bg-blue-50 text-blue-700 border-blue-200"
              )}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: 'appliedDate',
        header: 'Applied On',
        cell: ({ getValue }) => {
          const val = getValue<string>();
          const parts = val.split(', ');
          return (
            <div>
              <p className="text-sm text-gray-700">{parts[0]}</p>
              <p className="text-xs text-gray-500">{parts[1]}</p>
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          return <ActionCell volunteer={row.original} />;
        },
      },
    ],
    [setSelectedVolunteerId]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
      <div className="overflow-x-auto flex-1 pb-16">
        <table className="w-full text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-100 bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-xs font-semibold text-gray-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-50">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => setSelectedVolunteerId(row.original.id)}
                className={cn(
                  "hover:bg-[#F8FAFC] transition-colors cursor-pointer group",
                  selectedVolunteerId === row.original.id && "bg-[#F8FAFC]"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-gray-50 text-sm font-medium"
          >
            &lt;
          </button>
          {table.getPageOptions().map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => table.setPageIndex(pageIndex)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium",
                table.getState().pagination.pageIndex === pageIndex
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {pageIndex + 1}
            </button>
          ))}
          {/* Mock extra pages for visual matching */}
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 text-sm font-medium cursor-default">
            ...
          </button>
          <button className="w-10 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-50 text-sm font-medium">
            125
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-gray-50 text-sm font-medium"
          >
            &gt;
          </button>
        </div>
        <p className="text-xs text-gray-500 font-medium">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + (data.length > 0 ? 1 : 0)} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of {data.length} results
        </p>
      </div>
    </div>
  );
};
