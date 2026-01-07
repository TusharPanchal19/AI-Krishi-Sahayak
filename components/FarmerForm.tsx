import React, { useState, FormEvent } from 'react';
import { translations } from '../constants/translations';
import { formOptions } from '../data/formData';
import type { FarmerData } from '../types';
import { MapPinIcon, BuildingLibraryIcon, PlantIcon, ArrowsPointingOutIcon, CurrencyRupeeIcon, DropletIcon } from './icons/Icons';


interface FarmerFormProps {
  onSubmit: (data: FarmerData) => void;
  t: typeof translations.en;
  isLoading: boolean;
}

const InputField: React.FC<{ label: string; id: string; icon: React.ReactNode; children: React.ReactNode }> = ({ label, id, icon, children }) => (
  <div>
    <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-700 mb-1">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    {children}
  </div>
);

const commonInputStyle = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-900";

export const FarmerForm: React.FC<FarmerFormProps> = ({ onSubmit, t, isLoading }) => {
  const [formData, setFormData] = useState<FarmerData>({
    state: formOptions.states[0],
    district: '',
    crop: formOptions.crops[0],
    landSize: 5,
    annualIncome: 100000,
    irrigationType: formOptions.irrigationTypes[0],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FarmerData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'landSize' || name === 'annualIncome' ? parseFloat(value) : value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FarmerData, string>> = {};
    if (!formData.state) newErrors.state = t.error_required;
    if (!formData.district.trim()) newErrors.district = t.error_required;
    if (!formData.crop) newErrors.crop = t.error_required;
    if (formData.landSize <= 0) newErrors.landSize = t.error_positive_number;
    if (formData.annualIncome < 0) newErrors.annualIncome = t.error_non_negative_number;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">{t.form_title}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InputField label={t.label_state} id="state" icon={<MapPinIcon className="w-5 h-5 text-gray-400" />}>
          <select id="state" name="state" value={formData.state} onChange={handleChange} className={`${commonInputStyle} pl-3 pr-10`}>
            {formOptions.states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </InputField>

        <InputField label={t.label_district} id="district" icon={<BuildingLibraryIcon className="w-5 h-5 text-gray-400" />}>
          <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} className={commonInputStyle} />
          {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
        </InputField>

        <InputField label={t.label_crop} id="crop" icon={<PlantIcon className="w-5 h-5 text-gray-400" />}>
          <select id="crop" name="crop" value={formData.crop} onChange={handleChange} className={`${commonInputStyle} pl-3 pr-10`}>
            {formOptions.crops.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.crop && <p className="text-red-500 text-xs mt-1">{errors.crop}</p>}
        </InputField>

        <InputField label={`${t.label_land_size} (${t.unit_acres})`} id="landSize" icon={<ArrowsPointingOutIcon className="w-5 h-5 text-gray-400" />}>
          <input type="number" id="landSize" name="landSize" value={formData.landSize} onChange={handleChange} min="0" step="0.1" className={commonInputStyle} />
          {errors.landSize && <p className="text-red-500 text-xs mt-1">{errors.landSize}</p>}
        </InputField>

        <InputField label={`${t.label_annual_income} (₹)`} id="annualIncome" icon={<CurrencyRupeeIcon className="w-5 h-5 text-gray-400" />}>
          <input type="number" id="annualIncome" name="annualIncome" value={formData.annualIncome} onChange={handleChange} min="0" step="1000" className={commonInputStyle} />
          {errors.annualIncome && <p className="text-red-500 text-xs mt-1">{errors.annualIncome}</p>}
        </InputField>

        <InputField label={t.label_irrigation} id="irrigationType" icon={<DropletIcon className="w-5 h-5 text-gray-400" />}>
          <select id="irrigationType" name="irrigationType" value={formData.irrigationType} onChange={handleChange} className={`${commonInputStyle} pl-3 pr-10`}>
            {formOptions.irrigationTypes.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </InputField>

        <div className="md:col-span-2 lg:col-span-3 text-center mt-4">
          <button type="submit" disabled={isLoading} className="inline-flex justify-center items-center py-3 px-12 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors" style={{ backgroundColor: '#3b7a57' }}>
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.button_loading}
              </>
            ) : (
              t.button_submit
            )}
          </button>
        </div>
      </form>
    </div>
  );
};