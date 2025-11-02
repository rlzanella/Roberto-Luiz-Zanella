

import { strings } from "../i18n/strings";
// FIX: Import ClothingCategory to enable strong typing for clothing selections.
import { optionsData, ClothingCategory } from '../data/wardrobeOptions';

interface ClothingItem {
  type: string;
  style: string[];
  fabric?: string;
  color: string;
  pattern: string;
  // For 'traditional' category
  headwear?: string;
  top?: string;
  bottom?: string;
  featherColors: string[];
  bodyPaintColors: string[];
}

// Type Definitions
export interface WardrobeSelections {
  visualStyle: string;
  imageStyle: { style: string; age: string };
  decade: string;
  themeCostume: string;
  hair: { [key: string]: string };
  clothing: {
    // FIX: Use ClothingCategory to ensure only valid clothing keys are used.
    [key in ClothingCategory]: ClothingItem;
  };
  footwear: { [key: string]: string };
  accessories: {
    [key: string]: {
      [key: string]: string;
    };
  };
  pose: string;
  poseDetail: string[];
  lighting: string;
  background: string;
  fineTuning: string;
}

const SENSITIVE_STRINGS = ['thong', 'garter', 'bikini', 'monokini', 'bodysuit', 'corset', 'bustier', 'lingerie', 'stockings', 'underwear', 'bra', 'panties', 'sheer', 'low-cut', 'deep v-neck', 'mini'];


// --- Translation Logic ---
const ptToEnMap = new Map<string, string>();

function traverseAndMap(enObj: any, ptObj: any) {
  if (enObj && ptObj && typeof enObj === 'object' && typeof ptObj === 'object') {
    if (enObj.hasOwnProperty('value') && ptObj.hasOwnProperty('value')) {
      if (ptObj.value && enObj.value && ptObj.value !== enObj.value) {
        ptToEnMap.set(ptObj.value, enObj.value);
      }
    }

    if (Array.isArray(enObj) && Array.isArray(ptObj)) {
      for (let i = 0; i < Math.min(enObj.length, ptObj.length); i++) {
        traverseAndMap(enObj[i], ptObj[i]);
      }
    } else {
      for (const key in enObj) {
        if (Object.prototype.hasOwnProperty.call(enObj, key) && Object.prototype.hasOwnProperty.call(ptObj, key)) {
          traverseAndMap(enObj[key], ptObj[key]);
        }
      }
    }
  }
}

// Initial traversal for most options
traverseAndMap(optionsData.en, optionsData.pt);

// Fix: Special handling for `poseDetailsByPose` because its keys are also translated values.
// This aligns the keys using the `poseOptions` arrays, which are in the same order,
// ensuring the nested detail values are correctly mapped.
const enPoseKeys = optionsData.en.poseOptions.map(p => p.value);
const ptPoseKeys = optionsData.pt.poseOptions.map(p => p.value);

for (let i = 0; i < enPoseKeys.length; i++) {
    const enKey = enPoseKeys[i];
    const ptKey = ptPoseKeys[i];

    if (enKey && ptKey) {
        const enDetails = optionsData.en.poseDetailsByPose[enKey];
        const ptDetails = optionsData.pt.poseDetailsByPose[ptKey];

        // Now traverse the corresponding detail arrays to map their values
        if (enDetails && ptDetails) {
            traverseAndMap(enDetails, ptDetails);
        }
    }
}


function translateObject(obj: any): any {
    if (typeof obj === 'string') {
        return ptToEnMap.get(obj) || obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => translateObject(item));
    }
    if (typeof obj === 'object' && obj !== null) {
        const newObj: any = {};
        for (const key in obj) {
            newObj[key] = translateObject(obj[key]);
        }
        return newObj;
    }
    return obj;
}

export function translateSelectionsToEn(selections: WardrobeSelections): WardrobeSelections {
    const translated = translateObject(selections);
    // Restore free-text fields that are translated separately by the API
    translated.fineTuning = selections.fineTuning;
    translated.imageStyle.age = selections.imageStyle.age;
    return translated;
}


