export interface WardrobeSelections {
  visualStyle: string;
  hair: {
    length: string;
    style: string;
    color: string;
  };
  clothing: {
    onePiece: { type: string; style: string; fabric: string; color: string; pattern: string; };
    tops: { type: string; style: string; fabric: string; color: string; pattern: string; };
    bottoms: { type: string; style: string; fabric: string; color: string; pattern: string; };
    stockings: { type: string; style: string; fabric: string; color: string; pattern: string; };
    outerwear: { type: string; style: string; fabric: string; color: string; pattern: string; };
  };
  footwear: {
    type: string;
    material: string;
    color: string;
  };
  accessories: {
    head: { type: string; material: string; };
    neck: { type: string; material: string; };
    ears: { type: string; material: string; };
    wrists: { type: string; material: string; };
    other: { type: string; material: string; };
  };
  pose: string;
  lighting: string;
  background: string;
  fineTuning: string;
}

function hasSelection(obj: object): boolean {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = (obj as any)[key];
            if (typeof value === 'object' && value !== null) {
                if (hasSelection(value)) return true;
            } else if (typeof value === 'string' && value.trim() !== '') {
                return true;
            }
        }
    }
    return false;
}

export function areSelectionsEmpty(selections: WardrobeSelections): boolean {
    return !hasSelection(selections);
}

/**
 * Builds a list of markdown bullet points for a given item's selected attributes.
 * e.g., ['  - Type: t-shirt', '  - Color: red']
 */
function buildItemAttributeList(selection: { [key: string]: string }): string[] {
    const attributes: string[] = [];
    // The order can influence the model, so let's try a sensible one.
    const attributeOrder = ['type', 'style', 'length', 'fabric', 'material', 'color', 'pattern'];
    
    for(const key of attributeOrder) {
        const value = selection[key];
        if (value) {
            // Special case: don't list pattern if it's just 'solid color' as that's implied by a color choice.
            if (key === 'pattern' && value === 'solid color') continue;
            
            // Capitalize first letter for display
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
            attributes.push(`  - ${formattedKey}: ${value}`);
        }
    }
    return attributes;
}


export function generatePromptFromSelections(selections: WardrobeSelections): string {
  const promptParts: string[] = [];

  // 1. Core instruction to preserve identity. This is the most critical part.
  promptParts.push(
    "CRITICAL INSTRUCTION: You MUST preserve the person's identity from the original photo. Do NOT change their face, facial features, skin tone, body shape, or ethnicity. The person in the output image must be perfectly and unmistakably recognizable as the same person from the input image."
  );

  // 2. Set the overall visual style of the output image.
  if (selections.visualStyle) {
    promptParts.push(`**Artistic Style:** ${selections.visualStyle}`);
  } else {
    promptParts.push("**Artistic Style:** A realistic, high-resolution photograph.");
  }

  // 3. Create a clear, itemized list of modifications.
  const modifications: string[] = [];

  // Hair
  const hairAttributes = buildItemAttributeList(selections.hair);
  if (hairAttributes.length > 0) {
    modifications.push(`**Hair:**\n${hairAttributes.join('\n')}`);
  }

  // Clothing
  const clothingMods: string[] = [];
  const onePieceAttributes = buildItemAttributeList(selections.clothing.onePiece);
  
  // A one-piece outfit replaces separate tops and bottoms.
  if (onePieceAttributes.length > 0) {
    clothingMods.push(`- **One-Piece:**\n${onePieceAttributes.join('\n')}`);
  } else {
    const topAttributes = buildItemAttributeList(selections.clothing.tops);
    if (topAttributes.length > 0) {
      clothingMods.push(`- **Top:**\n${topAttributes.join('\n')}`);
    }
    const bottomAttributes = buildItemAttributeList(selections.clothing.bottoms);
    if (bottomAttributes.length > 0) {
      clothingMods.push(`- **Bottoms:**\n${bottomAttributes.join('\n')}`);
    }
  }
  
  // Hosiery and outerwear can be layered with anything.
  const stockingAttributes = buildItemAttributeList(selections.clothing.stockings);
  if (stockingAttributes.length > 0) {
    clothingMods.push(`- **Hosiery:**\n${stockingAttributes.join('\n')}`);
  }

  const outerwearAttributes = buildItemAttributeList(selections.clothing.outerwear);
  if (outerwearAttributes.length > 0) {
    clothingMods.push(`- **Outerwear:**\n${outerwearAttributes.join('\n')}`);
  }
  
  if (clothingMods.length > 0) {
    modifications.push(`**Clothing:**\n${clothingMods.join('\n')}`);
  }

  // Footwear
  const footwearAttributes = buildItemAttributeList(selections.footwear);
  if (footwearAttributes.length > 0) {
    modifications.push(`**Footwear:**\n${footwearAttributes.join('\n')}`);
  }

  // Accessories
  const accessoryMods: string[] = [];
  const accessoryCategories = {
      'Headwear': selections.accessories.head,
      'Neckwear': selections.accessories.neck,
      'Earrings': selections.accessories.ears,
      'Wristwear': selections.accessories.wrists,
      'Other': selections.accessories.other
  };

  for (const [categoryName, categorySelection] of Object.entries(accessoryCategories)) {
      const attributes = buildItemAttributeList(categorySelection);
      if (attributes.length > 0) {
          accessoryMods.push(`- **${categoryName}:**\n${attributes.join('\n')}`);
      }
  }
  if (accessoryMods.length > 0) {
    modifications.push(`**Accessories:**\n${accessoryMods.join('\n')}`);
  }

  // Pose, Scene, and Fine-tuning
  if (selections.pose) {
    modifications.push(`**Pose:** Change to ${selections.pose}.`);
  }
  if (selections.lighting) {
    modifications.push(`**Lighting:** Change to ${selections.lighting}.`);
  }
  if (selections.background) {
    modifications.push(`**Background:** Change to ${selections.background}.`);
  }
  if (selections.fineTuning) {
    modifications.push(`**Additional Instructions:** ${selections.fineTuning}`);
  }

  // 4. Combine modifications into a final instruction set.
  if (modifications.length > 0) {
    promptParts.push("\n**Modifications Requested:**\nPlease apply ONLY the following changes to the person in the photo, based on this structured list. Do not change any other attributes.");
    promptParts.push(...modifications);
  }

  return promptParts.join('\n\n');
}