import React from 'react';
import { Accordion } from './Accordion';
import { 
    visualStyleOptions,
    hairOptions, 
    clothingOptions, 
    footwearOptions, 
    accessoriesOptions,
    poseOptions,
    lightingOptions,
    backgroundOptions
} from '../data/wardrobeOptions';
import { WardrobeSelections } from '../utils/wardrobeUtils';

interface WardrobeBuilderProps {
  selections: WardrobeSelections;
  onVisualStyleChange: (value: string) => void;
  onHairChange: (field: string, value: string) => void;
  onClothingChange: (category: 'onePiece' | 'tops' | 'bottoms' | 'stockings' | 'outerwear', field: string, value: string) => void;
  onFootwearChange: (field: string, value: string) => void;
  onAccessoriesChange: (category: 'head' | 'neck' | 'ears' | 'wrists' | 'other', field: string, value: string) => void;
  onPoseChange: (value: string) => void;
  onLightingChange: (value: string) => void;
  onBackgroundChange: (value: string) => void;
  onFineTuningChange: (value: string) => void;
}

const SelectInput: React.FC<{
    label: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, options, value, onChange }) => (
    <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
        >
            <option value="">- Select -</option>
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

export const WardrobeBuilder: React.FC<WardrobeBuilderProps> = ({
    selections,
    onVisualStyleChange,
    onHairChange,
    onClothingChange,
    onFootwearChange,
    onAccessoriesChange,
    onPoseChange,
    onLightingChange,
    onBackgroundChange,
    onFineTuningChange
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Accordion title="Visual Style Presets" isOpenDefault={true}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {visualStyleOptions.map(style => (
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

      <Accordion title="Hair & Hairstyle">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {hairOptions.map(option => (
                <SelectInput 
                    key={option.id}
                    label={option.label}
                    options={option.options}
                    value={selections.hair[option.id as keyof typeof selections.hair]}
                    onChange={(e) => onHairChange(option.id, e.target.value)}
                />
            ))}
        </div>
      </Accordion>

      <Accordion title="Clothing">
        {Object.entries(clothingOptions).map(([key, value]) => (
            <Accordion key={key} title={value.label}>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-2 bg-gray-900/50 rounded-md">
                    {value.options.map(option => (
                        <SelectInput
                            key={option.id}
                            label={option.label}
                            options={option.options}
                            value={selections.clothing[key as keyof typeof selections.clothing][option.id as keyof typeof selections.clothing.onePiece]}
                            onChange={(e) => onClothingChange(key as any, option.id, e.target.value)}
                        />
                    ))}
                 </div>
            </Accordion>
        ))}
      </Accordion>

      <Accordion title="Footwear">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {footwearOptions.map(option => (
                <SelectInput 
                    key={option.id}
                    label={option.label}
                    options={option.options}
                    value={selections.footwear[option.id as keyof typeof selections.footwear]}
                    onChange={(e) => onFootwearChange(option.id, e.target.value)}
                />
            ))}
        </div>
      </Accordion>

      <Accordion title="Accessories">
         {accessoriesOptions.map(category => (
            <Accordion key={category.id} title={category.label}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2 bg-gray-900/50 rounded-md">
                    {category.options.map(option => (
                         <SelectInput 
                            key={option.id}
                            label={option.label}
                            options={option.options}
                            value={selections.accessories[category.id as keyof typeof selections.accessories][option.id as keyof typeof selections.accessories.head]}
                            onChange={(e) => onAccessoriesChange(category.id as any, option.id, e.target.value)}
                        />
                    ))}
                </div>
            </Accordion>
         ))}
      </Accordion>

       <Accordion title="Pose">
        <div className="grid grid-cols-1 gap-3">
            <SelectInput 
                label="Select a Pose"
                options={poseOptions}
                value={selections.pose}
                onChange={(e) => onPoseChange(e.target.value)}
            />
        </div>
      </Accordion>

      <Accordion title="Lighting Effects">
        <div className="grid grid-cols-1 gap-3">
            <SelectInput 
                label="Select Lighting"
                options={lightingOptions}
                value={selections.lighting}
                onChange={(e) => onLightingChange(e.target.value)}
            />
        </div>
      </Accordion>
      
      <Accordion title="Background">
        <div className="grid grid-cols-1 gap-3">
            <SelectInput 
                label="Select a Background"
                options={backgroundOptions}
                value={selections.background}
                onChange={(e) => onBackgroundChange(e.target.value)}
            />
        </div>
      </Accordion>

      <Accordion title="Fine-tuning (Optional)">
         <textarea
            value={selections.fineTuning}
            onChange={(e) => onFineTuningChange(e.target.value)}
            placeholder="e.g., make the jeans ripped, add gold embroidery to the jacket, change eye color to blue..."
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
            rows={3}
          />
      </Accordion>
    </div>
  );
};