// --- Empty Check Logic ---
// FIX: Moved `isObjectEmpty` out of `areSelectionsEmpty` to module scope.
// This resolves the "Cannot find name 'isObjectEmpty'" error by making the
// helper function available to other functions within this file, such as `generatePromptFromSelections`.
const isObjectEmpty = (obj: { [key: string]: any }): boolean => {
  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
        if (value.length > 0) return false;
    } else if (typeof value === 'object' && value !== null) {
      if (!isObjectEmpty(value)) return false;
    } else if (value) {
      return false;
    }
  }
  return true;
};

export function areSelectionsEmpty(selections: WardrobeSelections): boolean {
  if (selections.visualStyle || selections.imageStyle.style || selections.imageStyle.age || selections.decade || selections.themeCostume || selections.pose || selections.lighting || selections.background || selections.fineTuning) {
    return false;
  }
  if (selections.poseDetail.length > 0) return false;

  if (!isObjectEmpty(selections.hair) || !isObjectEmpty(selections.clothing) || !isObjectEmpty(selections.footwear) || !isObjectEmpty(selections.accessories)) {
    return false;
  }

  return true;
}

// --- Prompt Generation Logic ---

const t = strings.en.prompt;

const genderedCostumes: { [key: string]: { Male: string; Female: string } } = {
  'Superman or Supergirl costume': { Male: 'Superman costume', Female: 'Supergirl costume' },
  'Batman or Batgirl costume': { Male: 'Batman costume', Female: 'Batgirl costume' },
  'Spider-Man or Spider-Gwen costume': { Male: 'Spider-Man costume', Female: 'Spider-Gwen costume' },
  'Iron Man or Rescue armor': { Male: 'Iron Man armor', Female: 'Rescue armor' },
};

const femaleStyleOverrides: { [key: string]: { [key: string]: string } } = {
    'Batman or Batgirl costume': {
        'classic 1960s (Adam West) style': 'classic 1960s (Yvonne Craig) style'
    }
};

const fullOutfits = ['dress', 'jumpsuit', 'romper', 'business suit', 't tuxedo', 'formal jumpsuit', 'tracksuit'];

const poseToBackgroundMap: { [key: string]: string[] } = {
    'standing': ['a minimalist urban backdrop', 'a professional office setting', 'a bustling city street during golden hour'],
    'sitting': ['an elegant lounge with a plush armchair', 'a cozy cafe', 'a park bench in autumn'],
    'lying down': ['a luxurious bedroom with silk sheets', 'a sun-drenched beach', 'a plush rug in front of a fireplace', 'a modern hotel bathroom by a large bathtub'],
    'kneeling': ['a serene garden', 'a grand, historic church', 'the stone floor of a dark dungeon'],
    'running': ['a city park running track', 'a scenic coastal path', 'a dark alleyway at night'],
    'jumping': ['an open field with a clear blue sky', 'a music festival crowd', 'a vibrant, graffiti-covered skatepark'],
    'dancing': ['a grand ballroom with ornate decor', 'a vibrant nightclub with neon lights', 'a rooftop party at sunset'],
    'walking': ['a bustling city street during golden hour', 'a quiet forest trail', 'a futuristic cyberpunk city street'],
};

const poseDetailToBackgroundMap: { [key: string]: string[] } = {
    'with arms crossed': ['a dark, gritty urban alleyway with moody lighting', 'a rooftop overlooking a city at night'],
    'meditating peacefully': ['a tranquil Japanese garden with a koi pond', 'a serene temple interior', 'a secluded waterfall oasis'],
    'leaning against a wall': ['a gritty brick wall in an urban alley', 'the exterior of a modern art gallery'],
    'sprinting': ['an olympic running track', 'escaping down a futuristic spaceship corridor'],
    'twirling': ['an opulent ballroom with crystal chandeliers', 'an open field of wildflowers'],
    'looking up': ['the base of a towering skyscraper', 'stargazing in a clear night sky', 'looking up at a cathedral ceiling']
};

