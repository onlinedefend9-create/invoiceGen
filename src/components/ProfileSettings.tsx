import React, { useState } from 'react';
import { Save, Building, Mail, Phone, MapPin, CreditCard, Hash, Image as ImageIcon } from 'lucide-react';
import { UserProfile } from '../types';
import { useTranslation } from 'react-i18next';

interface Props {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export const ProfileSettings: React.FC<Props> = ({ profile, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UserProfile>(profile);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-3xl font-black tracking-tighter">{t('settings.profileSettings', { defaultValue: 'Profile Settings' })}</h3>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{t('settings.manageCompanyInfo', { defaultValue: 'Manage your company information' })}</p>
        </div>
        <button 
          onClick={() => onSave(formData)}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
        >
          <Save size={18} /> {t('common.save', { defaultValue: 'Save' })}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-10 space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Building size={14} /> {t('settings.companyIdentity', { defaultValue: 'Company Identity' })}
          </h4>
          <div className="space-y-6">
            <InputGroup label={t('settings.companyName', { defaultValue: 'Company Name' })} icon={<Building size={18} />} value={formData.companyName} onChange={v => setFormData({ ...formData, companyName: v })} />
            <InputGroup label={t('settings.professionalEmail', { defaultValue: 'Professional Email' })} icon={<Mail size={18} />} value={formData.email} onChange={v => setFormData({ ...formData, email: v })} />
            <InputGroup label={t('settings.phone', { defaultValue: 'Phone' })} icon={<Phone size={18} />} value={formData.phone} onChange={v => setFormData({ ...formData, phone: v })} />
            <InputGroup label={t('settings.fullAddress', { defaultValue: 'Full Address' })} icon={<MapPin size={18} />} value={formData.address} onChange={v => setFormData({ ...formData, address: v })} isTextArea />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-10 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <CreditCard size={14} /> {t('settings.legalBankingInfo', { defaultValue: 'Legal & Banking Info' })}
            </h4>
            <div className="space-y-6">
              <InputGroup label={t('settings.siret', { defaultValue: 'SIRET' })} icon={<Hash size={18} />} value={formData.siret} onChange={v => setFormData({ ...formData, siret: v })} />
              <InputGroup label={t('settings.ribIban', { defaultValue: 'RIB / IBAN' })} icon={<CreditCard size={18} />} value={formData.rib} onChange={v => setFormData({ ...formData, rib: v })} isTextArea />
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-10 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <ImageIcon size={14} /> {t('settings.companyLogo', { defaultValue: 'Company Logo' })}
            </h4>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder={t('settings.logoUrlPlaceholder', { defaultValue: "Logo URL (https://...)" })}
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                value={formData.logoUrl}
                onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
              />
              {formData.logoUrl && (
                <div className="p-4 bg-slate-50 rounded-2xl flex justify-center">
                  <img src={formData.logoUrl} alt="Logo Preview" className="h-16 w-auto" referrerPolicy="no-referrer" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function InputGroup({ label, icon, value, onChange, isTextArea = false }: { label: string, icon: React.ReactNode, value: string, onChange: (v: string) => void, isTextArea?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
          {icon}
        </div>
        {isTextArea ? (
          <textarea 
            className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            rows={3}
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        ) : (
          <input 
            type="text" 
            className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
