import { PetSpecies, PetSize } from '@/types';
import { PET_SPECIES_LABELS, PET_SIZE_LABELS } from '@/lib/constants';
import { Search } from 'lucide-react';

interface PetFiltersProps {
  filters: {
    species?: string;
    size?: string;
    search?: string;
  };
  onFilterChange: (filters: { species?: string; size?: string; search?: string }) => void;
}

export function PetFilters({ filters, onFilterChange }: PetFiltersProps) {
  const handleSpeciesChange = (species: string) => {
    onFilterChange({
      ...filters,
      species: species === 'all' ? undefined : species,
    });
  };

  const handleSizeChange = (size: string) => {
    onFilterChange({
      ...filters,
      size: size === 'all' ? undefined : size,
    });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange({
      ...filters,
      search: search || undefined,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Buscar
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre o raza..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Species Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Especie
        </label>
        <select
          value={filters.species || 'all'}
          onChange={(e) => handleSpeciesChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">Todas las especies</option>
          {Object.entries(PET_SPECIES_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Size Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tamaño
        </label>
        <select
          value={filters.size || 'all'}
          onChange={(e) => handleSizeChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">Todos los tamaños</option>
          {Object.entries(PET_SIZE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      {(filters.species || filters.size || filters.search) && (
        <button
          onClick={() => onFilterChange({})}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