const clothingToBackgroundMap: { [key: string]: string[] } = {
    'ball gown': ['an opulent ballroom with crystal chandeliers'],
    'jumpsuit': ['a rooftop party at sunset', 'a modern art gallery'],
    'business suit': ['a professional office setting', 'a modern skyscraper lobby'],
    'tuxedo': ['a grand ballroom with ornate decor', 'a red carpet event'],
    'tracksuit': ['a city park running track', 'an urban basketball court'],
    'sports bra': ['a modern gym', 'a yoga studio'],
    'activewear leggings': ['a modern gym', 'a yoga studio'],
    'pajama set': ['a luxurious bedroom with silk sheets', 'a cozy living room with a fireplace'],
    'nightgown': ['a luxurious bedroom with silk sheets'],
    'superman': ['the sky above a metropolis'],
    'supergirl': ['the sky above a metropolis'],
    'batman': ['a dark, gritty urban alleyway with moody lighting', 'a rooftop overlooking a gothic city at night'],
    'batgirl': ['a dark, gritty urban alleyway with moody lighting', 'a rooftop overlooking a gothic city at night'],
    'wonder woman': ['the ruins of an ancient Greek temple'],
    'darth vader': ['the command bridge of a futuristic spaceship'],
    'loki': ['a grand, historic church', 'a mischievous magical forest'],
    'maleficent': ['an enchanted, magical forest at twilight', 'a dark throne room in a gothic castle'],
    'rags': ['a dark and moody gothic dungeon with stone walls and chains', 'a dark, oppressive prison cell with a single barred window', 'a crumbling castle crypt filled with cobwebs'],
    'tunic': ['an ancient, moss-covered dungeon corridor lit by torches', 'an enchanted, magical forest at twilight'],
    'prisoner': ['a dark, oppressive prison cell with a single barred window', 'a torture chamber with ominous devices in the shadows', 'a dark, damp underground sewer tunnel'],
};

const traditionalAttireToBackgroundMap: { [key: string]: string[] } = {
    'Plains Nations': ['a vast, open prairie at sunset with rolling hills', 'a tipi village on the Great Plains under a wide-open sky'],
    'Kayapo': ['a traditional village clearing in the Amazon rainforest', 'beside a winding river in the heart of the jungle'],
    'Japanese Kimono': ['a tranquil japanese garden with a koi pond', 'a traditional Japanese tea house', 'a street in Kyoto during cherry blossom season'],
    'Indian Sari': ['the steps of a grand Indian palace', 'a bustling market in Delhi', 'in front of the Taj Mahal at sunrise'],
    'Scottish Highland Dress': ['the misty Scottish Highlands with rolling green hills', 'in front of a historic Scottish castle like Eilean Donan', 'a traditional Highland Games event'],
    'Maasai': ['the Maasai Mara savanna at sunrise with acacia trees', 'a traditional Maasai village (Kraal) with mud huts', 'observing wildlife on the Serengeti plains'],
    'South Korean Hanbok': ['the courtyard of Gyeongbok Palace in Seoul', 'a traditional Hanok village with curved tile roofs', 'a serene bamboo forest'],
    'Vietnamese Áo Dài': ['a street in the Old Quarter of Hanoi with bustling cyclos', 'floating down the Mekong Delta on a sampan boat', 'the ancient town of Hoi An with its colorful lanterns'],
    'Andean': ['the ancient ruins of Machu Picchu at dawn', 'the streets of Cusco, Peru with Inca stonework', 'the salt flats of Salar de Uyuni, Bolivia'],
};


