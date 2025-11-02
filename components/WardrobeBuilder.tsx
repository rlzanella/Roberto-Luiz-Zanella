
import React from 'react';
import { Accordion } from './Accordion';
import { WardrobeOptions, ClothingCategory, StyleOption } from '../data/wardrobeOptions';
import { WardrobeSelections } from '../utils/wardrobeUtils';
import { I18n } from '../i18n/strings';
import { CustomPresets } from './CustomPresets';
import { CustomPreset as CustomPresetType } from '../App';

// Define the accessory category type for better type safety
type AccessoryCategory = 'head' | 'neck' | 'ears' | 'wrists' | 'hands' | 'fingers' | 'waist' | 'other';

interface WardrobeBuilderProps {
  t: I18n;
  options: WardrobeOptions;
  selections: WardrobeSelections;
  customPresets: CustomPresetType[];
  onSavePreset: () => void;
  onDeletePreset: (id: string) => void;
  onCustomPresetSelect: (preset: CustomPresetType) => void;
  onVisualStyleChange: (value: string) => void;
  onImageStyleChange: (field: 'style' | 'age', value: string) => void;
  onDecadeChange: (value: string) => void;
  onThemeCostumeChange: (value: string) => void;
  onHairChange: (field: string, value: string) => void;
  onClothingChange: (category: ClothingCategory, field: string, value: string | string[]) => void;
  onFootwearChange: (field: string, value: string) => void;
  onAccessoriesChange: (category: AccessoryCategory, field: string, value: string) => void;
  onPoseChange: (value: string) => void;
  onPoseDetailChange: (value: string) => void;
  onLightingChange: (value: string) => void;
  onBackgroundChange: (value: string) => void;
  onFineTuningChange: (value: string) => void;
}