function getSuggestedBackground(selections: WardrobeSelections): string | null {
    const { pose, poseDetail, clothing } = selections;
    
    // 1. Highest priority: Traditional Attire suggestions
    const traditionalType = clothing.traditional.type;
    if (traditionalType) {
        const translatedType = ptToEnMap.get(traditionalType) || traditionalType;
        for (const key in traditionalAttireToBackgroundMap) {
            if (translatedType.includes(key)) {
                const suggestions = traditionalAttireToBackgroundMap[key as keyof typeof traditionalAttireToBackgroundMap];
                return suggestions[Math.floor(Math.random() * suggestions.length)];
            }
        }
    }

    // 2. High priority: Pose Detail suggestions
    const detailSuggestions: string[] = [];
    const translatedDetails = poseDetail.map(d => ptToEnMap.get(d) || d);
    for (const detail of translatedDetails) {
        if (poseDetailToBackgroundMap[detail]) {
            detailSuggestions.push(...poseDetailToBackgroundMap[detail]);
        }
    }
    if (detailSuggestions.length > 0) {
        return detailSuggestions[Math.floor(Math.random() * detailSuggestions.length)];
    }

    // 3. Medium priority: Clothing suggestions
    const clothingSuggestions: string[] = [];
    const allClothingTypes = [
        clothing.onePiece.type,
        clothing.suits.type,
        clothing.activewear.type,
        clothing.sleepwear.type,
        clothing.fantasy.type,
    ].filter(Boolean);

    for (const type of allClothingTypes) {
        const translatedType = (ptToEnMap.get(type) || type).toLowerCase();
        for (const key in clothingToBackgroundMap) {
            if (translatedType.includes(key)) {
                 clothingSuggestions.push(...clothingToBackgroundMap[key as keyof typeof clothingToBackgroundMap]);
            }
        }
    }
    if (clothingSuggestions.length > 0) {
        return clothingSuggestions[Math.floor(Math.random() * clothingSuggestions.length)];
    }
    
    // 4. Low priority: General pose suggestions
    const poseSuggestions: string[] = [];
    const translatedPose = ptToEnMap.get(pose) || pose;
    if (poseToBackgroundMap[translatedPose]) {
        poseSuggestions.push(...poseToBackgroundMap[translatedPose]);
    }
    if (poseSuggestions.length > 0) {
        return poseSuggestions[Math.floor(Math.random() * poseSuggestions.length)];
    }

    return null;
}


function buildItemAttributeList(item: { [key: string]: any }): string {
  const parts: string[] = [];
  if (item.type) parts.push(item.type);
  // FIX: `item.style` can be a string (for hair) or string[] (for clothing).
  // This handles both cases correctly instead of spreading a string into characters,
  // which likely caused a type inference issue downstream.
  if (item.style && item.style.length > 0) {
    if (Array.isArray(item.style)) {
      parts.push(...item.style);
    } else {
      parts.push(item.style);
    }
  }
  if (item.length) parts.push(item.length);
  if (item.fabric) parts.push(`made of ${item.fabric}`);
  if (item.material) parts.push(`made of ${item.material}`);
  if (item.color) parts.push(item.color);
  // FIX: Added a `typeof` check to ensure `item.pattern` is a string before pushing it,
  // preventing a TypeScript error where it could be inferred as an object.
  if (item.pattern && typeof item.pattern === 'string') parts.push(item.pattern);
  return parts.join(', ');
}

// FIX: A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.
// Completed the function to ensure it always returns a value (string[]), fixing the error.
function buildSection(title: string, obj: { [key: string]: any }, skipEmptyCheck = false): string[] {
  // FIX: Changed implicit boolean check `v` to explicit `!!v` to prevent type inference issues.
  if (skipEmptyCheck || Object.values(obj).some(v => (Array.isArray(v) ? v.length > 0 : !!v))) {
    const content = Object.entries(obj)
      .map(([key, value]) => {
        // FIX: The original check was implicitly converting non-array values to booleans,
        // which could lead to type inference issues. Making the check explicit with `!!v`
        // helps TypeScript understand the logic and resolve the type error during prompt generation.
        if (typeof value === 'object' && value !== null && Object.values(value).some(v => (Array.isArray(v) ? v.length > 0 : !!v))) {
          const attributes = buildItemAttributeList(value);
          if (attributes) {
            const titleKey = `prompt.${key}Accessories` as keyof typeof t; // special handle for accessories
            const sectionTitle = titleKey in t ? t[titleKey] : key.charAt(0).toUpperCase() + key.slice(1);
            return `- **${sectionTitle}:** ${attributes}`;
          }
        }
        return null;
      })
      .filter((v): v is string => v !== null);

    if (content.length > 0) {
      return [`### ${title}`, ...content];
    }
  }
  return [];
}

// FIX: Module '"./utils/wardrobeUtils"' has no exported member 'generatePromptFromSelections'.
// Added the missing 'generatePromptFromSelections' function and exported it.
export function generatePromptFromSelections(
  selections: WardrobeSelections,
  gender: 'Male' | 'Female' | 'Uncertain'
): string {
    let finalSelections = { ...selections };

    // Gender-specific costume adjustments
    if (finalSelections.themeCostume && genderedCostumes[finalSelections.themeCostume]) {
        const costumeKey = finalSelections.themeCostume as keyof typeof genderedCostumes;
        finalSelections.themeCostume = genderedCostumes[costumeKey][gender] || finalSelections.themeCostume;
    }
    
    // Gender-specific style overrides
    if (finalSelections.themeCostume && femaleStyleOverrides[finalSelections.themeCostume] && gender === 'Female') {
        const costumeKey = finalSelections.themeCostume as keyof typeof femaleStyleOverrides;
        const clothingItem = finalSelections.clothing.fantasy;
        if (clothingItem) {
            clothingItem.style = clothingItem.style.map(s => femaleStyleOverrides[costumeKey][s] || s);
        }
    }

    const promptParts: string[] = [t.safetyPreamble];

    // New sensitive item detection logic
    const allSelectedClothingItems = new Set<string>();
    Object.values(finalSelections.clothing).forEach(item => {
        if (item.type) allSelectedClothingItems.add(item.type.toLowerCase());
        if (Array.isArray(item.style)) {
            item.style.forEach(s => {
                if (s) allSelectedClothingItems.add(s.toLowerCase());
            });
        }
    });

    const sensitiveItemsFound = [...allSelectedClothingItems].filter(item => 
        SENSITIVE_STRINGS.some(sensitive => item.includes(sensitive))
    );
    const sensitiveItemCount = sensitiveItemsFound.length;

    if (sensitiveItemCount > 1) {
        promptParts.push(t.multipleSensitiveCategoriesInstruction);
    } else if (sensitiveItemCount > 0) {
        promptParts.push(t.sensitiveCategoryInstruction);
    }
    if (finalSelections.clothing.traditional.type) {
        promptParts.push(t.culturalAttireInstruction);
    }

    // Main goal / artistic style
    if (finalSelections.visualStyle || finalSelections.imageStyle.style || finalSelections.imageStyle.age) {
      promptParts.push(`\n## ${t.mainGoalArtistic}`);
      let style = finalSelections.visualStyle || t.artisticStyleDefault;
      if (finalSelections.imageStyle.style) {
          style = `${style} in the style of ${finalSelections.imageStyle.style}.`;
      }
      let artisticInstruction = t.mainGoalArtisticInstruction.replace('{style}', style);
      if (finalSelections.imageStyle.age) {
          artisticInstruction += t.mainGoalArtisticAgeInstruction.replace('{age}', finalSelections.imageStyle.age);
      }
      promptParts.push(artisticInstruction);
      promptParts.push(`\n${t.detailedTransformationRules}`);
      promptParts.push(t.ruleKeepPose);
      promptParts.push(t.ruleReinterpret);
      promptParts.push(t.ruleApplyModifications);
    } else {
      promptParts.push(t.criticalInstruction);
    }
    
    promptParts.push(`\n${t.requestedModifications}`);
    promptParts.push(t.requestedModificationsInstruction);

    // Decade/Theme
    if (finalSelections.decade && finalSelections.decade !== 'current') {
      const isFullOutfit = finalSelections.themeCostume || fullOutfits.some(o => finalSelections.clothing.onePiece.type.includes(o) || finalSelections.clothing.suits.type.includes(o));

      if (finalSelections.themeCostume) {
          const costumeText = t.decadeThemeInstructionWithCostume
              .replace('{decade}', finalSelections.decade)
              .replace('{costume}', finalSelections.themeCostume);
          promptParts.push(`- **${t.decadeTheme}:** ${costumeText}`);
      } else if (isObjectEmpty(finalSelections.clothing)) {
          const instruction = t.decadeThemeInstructionNoClothes.replace('{decade}', finalSelections.decade);
          promptParts.push(`- **${t.decadeTheme}:** ${instruction}`);
      } else {
          const instruction = t.decadeThemeInstruction.replace('{decade}', finalSelections.decade);
          promptParts.push(`- **${t.decadeTheme}:** ${instruction}`);
      }
    }

    // Hair
    const hairAttributes = buildItemAttributeList(finalSelections.hair);
    if (hairAttributes) {
      promptParts.push(`### ${t.hair}`, `- ${hairAttributes}`);
    }

    // Clothing
    const clothingSections: string[] = [];
    Object.entries(finalSelections.clothing)
      .forEach(([key, value]) => {
        const clothingCategory = key as ClothingCategory;
        let attributes: string | null = null;
        
        if (clothingCategory === 'traditional' && value.type) {
            const parts = [value.type];
            if (value.headwear) parts.push(value.headwear);
            if (value.top) parts.push(value.top);
            if (value.bottom) parts.push(value.bottom);
            if (value.featherColors.length > 0) parts.push(`with ${value.featherColors.join(' and ')} feathers`);
            if (value.bodyPaintColors.length > 0) parts.push(`with ${value.bodyPaintColors.join(' and ')} body paint`);
            attributes = parts.join(', ');
        } else {
            attributes = buildItemAttributeList(value);
        }
        
        if (attributes) {
          const titleKey = `prompt.${clothingCategory}` as keyof typeof t;
          const sectionTitle = titleKey in t ? t[titleKey] : clothingCategory.charAt(0).toUpperCase() + clothingCategory.slice(1);
          clothingSections.push(`### ${sectionTitle}`, `- ${attributes}`);
        }
      });

    if (clothingSections.length > 0) {
      const hasFullOutfit = finalSelections.clothing.onePiece.type || finalSelections.clothing.suits.type || finalSelections.themeCostume || (finalSelections.clothing.fantasy.type && (finalSelections.clothing.fantasy.type.includes('costume') || finalSelections.clothing.fantasy.type.includes('armor')));
      if (hasFullOutfit) {
          promptParts.push(`### ${t.clothing}`, t.ruleRemoveOutfit, ...clothingSections);
      } else {
          promptParts.push(...clothingSections);
      }
    }

    // Footwear
    const footwearAttributes = buildItemAttributeList(finalSelections.footwear);
    if (footwearAttributes) {
      promptParts.push(`### ${t.footwear}`, `- ${footwearAttributes}`);
    }
    
    // Accessories
    promptParts.push(...buildSection(t.accessories, finalSelections.accessories));
    
    const suggestedBackground = getSuggestedBackground(finalSelections);
    const background = finalSelections.background || suggestedBackground || '';
    const pose = finalSelections.pose;

    if (pose && background) {
        const poseDetailsText = finalSelections.poseDetail.length > 0 ? t.poseDetailsJoiner.replace('{details}', finalSelections.poseDetail.join(', ')) : '';
        const instruction = t.fashionPhotoInstruction
            .replace('{pose}', pose)
            .replace('{poseDetailsText}', poseDetailsText)
            .replace('{background}', background);
        promptParts.push(`\n### ${t.fashionPhotoDirection}`, instruction);
    } else {
        if (pose) {
            let poseInstruction = t.poseInstruction.replace('{pose}', pose);
            if (finalSelections.poseDetail.length > 0) {
                poseInstruction += ' ' + t.poseDetailsInstruction.replace('{details}', finalSelections.poseDetail.join(', '));
            }
            promptParts.push(`### ${t.pose}`, `- ${poseInstruction}`);
        }
        if (background) {
            promptParts.push(`### ${t.background}`, `- ${t.backgroundInstruction.replace('{background}', background)}`);
        }
    }

    // Lighting
    if (finalSelections.lighting) {
      promptParts.push(`### ${t.lighting}`, `- ${t.lightingInstruction.replace('{lighting}', finalSelections.lighting)}`);
    }

    // Fine Tuning
    if (finalSelections.fineTuning) {
      promptParts.push(`### ${t.additionalInstructions}`, `- ${finalSelections.fineTuning}`);
    }

    return promptParts.filter(p => p && p.trim()).join('\n\n');
}