const SelectInput: React.FC<{
    label: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    t: I18n;
    disabled?: boolean;
}> = ({ label, options, value, onChange, t, disabled = false }) => (
    <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500"
        >
            <option value="">{t.select}</option>
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

export const WardrobeBuilder: React.FC<WardrobeBuilderProps> = ({
    t,
    options,
    selections,
    customPresets,
    onSavePreset,
    onDeletePreset,
    onCustomPresetSelect,
    onVisualStyleChange,
    onImageStyleChange,
    onDecadeChange,
    onThemeCostumeChange,
    onHairChange,
    onClothingChange,
    onFootwearChange,
    onAccessoriesChange,
    onPoseChange,
    onPoseDetailChange,
    onLightingChange,
    onBackgroundChange,
    onFineTuningChange
}) => {
  const detailOptionsForPose = options.poseDetailsByPose[selections.pose] || [];

  return (
    <div className="flex flex-col gap-2">
      <Accordion title={t.accordion.stylePresets} isOpenDefault={true}>
        <div className="flex flex-col gap-4">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-300">{t.wardrobe.myPresets}</h4>
                    <button onClick={onSavePreset} className="flex items-center gap-1.5 text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v1h-4v-2H7v2H3v14a2 2 0 002 2h14a2 2 0 002-2v-5h-2v4H5V5zm14-2h-2v4h2V3zm-4 0h-2v4h2V3z" /></svg>
                        {t.wardrobe.saveStyleButton}
                    </button>
                </div>
                <CustomPresets presets={customPresets} onSelect={onCustomPresetSelect} onDelete={onDeletePreset} t={t}/>
            </div>
        </div>
      </Accordion>
      
      <Accordion title={t.accordion.visualStyle}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {options.visualStyleOptions.map(style => (
                <button
                    key={style.value}
                    onClick={() => onVisualStyleChange(selections.visualStyle === style.value ? '' : style.value)}
                    className={`text-sm font-medium py-2 px-3 text-center rounded-lg transition-colors ${
                        selections.visualStyle === style.value
                        ? 'bg-yellow-500 text-gray-900'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
                >
                    {style.label}
                </button>
            ))}
        </div>
      </Accordion>

      <Accordion title={t.accordion.artisticStyle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SelectInput 
                t={t}
                label={t.wardrobe.imageStyle}
                options={options.imageStyleOptions}
                value={selections.imageStyle.style}
                onChange={(e) => onImageStyleChange('style', e.target.value)}
            />
            <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-gray-400">{t.wardrobe.targetAge}</label>
                <input
                    type="text"
                    placeholder={t.wardrobe.targetAgePlaceholder}
                    value={selections.imageStyle.age}
                    onChange={(e) => onImageStyleChange('age', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                />
            </div>
        </div>
      </Accordion>
      
      <Accordion title={t.accordion.decadeTheme}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SelectInput 
                t={t}
                label={t.wardrobe.selectDecade}
                options={options.decadeOptions}
                value={selections.decade}
                onChange={(e) => onDecadeChange(e.target.value)}
            />
            {(() => {
                const selectedDecadeData = options.decadeOptions.find(
                    (opt) => opt.value === selections.decade
                );
                
                if (selectedDecadeData && selectedDecadeData.costumes && selectedDecadeData.costumes.length > 0) {
                    return (
                        <SelectInput
                            t={t}
                            label={t.wardrobe.costumeType}
                            options={selectedDecadeData.costumes}
                            value={selections.themeCostume}
                            onChange={(e) => onThemeCostumeChange(e.target.value)}
                        />
                    );
                }
                return null;
            })()}
        </div>
      </Accordion>

      <Accordion title={t.accordion.hair}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {options.hairOptions.map(option => (
                <SelectInput 
                    t={t}
                    key={option.id}
                    label={option.label}
                    options={option.options}
                    value={selections.hair[option.id as keyof typeof selections.hair]}
                    onChange={(e) => onHairChange(option.id, e.target.value)}
                />
            ))}
        </div>
      </Accordion>

      <Accordion title={t.accordion.clothing}>
        {(Object.keys(options.clothingOptions) as ClothingCategory[]).map((clothingKey) => {
          const category = options.clothingOptions[clothingKey];
          if (!category) return null;
          
          const currentSelections = selections.clothing[clothingKey];
          const selectedType = category.options.types.find(t => t.value === currentSelections.type);
          
          const styleOptionsForSelectedType = (selectedType && 'styles' in selectedType) ? (selectedType.styles || []) : [];
          
          const handleStyleChange = (styleValue: string) => {
            const currentStyles = selections.clothing[clothingKey].style;
            // FIX: Add an Array.isArray check to guard against type pollution from state updates, resolving the 'unknown' type error.
            if (Array.isArray(currentStyles)) {
                const newStyles = currentStyles.includes(styleValue)
                    ? currentStyles.filter(s => s !== styleValue)
                    : [...currentStyles, styleValue];
                onClothingChange(clothingKey, 'style', newStyles);
            }
          };

          {/* FIX: Removed 'elements' from the union type as it's no longer a valid multi-select field. */}
          const handleMultiSelectChange = (field: 'featherColors' | 'bodyPaintColors', value: string) => {
              const currentValues = selections.clothing[clothingKey][field];
              // FIX: Add an Array.isArray check to guard against type pollution from state updates, resolving the 'unknown' type error.
              if (Array.isArray(currentValues)) {
                const newValues = currentValues.includes(value)
                    ? currentValues.filter(v => v !== value)
                    : [...currentValues, value];
                onClothingChange(clothingKey, field, newValues);
              }
          };

          return (
            <Accordion key={clothingKey} title={category.label}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 bg-gray-900/50 rounded-md">
                    <SelectInput
                        t={t}
                        label={clothingKey === 'traditional' ? t.wardrobe.culturalOrigin : t.wardrobe.type}
                        options={category.options.types as StyleOption[]}
                        value={currentSelections.type}
                        onChange={(e) => onClothingChange(clothingKey, 'type', e.target.value)}
                    />
                    
                    {category.options.fabrics && (
                        <SelectInput
                            t={t}
                            label={t.wardrobe.fabric}
                            options={category.options.fabrics}
                            value={currentSelections.fabric}
                            onChange={(e) => onClothingChange(clothingKey, 'fabric', e.target.value)}
                        />
                    )}
                    {category.options.colors && (
                        <SelectInput
                            t={t}
                            label={t.wardrobe.color}
                            options={category.options.colors}
                            value={currentSelections.color}
                            onChange={(e) => onClothingChange(clothingKey, 'color', e.target.value)}
                        />
                    )}
                    {category.options.patterns && (
                        <SelectInput
                            t={t}
                            label={t.wardrobe.pattern}
                            options={category.options.patterns}
                            value={currentSelections.pattern}
                            onChange={(e) => onClothingChange(clothingKey, 'pattern', e.target.value)}
                        />
                    )}

                    {styleOptionsForSelectedType.length > 0 && (
                      <div className="flex flex-col gap-2 w-full md:col-span-2">
                        <label className="text-sm font-medium text-gray-400">{t.wardrobe.style}</label>
                          {!currentSelections.type ? (
                              <div className="p-3 text-sm text-gray-500 bg-gray-800 rounded-lg">{t.wardrobe.selectTypeFirst}</div>
                          ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 p-3 bg-gray-700 rounded-lg">
                                  {styleOptionsForSelectedType.map(opt => (
                                      <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer hover:text-yellow-300 transition-colors">
                                          <input
                                              type="checkbox"
                                              value={opt.value}
                                              checked={Array.isArray(currentSelections.style) && currentSelections.style.includes(opt.value)}
                                              onChange={() => handleStyleChange(opt.value)}
                                              className="w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 rounded focus:ring-yellow-600 focus:ring-offset-gray-700 focus:ring-2"
                                          />
                                          {opt.label}
                                      </label>
                                  ))}
                              </div>
                          )}
                      </div>
                    )}
                    
                    {/* FIX: Replaced the non-functional 'elements' UI with individual select inputs for 'headwear', 'top', and 'bottom' for the 'traditional' category to match the data structure. */}
                    {clothingKey === 'traditional' && currentSelections.type && (
                        <>
                           <SelectInput
                                t={t}
                                label={t.wardrobe.headwear}
                                options={category.options.headwear ?? []}
                                value={currentSelections.headwear ?? ''}
                                onChange={(e) => onClothingChange(clothingKey, 'headwear', e.target.value)}
                            />
                            <SelectInput
                                t={t}
                                label={t.wardrobe.top}
                                options={category.options.tops ?? []}
                                value={currentSelections.top ?? ''}
                                onChange={(e) => onClothingChange(clothingKey, 'top', e.target.value)}
                            />
                            <SelectInput
                                t={t}
                                label={t.wardrobe.bottom}
                                options={category.options.bottoms ?? []}
                                value={currentSelections.bottom ?? ''}
                                onChange={(e) => onClothingChange(clothingKey, 'bottom', e.target.value)}
                            />

                            {category.options.featherColors && (
                                <div className="flex flex-col gap-2 w-full md:col-span-2">
                                    <label className="text-sm font-medium text-gray-400">{t.wardrobe.featherColors}</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 p-3 bg-gray-700 rounded-lg">
                                        {category.options.featherColors.map(opt => (
                                            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer hover:text-yellow-300 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    value={opt.value}
                                                    checked={Array.isArray(currentSelections.featherColors) && currentSelections.featherColors.includes(opt.value)}
                                                    onChange={() => handleMultiSelectChange('featherColors', opt.value)}
                                                    className="w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 rounded focus:ring-yellow-600 focus:ring-offset-gray-700 focus:ring-2"
                                                />
                                                {opt.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                             {category.options.bodyPaintColors && (
                                <div className="flex flex-col gap-2 w-full md:col-span-2">
                                    <label className="text-sm font-medium text-gray-400">{t.wardrobe.bodyPaintColors}</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 p-3 bg-gray-700 rounded-lg">
                                        {category.options.bodyPaintColors.map(opt => (
                                            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer hover:text-yellow-300 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    value={opt.value}
                                                    checked={Array.isArray(currentSelections.bodyPaintColors) && currentSelections.bodyPaintColors.includes(opt.value)}
                                                    onChange={() => handleMultiSelectChange('bodyPaintColors', opt.value)}
                                                    className="w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 rounded focus:ring-yellow-600 focus:ring-offset-gray-700 focus:ring-2"
                                                />
                                                {opt.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                 </div>
            </Accordion>
          );
        })}
      </Accordion>

      <Accordion title={t.accordion.footwear}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <SelectInput
                t={t}
                label={t.wardrobe.type}
                options={options.footwearOptions.types}
                value={selections.footwear.type}
                onChange={(e) => onFootwearChange('type', e.target.value)}
            />
            
            {(() => {
                const selectedTypeData = options.footwearOptions.types.find(
                    (type) => type.value === selections.footwear.type
                );
                
                return (
                    <>
                        <SelectInput
                            t={t}
                            label={t.wardrobe.material}
                            options={selectedTypeData?.materials || []}
                            value={selections.footwear.material}
                            onChange={(e) => onFootwearChange('material', e.target.value)}
                            disabled={!selections.footwear.type}
                        />
                        <SelectInput
                            t={t}
                            label={t.wardrobe.color}
                            options={selectedTypeData?.colors || []}
                            value={selections.footwear.color}
                            onChange={(e) => onFootwearChange('color', e.target.value)}
                            disabled={!selections.footwear.type}
                        />
                    </>
                );
            })()}
        </div>
      </Accordion>

      <Accordion title={t.accordion.accessories}>
        <div className="flex flex-col gap-6">
          {options.accessoriesOptions.map(category => {
            const currentCategorySelections = selections.accessories[category.id as AccessoryCategory];
            return (
              <div key={category.id}>
                <h4 className="font-semibold text-gray-300 mb-2">{category.label}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-900/50 rounded-md border border-gray-700">
                  {category.options.map(option => {
                    const value = currentCategorySelections[option.id as keyof typeof currentCategorySelections];
                    return (
                      <SelectInput
                        t={t}
                        key={option.id}
                        label={option.label}
                        options={option.options}
                        value={value}
                        onChange={(e) => onAccessoriesChange(category.id as AccessoryCategory, option.id, e.target.value)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Accordion>

       <Accordion title={t.accordion.poseAndScene}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <SelectInput 
                t={t}
                label={t.accordion.pose}
                options={options.poseOptions}
                value={selections.pose}
                onChange={(e) => onPoseChange(e.target.value)}
            />
             <SelectInput 
                t={t}
                label={t.accordion.lighting}
                options={options.lightingOptions}
                value={selections.lighting}
                onChange={(e) => onLightingChange(e.target.value)}
            />
            <div className="flex flex-col gap-2 w-full md:col-span-2">
                <label className="text-sm font-medium text-gray-400">{t.wardrobe.poseDetail}</label>
                {!selections.pose ? (
                    <div className="p-3 text-sm text-gray-500 bg-gray-800 rounded-lg">{t.wardrobe.selectPoseFirst}</div>
                ) : detailOptionsForPose.length === 0 ? (
                    <div className="p-3 text-sm text-gray-500 bg-gray-800 rounded-lg">{t.wardrobe.noStylesAvailable}</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 p-3 bg-gray-700 rounded-lg">
                        {detailOptionsForPose.map(opt => (
                            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer hover:text-yellow-300 transition-colors">
                                <input
                                    type="checkbox"
                                    value={opt.value}
                                    checked={selections.poseDetail.includes(opt.value)}
                                    onChange={() => onPoseDetailChange(opt.value)}
                                    className="w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 rounded focus:ring-yellow-600 focus:ring-offset-gray-700 focus:ring-2"
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                )}
            </div>
             <SelectInput 
                t={t}
                label={t.accordion.background}
                options={options.backgroundOptions}
                value={selections.background}
                onChange={(e) => onBackgroundChange(e.target.value)}
            />
        </div>
      </Accordion>
      
      <Accordion title={t.accordion.fineTuning}>
         <textarea
            value={selections.fineTuning}
            onChange={(e) => onFineTuningChange(e.target.value)}
            placeholder={t.wardrobe.fineTuningPlaceholder}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
            rows={3}
          />
      </Accordion>
    </div>
  );
};
