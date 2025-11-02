export interface Option { label: string; value: string; }
export interface StyleOption extends Option { styles?: Option[]; }
export interface ThemeOption extends Option { costumes?: Option[]; }
export type ClothingCategory = 'onePiece' | 'tops' | 'bottoms' | 'stockings' | 'outerwear' | 'suits' | 'activewear' | 'sleepwear' | 'fantasy' | 'underwear' | 'swimwear' | 'traditional';

export interface FootwearTypeOption extends Option {
    materials: Option[];
    colors: Option[];
}

export interface WardrobeOptions {
  visualStyleOptions: Option[];
  imageStyleOptions: Option[];
  decadeOptions: ThemeOption[];
  hairOptions: Array<{ id: string; label: string; options: Option[] }>;
  clothingOptions: {
    [key in ClothingCategory]?: {
      label: string;
      options: {
        // FIX: Changed type to StyleOption[] as all provided data objects for clothing types include a 'styles' property. This resolves type inference issues in WardrobeBuilder.tsx.
        types: StyleOption[];
        fabrics?: Option[];
        colors?: Option[];
        patterns?: Option[];
        // For 'traditional' category
        headwear?: Option[];
        tops?: Option[];
        bottoms?: Option[];
        featherColors?: Option[];
        bodyPaintColors?: Option[];
      };
    };
  };
  footwearOptions: {
    types: FootwearTypeOption[];
  };
  accessoriesOptions: Array<{
    id: string;
    label: string;
    options: Array<{ id: string; label: string; options: Option[] }>;
  }>;
  poseOptions: Option[];
  poseDetailsByPose: { [key: string]: Option[] };
  lightingOptions: Option[];
  backgroundOptions: Option[];
}

export const optionsData: { [key in 'en' | 'pt']: WardrobeOptions } = {
  en: {
    visualStyleOptions: [
      { label: "Photorealistic", value: "A high-resolution, photorealistic image." },
      { label: "Digital Art", value: "A detailed and vibrant digital illustration." },
      { label: "Oil Painting", value: "A classical oil painting with rich textures." },
      { label: "Watercolor", value: "A soft and flowing watercolor painting." },
      { label: "Charcoal Sketch", value: "A dramatic black and white charcoal sketch." },
      { label: "Anime Style", value: "A vibrant 90s anime style." },
      { label: "3D Render", value: "A cinematic 3D render, like an animated movie character." },
      { label: "Vintage Photograph", value: "The look of a vintage photograph, shot on 35mm film." },
      { label: "Fantasy Art", value: "Epic fantasy concept art with magical elements." },
      { label: "Street Art (Graffiti)", value: "A vibrant and edgy graffiti street art style." },
      { label: "Graphic Novel Art", value: "A bold, inked graphic novel or comic book style." },
    ],
    imageStyleOptions: [
        { label: "Default (None)", value: "" },
        { label: "Pixar Animation", value: "Pixar animated movie style" },
        { label: "Disney Animation", value: "Disney animated movie style" },
        { label: "Tim Burton Style", value: "Tim Burton's signature gothic and quirky animation style" },
        { label: "Studio Ghibli", value: "Studio Ghibli's hand-drawn anime style" },
        { label: "Grand Theft Auto Style", value: "Grand Theft Auto video game art style" },
        { label: "The Simpsons Style", value: "The Simpsons cartoon animation style" },
        { label: "Rick and Morty Style", value: "Rick and Morty cartoon animation style" },
        { label: "Claymation Style", value: "Aardman-style claymation, like Wallace and Gromit" },
        { label: "LEGO Figurine Style", value: "a LEGO figurine" },
        { label: "Final Fantasy VII Style", value: "Final Fantasy VII Remake video game art style" },
        { label: "Zelda: Breath of the Wild", value: "The Legend of Zelda: Breath of the Wild video game art style" },
        { label: "Dark Fantasy Art", value: "Dark Souls / Bloodborne video game concept art style" },
        { label: "Cyberpunk", value: "Cyberpunk 2077 video game art style" },
        { label: "Steampunk", value: "Steampunk concept art style" },
        { label: "Marvel Comics Style", value: "Classic Marvel comic book art style" },
        { label: "DC Comics (New 52)", value: "DC Comics New 52 art style" },
        { label: "Ukiyo-e Style", value: "Japanese Ukiyo-e woodblock print style" },
        { label: "Stained Glass Window", value: "a vibrant, intricate stained glass window" },
        { label: "Art Deco", value: "Art Deco poster style" },
        { label: "Pop Art", value: "Andy Warhol's Pop Art style" },
        { label: "Surrealism", value: "Salvador Dali's surrealist painting style" },
        { label: "Impressionism", value: "Claude Monet's impressionist painting style" },
        { label: "Cubism", value: "Pablo Picasso's cubist painting style" },
    ],
    decadeOptions: [
      { label: "Current", value: "current" },
      { label: "2020s", value: "2020s" },
      { label: "2010s", value: "2010s" },
      { label: "2000s (Y2K)", value: "2000s (Y2K)" },
      { label: "1990s", value: "1990s" },
      { label: "1980s", value: "1980s" },
      { label: "1970s", value: "1970s" },
      { label: "1960s", value: "1960s" },
      { label: "1950s", value: "1950s" },
      { label: "1940s", value: "1940s" },
      { label: "1930s", value: "1930s" },
      { label: "1920s", value: "1920s" },
      { label: "1910s", value: "1910s" },
      { label: "1900s", value: "1900s" },
      { label: "1890s", value: "1890s" },
      { label: "1880s", value: "1880s" },
      { label: "1870s", value: "1870s" },
      { label: "1860s", value: "1860s" },
      { label: "1850s", value: "1850s" },
      { label: "1840s", value: "1840s" },
      { label: "1830s", value: "1830s" },
      { label: "1820s", value: "1820s" },
      { label: "1810s", value: "1810s" },
      { label: "1800s", value: "1800s" },
      { label: "Edwardian Era", value: "Edwardian Era", costumes: [ { label: "Aristocrat", value: "a formal Edwardian aristocrat outfit, such as a long, high-collared 'S-bend' corset dress for women or a three-piece lounge suit for men, with smart leather shoes or boots." }, { label: "Suffragette", value: "the attire of an Edwardian suffragette, often a practical white dress or blouse with a long skirt, and sensible walking boots." }, { label: "Servant", value: "a simple and functional servant's uniform from the Edwardian era, like a maid's black dress with a white apron and cap, and plain black shoes." } ] },
      { label: "Victorian Era", value: "Victorian Era", costumes: [ { label: "Upper Class", value: "an elegant Victorian upper-class outfit, like a corset dress with a bustle for women or a frock coat for men, with polished leather boots." }, { label: "Working Class", value: "the worn, practical clothing of the Victorian working class, such as simple dresses or trousers with waistcoats, and sturdy, worn work boots." }, { label: "Gothic", value: "gothic" }, { label: "Steampunk", value: "steampunk" } ] },
      { label: "Regency Era", value: "Regency Era" },
      { label: "Rococo Era", value: "Rococo Era" },
      { label: "Baroque Era", value: "Baroque Era" },
      { label: "Renaissance Era", value: "Renaissance Era", costumes: [ { label: "Noble", value: "an opulent Renaissance noble outfit, with rich fabrics like velvet and brocade, and soft leather shoes." }, { label: "Artist", value: "the practical yet stylish clothes of a Renaissance artist, like a loose shirt, breeches, and simple leather shoes." }, { label: "Merchant", value: "the well-to-do clothing of a Renaissance merchant, showing wealth with fur-lined robes and sturdy leather shoes." } ] },
      { label: "Medieval Era", value: "Medieval Era", costumes: [ { label: "Commoner", value: "the simple, roughspun clothes of a medieval commoner, like a tunic and trousers, with simple leather shoes or foot wraps." }, { label: "Noble", value: "the luxurious attire of a medieval noble, such as a velvet gown or a fine doublet, complete with elegant leather shoes." }, { label: "Knight Armor", value: "a full suit of polished plate knight armor, from helmet to sabatons (foot armor)." }, { label: "Monk", value: "the humble brown robes of a monk, tied with a rope belt, and wearing simple leather sandals." } ] },
      { label: "Ancient Rome", value: "Ancient Roman", costumes: [ { label: "Citizen", value: "citizen" }, { label: "Senator", value: "senator" }, { label: "Soldier (Legionary)", value: "Full Roman legionary armor including lorica segmentata (segmented cuirass), galea helmet, red tunic, and caligae sandals." }, { label: "Gladiator", value: "Authentic gladiator gear: {{gladiator_chest}}, a subligaculum (loincloth), one manica (arm guard), one ocrea (greave on the left leg), a distinctive helmet, and leather sandals (caligae)." } ] },
      { label: "Ancient Greece", value: "Ancient Greek", costumes: [ { label: "Citizen", value: "a simple Greek chiton or peplos, and leather sandals." }, { label: "Philosopher", value: "a simple, draped himation over a chiton, with leather sandals, looking contemplative." }, { label: "Hoplite Soldier", value: "the full armor of a Greek hoplite soldier, including a bronze cuirass, helmet, greaves, and leather sandals." } ] },
      { label: "Ancient Egypt", value: "Ancient Egyptian", costumes: [ { label: "Royalty (Pharaoh/Queen)", value: "Regal attire of an Egyptian Pharaoh, including a golden Nemes headdress, an opulent Usekh collar adorned with lapis lazuli, a Shendyt kilt, and ornate golden sandals." }, { label: "Priest/Priestess", value: "The garb of an Egyptian priest, featuring a shaved head, simple white linen robes, and bare feet. High priests should also wear a leopard skin draped over one shoulder." }, { label: "Commoner", value: "Simple attire of an Egyptian commoner: a plain, undecorated linen kilt for men, or a simple, straight linen sheath dress for women, and they should be barefoot." } ] },
      { label: "Prehistoric", value: "Prehistoric" },
    ],
    hairOptions: [
      { id: 'length', label: 'Length', options: [ { label: 'Buzz Cut', value: 'buzz cut' }, { label: 'Pixie Cut', value: 'pixie cut' }, { label: 'Short Bob', value: 'short bob' }, { label: 'Medium Length', value: 'medium length' }, { label: 'Shoulder Length', value: 'shoulder length' }, { label: 'Long', value: 'long' }, { label: 'Extra Long', value: 'extra long' }, { label: 'Shaved', value: 'shaved head' } ] },
      { id: 'style', label: 'Style', options: [ { label: 'Straight', value: 'straight' }, { label: 'Wavy', value: 'wavy' }, { label: 'Curly', value: 'curly' }, { label: 'Coily', value: 'coily' }, { label: 'Braids', value: 'braids' }, { label: 'Cornrows', value: 'cornrows' }, { label: 'Dreadlocks', value: 'dreadlocks' }, { label: 'Bun', value: 'bun' }, { label: 'Messy Bun', value: 'messy bun' }, { label: 'Ponytail', value: 'ponytail' }, { label: 'High Ponytail', value: 'high ponytail' }, { label: 'Updo', value: 'updo' }, { label: 'Afro', value: 'afro' }, { label: 'Mohawk', value: 'mohawk' }, { label: 'Mullet', value: 'mullet' } ] },
      { id: 'color', label: 'Color', options: [ { label: 'Black', value: 'black' }, { label: 'Brown', value: 'brown' }, { label: 'Blonde', value: 'blonde' }, { label: 'Platinum Blonde', value: 'platinum blonde' }, { label: 'Red', value: 'red' }, { label: 'Auburn', value: 'auburn' }, { label: 'Deep Burgundy', value: 'deep burgundy' }, { label: 'Gray', value: 'gray' }, { label: 'Silver', value: 'silver' }, { label: 'White', value: 'white' }, { label: 'Pastel Pink', value: 'pastel pink' }, { label: 'Lilac', value: 'lilac' }, { label: 'Electric Blue', value: 'electric blue' }, { label: 'Turquoise', value: 'turquoise' }, { label: 'Emerald Green', value: 'emerald green' }, { label: 'Fiery Orange', value: 'fiery orange' }, { label: 'Rainbow', value: 'rainbow' } ] },
    ],
    clothingOptions: {
      onePiece: { label: 'One-Piece', options: {
        types: [
          { label: 'Dress', value: 'dress', styles: [ { label: 'Short (Mini)', value: 'short mini-length' }, { label: 'Knee-Length', value: 'knee-length' }, { label: 'Midi', value: 'midi-length' }, { label: 'Long (Maxi)', value: 'long maxi-length' }, { label: 'Low-Cut / Deep V-Neck', value: 'low-cut deep v-neck' }, { label: 'Off-Shoulder', value: 'off-shoulder' }, { label: 'One-Shoulder', value: 'one-shoulder' }, { label: 'Halter Neck', value: 'halter neck' }, { label: 'Strapless', value: 'strapless' }, { label: 'A-Line', value: 'A-line' }, { label: 'Bodycon', value: 'bodycon' }, { label: 'Sheath', value: 'sheath' }, { label: 'Fit and Flare', value: 'fit and flare' }, { label: 'Ball Gown', value: 'ball gown' }, { label: 'Mermaid', value: 'mermaid style' }, { label: 'With Slit', value: 'with a high leg slit' }, { label: 'Backless', value: 'backless' }, { label: 'Wrap Dress', value: 'wrap dress' }, { label: 'Slip Dress', value: 'slip dress' }, { label: 'Empire Waist', value: 'empire waist' }, { label: 'Peasant Dress', value: 'peasant dress' }, { label: 'Shirt Dress', value: 'shirt dress' }, { label: 'Sweater Dress', value: 'sweater dress' } ] },
          { label: 'Jumpsuit', value: 'jumpsuit', styles: [ { label: 'Wide-Leg', value: 'wide-leg' }, { label: 'Tapered Leg', value: 'tapered leg' }, { label: 'Strapless', value: 'strapless' }, { label: 'Long-Sleeved', value: 'long-sleeved' }, { label: 'Short-Sleeved', value: 'short-sleeved' }, { label: 'Halter Neck', value: 'halter neck' }, { label: 'Utility Jumpsuit', value: 'utility jumpsuit' }, { label: 'Culotte Jumpsuit', value: 'culotte jumpsuit' } ] },
          { label: 'Romper', value: 'romper', styles: [ { label: 'Off-Shoulder', value: 'off-shoulder' }, { label: 'Long-Sleeved', value: 'long-sleeved' }, { label: 'Spaghetti Straps', value: 'with spaghetti straps' }, { label: 'Button-Down', value: 'button-down' } ] },
          { label: 'Kaftan', value: 'kaftan', styles: [ { label: 'Embroidered', value: 'embroidered' }, { label: 'Sheer', value: 'sheer' } ] },
          { label: 'Overall Dress', value: 'overall dress', styles: [] },
          { label: 'Boiler Suit', value: 'boiler suit', styles: [] },
          { label: 'Gothic Lolita Dress', value: 'gothic lolita dress', styles: [ { label: 'Lace and Ribbons', value: 'with lace and ribbons' }, { label: 'Bell-Shaped Skirt', value: 'with a bell-shaped skirt' } ] },
        ],
        fabrics: [ { label: 'Cotton', value: 'cotton' }, { label: 'Denim', value: 'denim' }, { label: 'Leather', value: 'leather' }, { label: 'Latex', value: 'latex' }, { label: 'Silk', value: 'silk' }, { label: 'Linen', value: 'linen' }, { label: 'Wool', value: 'wool' }, { label: 'Satin', value: 'satin' }, { label: 'Velvet', value: 'velvet' }, { label: 'Lace', value: 'lace' }, { label: 'Chiffon', value: 'chiffon' }, { label: 'Sequin', value: 'sequin' }, { label: 'Tweed', value: 'tweed' }, { label: 'Brocade', value: 'brocade' }, { label: 'Tulle', value: 'tulle' }, { label: 'Organza', value: 'organza' }, { label: 'Jersey', value: 'jersey' }, { label: 'Georgette', value: 'georgette' } ],
        colors: [ { label: 'Black', value: 'black' }, { label: 'White', value: 'white' }, { label: 'Red', value: 'red' }, { label: 'Blue', value: 'blue' }, { label: 'Navy Blue', value: 'navy blue' }, { label: 'Green', value: 'green' }, { label: 'Emerald Green', value: 'emerald green' }, { label: 'Yellow', value: 'yellow' }, { label: 'Mustard Yellow', value: 'mustard yellow' }, { label: 'Pink', value: 'pink' }, { label: 'Purple', value: 'purple' }, { label: 'Orange', value: 'orange' }, { label: 'Gray', value: 'gray' }, { label: 'Brown', value: 'brown' }, { label: 'Beige', value: 'beige' }, { label: 'Gold', value: 'gold' }, { label: 'Silver', value: 'silver' }, { label: 'Teal', value: 'teal' }, { label: 'Magenta', value: 'magenta' }, { label: 'Burgundy', value: 'burgundy' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Stripes', value: 'striped' }, { label: 'Polka Dots', value: 'polka-dotted' }, { label: 'Floral', value: 'floral print' }, { label: 'Plaid', value: 'plaid' }, { label: 'Animal Print', value: 'animal print' }, { label: 'Camouflage', value: 'camouflage' }, { label: 'Geometric', value: 'geometric pattern' }, { label: 'Paisley', value: 'paisley' }, { label: 'Houndstooth', value: 'houndstooth' }, { label: 'Tie-Dye', value: 'tie-dye' } ]
      }},
      tops: { label: 'Tops', options: {
        types: [
          { label: 'T-shirt', value: 'T-shirt', styles: [ { label: 'Crew Neck', value: 'crew neck' }, { label: 'V-Neck', value: 'v-neck' }, { label: 'Graphic', value: 'graphic' }, { label: 'Oversized', value: 'oversized' }, { label: 'Henley', value: 'henley' }, { label: 'Ringer Tee', value: 'ringer tee' } ] },
          { label: 'Blouse', value: 'blouse', styles: [ { label: 'Button-Down', value: 'button-down' }, { label: 'Peplum', value: 'peplum' }, { label: 'Off-Shoulder', value: 'off-shoulder' }, { label: 'Pussy-Bow', value: 'pussy-bow' }, { label: 'Ruffled', value: 'ruffled' }, { label: 'Wrap Blouse', value: 'wrap blouse' }, { label: 'Lace Blouse', value: 'lace blouse' } ] },
          { label: 'Shirt', value: 'shirt', styles: [ { label: 'Button-Down', value: 'button-down' }, { label: 'Flannel', value: 'flannel' }, { label: 'Chambray', value: 'chambray' }, { label: 'Polo Shirt', value: 'polo shirt' }, { label: 'Henley Shirt', value: 'henley shirt' } ] },
          { label: 'Tank Top', value: 'tank top', styles: [ { label: 'Spaghetti Straps', value: 'with spaghetti straps' }, { label: 'Racerback', value: 'racerback' }, { label: 'Halter', value: 'halter' } ] },
          { label: 'Crop Top', value: 'crop top', styles: [ { label: 'Long-Sleeved', value: 'long-sleeved' }, { label: 'Off-Shoulder', value: 'off-shoulder' }, { label: 'Bustier', value: 'bustier style' } ] },
          { label: 'Sweater', value: 'sweater', styles: [ { label: 'Turtleneck', value: 'turtleneck' }, { label: 'Crew Neck', value: 'crew neck' }, { label: 'V-Neck', value: 'v-neck' }, { label: 'Cardigan', value: 'cardigan' }, { label: 'Cable Knit', value: 'cable knit' } ] },
          { label: 'Hoodie', value: 'hoodie', styles: [ { label: 'Zip-Up', value: 'zip-up' }, { label: 'Pullover', value: 'pullover' } ] },
          { label: 'Sweatshirt', value: 'sweatshirt', styles: [] },
          { label: 'Bodysuit', value: 'bodysuit', styles: [ { label: 'Long-Sleeved', value: 'long-sleeved' }, { label: 'Sleeveless', value: 'sleeveless' }, { label: 'Thong Back', value: 'thong back' } ] },
          { label: 'Tube Top', value: 'tube top', styles: [] },
          { label: 'Tunic', value: 'tunic', styles: [] },
          { label: 'Corset Top', value: 'corset top', styles: [] },
          { label: 'Peasant Top', value: 'peasant top', styles: [] },
          { label: 'Victorian Gothic Blouse', value: 'victorian gothic blouse', styles: [ { label: 'High Neck with Ruffles', value: 'high neck with ruffles' }, { label: 'Lace Details', value: 'with lace details' } ] },
        ],
        fabrics: [ { label: 'Cotton', value: 'cotton' }, { label: 'Knit', value: 'knit' }, { label: 'Silk', value: 'silk' }, { label: 'Chiffon', value: 'chiffon' }, { label: 'Jersey', value: 'jersey' }, { label: 'Wool', value: 'wool' }, { label: 'Cashmere', value: 'cashmere' }, { label: 'Satin', value: 'satin' }, { label: 'Lace', value: 'lace' }, { label: 'Latex', value: 'latex' }, { label: 'Fleece', value: 'fleece' }, { label: 'Linen', value: 'linho' }, { label: 'Poplin', value: 'poplin' }, { label: 'Ribbed Knit', value: 'ribbed knit' }, { label: 'Mesh', value: 'mesh' } ],
        colors: [ { label: 'Black', value: 'black' }, { label: 'White', value: 'white' }, { label: 'Red', value: 'red' }, { label: 'Blue', value: 'blue' }, { label: 'Green', value: 'green' }, { label: 'Olive Green', value: 'olive green' }, { label: 'Yellow', value: 'yellow' }, { label: 'Pink', value: 'pink' }, { label: 'Gray', value: 'gray' }, { label: 'Coral', value: 'coral' }, { label: 'Lavender', value: 'lavender' }, { label: 'Teal', value: 'teal' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Stripes', value: 'striped' }, { label: 'Floral', value: 'floral print' }, { label: 'Graphic Print', value: 'graphic print' }, { label: 'Plaid', value: 'plaid' }, { label: 'Animal Print', value: 'animal print' } ]
      }},
      bottoms: { label: 'Bottoms', options: {
        types: [
          { label: 'Pants', value: 'pants', styles: [ { label: 'Wide-Leg', value: 'wide-leg' }, { label: 'Straight-Leg', value: 'straight-leg' }, { label: 'Tapered', value: 'tapered' }, { label: 'Flared', value: 'flared' }, { label: 'High-Waisted', value: 'high-waisted' }, { label: 'Capri Pants', value: 'capri pants' }, { label: 'Palazzo Pants', value: 'palazzo pants' }, { label: 'Paperbag Waist', value: 'paperbag waist' } ] },
          { label: 'Jeans', value: 'jeans', styles: [ { label: 'Skinny', value: 'skinny' }, { label: 'Straight', value: 'straight' }, { label: 'Bootcut', value: 'bootcut' }, { label: 'Boyfriend', value: 'boyfriend style' }, { label: 'Mom Jeans', value: 'mom jeans' }, { label: 'Ripped', value: 'ripped' } ] },
          { label: 'Skirt', value: 'skirt', styles: [ { label: 'Mini', value: 'mini' }, { label: 'Pencil', value: 'pencil' }, { label: 'A-Line', value: 'A-line' }, { label: 'Pleated', value: 'pleated' }, { label: 'Maxi', value: 'maxi' }, { label: 'Wrap Skirt', value: 'wrap skirt' }, { label: 'Skater Skirt', value: 'skater skirt' }, { label: 'Slit Skirt', value: 'slit skirt' }, { label: 'Tiered Skirt', value: 'tiered skirt' } ] },
          { label: 'Shorts', value: 'shorts', styles: [ { label: 'Denim Cut-Offs', value: 'denim cut-offs' }, { label: 'Bermuda', value: 'Bermuda' }, { label: 'High-Waisted', value: 'high-waisted' } ] },
          { label: 'Leggings', value: 'leggings', styles: [ { label: 'High-Waisted', value: 'high-waisted' }, { label: 'Capri', value: 'capri-length' }, { label: 'Faux Leather', value: 'faux leather' } ] },
          { label: 'Culottes', value: 'culottes', styles: [] },
          { label: 'Cargo Pants', value: 'cargo pants', styles: [] },
          { label: 'Sweatpants', value: 'sweatpants', styles: [] },
          { label: 'Gothic Tiered Skirt', value: 'gothic tiered skirt', styles: [ { label: 'Lace Trim', value: 'with lace trim' }, { label: 'Asymmetrical Hem', value: 'with an asymmetrical hem' } ] },
        ],
        fabrics: [ { label: 'Denim', value: 'denim' }, { label: 'Cotton', value: 'cotton' }, { label: 'Leather', value: 'leather' }, { label: 'Latex', value: 'latex' }, { label: 'Corduroy', value: 'corduroy' }, { label: 'Twill', value: 'twill' }, { label: 'Linen', value: 'linen' }, { label: 'Satin', value: 'satin' }, { label: 'Velvet', value: 'velvet' }, { label: 'Wool', value: 'wool' }, { label: 'Gabardine', value: 'gabardine' }, { label: 'Suede', value: 'suede' }, { label: 'Ponte Knit', value: 'ponte knit' } ],
        colors: [ { label: 'Blue', value: 'blue' }, { label: 'Black', value: 'black' }, { label: 'White', value: 'white' }, { label: 'Khaki', value: 'khaki' }, { label: 'Gray', value: 'gray' }, { label: 'Burgundy', value: 'burgundy' }, { label: 'Forest Green', value: 'forest green' }, { label: 'Mustard', value: 'mustard' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Pinstripes', value: 'pinstriped' }, { label: 'Plaid', value: 'plaid' }, { label: 'Camouflage', value: 'camouflage' }, { label: 'Floral', value: 'floral' }, { label: 'Houndstooth', value: 'houndstooth' } ]
      }},
      stockings: { label: 'Hosiery', options: {
        types: [
          { label: 'Tights', value: 'tights', styles: [ { label: 'Opaque', value: 'opaque' }, { label: 'Sheer', value: 'sheer' }, { label: 'Fishnet', value: 'fishnet' }, { label: 'Patterned', value: 'patterned' }, { label: 'Glitter Tights', value: 'glitter tights' }, { label: 'Seamed Tights', value: 'seamed tights' } ] },
          { label: 'Socks', value: 'socks', styles: [ { label: 'Ankle', value: 'ankle' }, { label: 'Crew', value: 'crew' }, { label: 'Knee-High', value: 'knee-high' }, { label: 'No-Show', value: 'no-show' } ] },
          { label: 'Thigh-High Stockings', value: 'thigh-high stockings', styles: [ { label: 'Lace Top', value: 'with a lace top' }, { label: 'Stay-Up (Silicone Band)', value: 'stay-up with a silicone band' }, { label: 'With Garter Belt', value: 'held up by a garter belt' } ] },
          { label: 'Leg Warmers', value: 'leg warmers', styles: [ { label: 'Slouchy', value: 'slouchy' }, { label: 'Ribbed', value: 'ribbed' } ] },
          { label: 'Garter Tights', value: 'garter tights', styles: [] },
          { label: 'Footless Tights', value: 'footless tights', styles: [] },
        ],
        fabrics: [ { label: 'Nylon', value: 'nylon' }, { label: 'Cotton', value: 'cotton' }, { label: 'Wool', value: 'wool' }, { label: 'Lace', value: 'lace' }, { label: 'Latex', value: 'latex' }, { label: 'Microfiber', value: 'microfiber' }, { label: 'Lurex', value: 'lurex' }, { label: 'Spandex', value: 'spandex' }, { label: 'Fishnet', value: 'fishnet' }, { label: 'Cashmere', value: 'cashmere' } ],
        colors: [ { label: 'Black', value: 'black' }, { label: 'Nude', value: 'nude' }, { label: 'White', value: 'white' }, { label: 'Red', value: 'red' }, { label: 'Gray', value: 'gray' }, { label: 'Purple', value: 'purple' }, { label: 'Navy Blue', value: 'navy blue' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Argyle', value: 'argyle' }, { label: 'Striped', value: 'striped' }, { label: 'Polka Dot', value: 'polka dot' }, { label: 'Floral Lace', value: 'floral lace' } ]
      }},
      outerwear: { label: 'Outerwear', options: {
        types: [
          { label: 'Jacket', value: 'jacket', styles: [ { label: 'Denim', value: 'denim' }, { label: 'Leather Biker', value: 'leather biker' }, { label: 'Bomber', value: 'bomber' }, { label: 'Puffer', value: 'puffer' }, { label: 'Windbreaker', value: 'windbreaker' }, { label: 'Field Jacket', value: 'field jacket' }, { label: 'Trucker Jacket', value: 'trucker jacket' } ] },
          { label: 'Coat', value: 'coat', styles: [ { label: 'Trench', value: 'trench' }, { label: 'Pea Coat', value: 'pea coat' }, { label: 'Overcoat', value: 'overcoat' }, { label: 'Faux Fur', value: 'faux fur' }, { label: 'Parka', value: 'parka' }, { label: 'Duffle Coat', value: 'duffle coat' }, { label: 'Wrap Coat', value: 'wrap coat' } ] },
          { label: 'Blazer', value: 'blazer', styles: [ { label: 'Single-Breasted', value: 'single-breasted' }, { label: 'Double-Breasted', value: 'double-breasted' }, { label: 'Oversized', value: 'oversized' } ] },
          { label: 'Cardigan', value: 'cardigan', styles: [ { label: 'Longline', value: 'longline' }, { label: 'Cropped', value: 'cropped' }, { label: 'Chunky Knit', value: 'chunky knit' } ] },
          { label: 'Vest', value: 'vest', styles: [ { label: 'Suit Vest', value: 'suit vest' }, { label: 'Puffer Vest', value: 'puffer vest' }, { label: 'Utility Vest', value: 'utility vest' } ] },
          { label: 'Cape', value: 'cape', styles: [ { label: 'Hooded', value: 'hooded' }, { label: 'Long', value: 'long' } ] },
          { label: 'Poncho', value: 'poncho', styles: [] },
          { label: 'Duster Coat', value: 'duster coat', styles: [] },
          { label: 'Gothic Tailcoat', value: 'gothic tailcoat', styles: [ { label: 'Velvet', value: 'velvet' }, { label: 'Ornate Buttons', value: 'with ornate buttons' } ] },
        ],
        fabrics: [ { label: 'Denim', value: 'denim' }, { label: 'Leather', value: 'leather' }, { label: 'Latex', value: 'latex' }, { label: 'Wool', value: 'wool' }, { label: 'Fleece', value: 'fleece' }, { label: 'Tweed', value: 'tweed' }, { label: 'Down', value: 'down' }, { label: 'Cashmere', value: 'cashmere' }, { label: 'Faux Shearling', value: 'faux shearling' }, { label: 'Gabardine', value: 'gabardine' }, { label: 'Corduroy', value: 'corduroy' }, { label: 'Faux Fur', value: 'faux fur' }, { label: 'Nylon', value: 'nylon' } ],
        colors: [ { label: 'Black', value: 'black' }, { label: 'Camel', value: 'camel' }, { label: 'Navy', value: 'navy blue' }, { label: 'Gray', value: 'gray' }, { label: 'Olive Green', value: 'olive green' }, { label: 'Burgundy', value: 'burgundy' }, { label: 'Forest Green', value: 'forest green' }, { label: 'Cream', value: 'cream' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Plaid', value: 'plaid' }, { label: 'Houndstooth', value: 'houndstooth' }, { label: 'Herringbone', value: 'herringbone' }, { label: 'Camouflage', value: 'camouflage' } ]
      }},
      suits: { label: 'Suit / Formalwear', options: {
        types: [
          { label: 'Business Suit', value: 'business suit', styles: [ { label: 'Skirt Suit', value: 'skirt suit' }, { label: 'Pant Suit', value: 'pant suit' }, { label: 'Three-Piece', value: 'three-piece' }, { label: 'Double-Breasted', value: 'double-breasted' }, { label: 'Single-Breasted', value: 'single-breasted' } ] },
          { label: 'Tuxedo', value: 'tuxedo', styles: [ { label: 'Classic Black Tie', value: 'classic black tie' }, { label: 'Modern Slim Fit', value: 'modern slim fit' } ] },
          { label: 'Formal Jumpsuit', value: 'formal jumpsuit', styles: [ { label: 'Wide-Leg', value: 'wide-leg' }, { label: 'Cape Overlay', value: 'with a cape overlay' } ] },
          { label: 'Evening Gown', value: 'evening gown', styles: [] },
          { label: 'Cocktail Dress', value: 'cocktail dress', styles: [] },
        ],
        fabrics: [ { label: 'Wool', value: 'wool' }, { label: 'Linen', value: 'linen' }, { label: 'Latex', value: 'latex' }, { label: 'Velvet', value: 'velvet' }, { label: 'Satin', value: 'satin' }, { label: 'Silk', value: 'silk' }, { label: 'Brocade', value: 'brocade' }, { label: 'Tweed', value: 'tweed' }, { label: 'Sharkskin', value: 'sharkskin' }, { label: 'Seersucker', value: 'seersucker' }, { label: 'Cashmere', value: 'cashmere' } ],
        colors: [ { label: 'Black', value: 'black' }, { label: 'Navy', value: 'navy' }, { label: 'Charcoal Gray', value: 'charcoal gray' }, { label: 'White', value: 'white' }, { label: 'Royal Blue', value: 'royal blue' }, { label: 'Burgundy', value: 'burgundy' }, { label: 'Emerald Green', value: 'emerald green' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Pinstripe', value: 'pinstripe' }, { label: 'Checkered', value: 'checkered' }, { label: 'Subtle Texture', value: 'subtle texture' }, { label: 'Glen Plaid', value: 'glen plaid' } ]
      }},
      swimwear: { label: 'Swimwear', options: {
        types: [
            { label: 'Bikini', value: 'bikini', styles: [ { label: 'Triangle Top', value: 'triangle top' }, { label: 'Bandeau Top', value: 'bandeau top' }, { label: 'High-Waisted Bottoms', value: 'high-waisted bottoms' }, { label: 'String Bottoms', value: 'string bottoms' }, { label: 'Underwire Top', value: 'underwire top' }, { label: 'Thong Bottoms', value: 'thong bottoms' }, { label: 'Sporty Bikini', value: 'sporty bikini' } ] },
            { label: 'One-Piece Swimsuit', value: 'one-piece swimsuit', styles: [ { label: 'High-Cut', value: 'high-cut' }, { label: 'Low-Back', value: 'low-back' }, { label: 'With Cutouts', value: 'with cutouts' }, { label: 'Monokini', value: 'monokini' }, { label: 'Plunging Neckline', value: 'plunging neckline' }, { label: 'Ruffled One-Piece', value: 'ruffled one-piece' } ] },
            { label: 'Tankini', value: 'tankini', styles: [] },
            { label: 'Swim Trunks', value: 'swim trunks', styles: [] },
            { label: 'Boardshorts', value: 'boardshorts', styles: [] },
            { label: 'Rash Guard', value: 'rash guard', styles: [] },
            { label: 'Cover-up', value: 'cover-up', styles: [] },
            { label: 'Sarong', value: 'sarong', styles: [] },
            { label: 'Burkini', value: 'burkini', styles: [] },
        ],
        fabrics: [ { label: 'Nylon', value: 'nylon' }, { label: 'Spandex', value: 'spandex' }, { label: 'Polyester', value: 'polyester' }, { label: 'Latex', value: 'latex' }, { label: 'Neoprene', value: 'neoprene' }, { label: 'Lycra', value: 'lycra' }, { label: 'Crochet', value: 'crochet' } ],
        colors: [ { label: 'Black', value: 'black' }, { label: 'White', value: 'white' }, { label: 'Royal Blue', value: 'royal blue' }, { label: 'Hot Pink', value: 'hot pink' }, { label: 'Turquoise', value: 'turquoise' }, { label: 'Coral', value: 'coral' }, { label: 'Yellow', value: 'yellow' }, { label: 'Orange', value: 'orange' }, { label: 'Purple', value: 'purple' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Tropical Print', value: 'tropical print' }, { label: 'Nautical Stripes', value: 'nautical stripes' }, { label: 'Animal Print', value: 'animal print' }, { label: 'Polka Dot', value: 'polka dot' }, { label: 'Geometric', value: 'geometric' }, { label: 'Tie-Dye', value: 'tie-dye' } ]
      }},
      activewear: { label: 'Activewear', options: {
        types: [
          { label: 'Sports Bra', value: 'sports bra', styles: [ { label: 'Racerback', value: 'racerback' }, { label: 'Criss-Cross Back', value: 'criss-cross back' } ] },
          { label: 'Activewear Tank Top', value: 'activewear tank top', styles: [ { label: 'Loose Fit', value: 'loose fit' }, { label: 'Fitted', value: 'fitted' } ] },
          { label: 'Performance T-shirt', value: 'performance T-shirt', styles: [ { label: 'Short Sleeve', value: 'short sleeve' }, { label: 'Long Sleeve', value: 'long sleeve' } ] },
          { label: 'Activewear Leggings', value: 'activewear leggings', styles: [ { label: 'High-Waisted', value: 'high-waisted' }, { label: 'With Pockets', value: 'with pockets' }, { label: 'Mesh Panels', value: 'with mesh panels' }, { label: 'Capri Length', value: 'capri length' }, { label: 'Seamless', value: 'seamless' } ] },
          { label: 'Athletic Shorts', value: 'athletic shorts', styles: [ { label: 'Running Shorts', value: 'running shorts' }, { label: 'Bike Shorts', value: 'bike shorts' }, { label: 'Yoga Shorts', value: 'yoga shorts' } ] },
          { label: 'Joggers', value: 'joggers', styles: [ { label: 'Tapered Fit', value: 'tapered fit' }, { label: 'Cuffed Ankles', value: 'with cuffed ankles' } ] },
          { label: 'Tracksuit', value: 'tracksuit', styles: [ { label: 'Matching Set', value: 'matching set' }, { label: 'Retro Style', value: 'retro style' } ] },
          { label: 'Yoga Pants', value: 'yoga pants', styles: [] },
          { label: 'Cycling Shorts', value: 'cycling shorts', styles: [] },
          { label: 'Windbreaker Jacket', value: 'windbreaker jacket', styles: [] },
        ],
        fabrics: [ { label: 'Spandex Blend', value: 'spandex blend' }, { label: 'Latex', value: 'latex' }, { label: 'Moisture-Wicking', value: 'moisture-wicking fabric' }, { label: 'Fleece', value: 'fleece' }, { label: 'Nylon', value: 'nylon' }, { label: 'Polyester', value: 'polyester' }, { label: 'Merino Wool', value: 'merino wool' }, { label: 'Bamboo', value: 'bamboo' } ],
        colors: [ { label: 'Black', value: 'black' }, { label: 'Gray', value: 'gray' }, { label: 'Neon Green', value: 'neon green' }, { label: 'Hot Pink', value: 'hot pink' }, { label: 'Royal Blue', value: 'royal blue' }, { label: 'Purple', value: 'purple' }, { label: 'Orange', value: 'orange' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Color Block', value: 'color blocked' }, { label: 'Abstract Print', value: 'abstract print' }, { label: 'Camo', value: 'camo' }, { label: 'Animal Print', value: 'animal print' } ]
      }},
      sleepwear: { label: 'Sleepwear / Loungewear', options: {
        types: [
          { label: 'Pajama Set', value: 'pajama set', styles: [ { label: 'Shorts Set', value: 'shorts set' }, { label: 'Pants Set', value: 'pants set' }, { label: 'Button-Down Top', value: 'with a button-down top' }, { label: 'Thermal Set', value: 'thermal set' }, { label: 'Flannel Set', value: 'flannel set' } ] },
          { label: 'Nightgown', value: 'nightgown', styles: [ { label: 'Short (Chemise)', value: 'short chemise' }, { label: 'Long', value: 'long' }, { label: 'Lace Trim', value: 'with lace trim' } ] },
          { label: 'Robe', value: 'robe', styles: [ { label: 'Plush', value: 'plush' }, { label: 'Silk/Satin', value: 'silk/satin' }, { label: 'Waffle Knit', value: 'waffle knit' } ] },
          { label: 'Onesie', value: 'onesie', styles: [ { label: 'Animal Theme', value: 'animal theme' }, { label: 'Footed', value: 'footed' } ] },
          { label: 'Loungewear Set', value: 'loungewear set', styles: [] },
          { label: 'Chemise', value: 'chemise', styles: [] },
          { label: 'Slippers', value: 'slippers', styles: [] },
        ],
        fabrics: [ { label: 'Cotton', value: 'cotton' }, { label: 'Flannel', value: 'flannel' }, { label: 'Silk', value: 'silk' }, { label: 'Satin', value: 'satin' }, { label: 'Latex', value: 'latex' }, { label: 'Plush Fleece', value: 'plush fleece' }, { label: 'Jersey', value: 'jersey' }, { label: 'Modal', value: 'modal' }, { label: 'Velour', value: 'velour' }, { label: 'Cashmere', value: 'cashmere' } ],
        colors: [ { label: 'Pastel Blue', value: 'pastel blue' }, { label: 'Light Pink', value: 'light pink' }, { label: 'White', value: 'white' }, { label: 'Gray', value: 'gray' }, { label: 'Lavender', value: 'lavender' }, { label: 'Mint Green', value: 'mint green' }, { label: 'Navy', value: 'navy' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Plaid', value: 'plaid' }, { label: 'Stripes', value: 'striped' }, { label: 'Floral', value: 'floral' }, { label: 'Polka Dots', value: 'polka dots' }, { label: 'Animal Print', value: 'animal print' } ]
      }},
      underwear: { label: 'Underwear / Lingerie', options: {
        types: [
            { label: 'Bra', value: 'bra', styles: [ { label: 'Push-Up', value: 'push-up' }, { label: 'Bralette', value: 'bralette' }, { label: 'Underwire', value: 'underwire' }, { label: 'Strapless', value: 'strapless' }, { label: 'Balconette', value: 'balconette' }, { label: 'Sports Bra', value: 'sports bra' }, { label: 'Lace Bra', value: 'lace bra' } ] },
            { label: 'Panties', value: 'panties', styles: [ { label: 'Briefs', value: 'briefs' }, { label: 'Thong', value: 'thong' }, { label: 'Boyshorts', value: 'boyshorts' }, { label: 'High-Waisted', value: 'high-waisted' }, { label: 'Bikini Cut', value: 'bikini cut' }, { label: 'Lace Panties', value: 'lace panties' } ] },
            { label: 'Lingerie Set', value: 'lingerie set', styles: [ { label: 'Matching Bra and Panties', value: 'matching bra and panties set' }, { label: 'With Garter Belt', value: 'with a garter belt' } ] },
            { label: 'Bodysuit', value: 'bodysuit', styles: [ { label: 'Lace', value: 'lace' }, { label: 'Sheer', value: 'sheer' } ] },
            { label: 'Corset / Bustier', value: 'corset or bustier', styles: [ { label: 'Overbust', value: 'overbust' }, { label: 'Underbust', value: 'underbust' } ] },
            { label: 'Boxer Briefs', value: 'boxer briefs', styles: [] },
            { label: 'Boxers', value: 'boxers', styles: [] },
            { label: 'Garter Belt', value: 'garter belt', styles: [] },
            { label: 'Stockings', value: 'stockings', styles: [] },
            { label: 'Chemise', value: 'chemise', styles: [] },
        ],
        fabrics: [ { label: 'Lace', value: 'lace' }, { label: 'Latex', value: 'latex' }, { label: 'Cotton', value: 'cotton' }, { label: 'Silk', value: 'silk' }, { label: 'Satin', value: 'satin' }, { label: 'Mesh', value: 'mesh' }, { label: 'Velvet', value: 'velvet' }, { label: 'Microfiber', value: 'microfiber' }, { label: 'Modal', value: 'modal' }, { label: 'Bamboo', value: 'bamboo' }, { label: 'Spandex', value: 'spandex' } ],
        colors: [ { label: 'Black', value: 'black' }, { label: 'White', value: 'white' }, { label: 'Red', value: 'red' }, { label: 'Nude', value: 'nude' }, { label: 'Burgundy', value: 'burgundy' }, { label: 'Baby Blue', value: 'baby blue' }, { label: 'Hot Pink', value: 'hot pink' }, { label: 'Emerald Green', value: 'emerald green' } ],
        patterns: [ { label: 'Solid Color', value: 'solid color' }, { label: 'Floral', value: 'floral print' }, { label: 'Lace Pattern', value: 'lace pattern' }, { label: 'Polka Dot', value: 'polka dot' }, { label: 'Animal Print', value: 'animal print' } ]
      }},
      fantasy: { label: 'Fantasy & Costumes', options: {
        types: [
            { label: 'Tattered Rags', value: 'tattered rags', styles: [ { label: 'Stained and Dirty', value: 'stained and dirty' }, { label: 'Heavily Ripped', value: 'heavily ripped' } ] },
            { label: 'Torn Tunic', value: 'torn tunic', styles: [ { label: 'Frayed Edges', value: 'with frayed edges' }, { label: 'Mud-splattered', value: 'mud-splattered' } ] },
            { label: 'Worn Prisoner Garb', value: 'worn prisoner garb', styles: [ { label: 'Striped Uniform', value: 'striped uniform' }, { label: 'Burlap Sack', value: 'burlap sack' } ] },
            { label: 'Necromancer Robes', value: 'necromancer robes', styles: [ { label: 'Hooded, with Skull Motifs', value: 'hooded, with skull motifs' }, { label: 'Flowing, Ethereal Shadows', value: 'with flowing, ethereal shadows' } ] },
            { label: 'Dark Sorceress Gown', value: 'dark sorceress gown', styles: [ { label: 'High Collar, Feathered Shoulders', value: 'with a high collar and feathered shoulders' }, { label: 'Intricate Dark Embroidery', value: 'with intricate dark embroidery' } ] },
            { label: 'Rogue\'s Leather Armor', value: 'rogue\'s leather armor', styles: [ { label: 'Hooded', value: 'hooded' }, { label: 'With Multiple Daggers', value: 'with multiple daggers' } ] },
            { label: 'Plague Doctor Costume', value: 'plague doctor costume', styles: [ { label: 'Classic Beak Mask', value: 'with a classic beak mask' }, { label: 'Long Leather Coat', value: 'with a long leather coat' } ] },
            { label: 'Fairy Costume', value: 'fairy costume', styles: [ { label: 'Gossamer Wings', value: 'with gossamer wings' }, { label: 'Floral Crown', value: 'with a floral crown' } ] },
            { label: 'Vampire Costume', value: 'vampire costume', styles: [ { label: 'High Collar Cape', value: 'with a high collar cape' }, { label: 'Victorian Style', value: 'victorian style' } ] },
            { label: 'Pirate Costume', value: 'pirate costume', styles: [ { label: 'Tricorne Hat', value: 'with a tricorne hat' }, { label: 'Eyepatch', value: 'with an eyepatch' } ] },
            { label: 'Witch/Wizard Robes', value: 'witch or wizard robes', styles: [ { label: 'Pointed Hat', value: 'with a pointed hat' }, { label: 'Starry Pattern', value: 'with a starry pattern' } ] },
            { label: 'Knight Armor', value: 'knight armor', styles: [ { label: 'Full Plate', value: 'full plate armor' }, { label: 'Chainmail', value: 'chainmail' } ] },
            { label: 'Elf Tunic', value: 'elf tunic', styles: [ { label: 'Elven Embroidery', value: 'with elven embroidery' }, { label: 'Hooded', value: 'hooded' } ] },
            { label: 'Mermaid Tail', value: 'mermaid tail', styles: [ { label: 'Iridescent Scales', value: 'with iridescent scales' }, { label: 'Flowing Fins', value: 'with flowing fins' } ] },
            { label: 'Superman / Supergirl', value: 'Superman or Supergirl costume', styles: [ { label: 'Classic Comic Book', value: 'classic comic book style' }, { label: 'Modern Movie', value: 'modern movie style' } ] },
            { label: 'Batman / Batgirl', value: 'Batman or Batgirl costume', styles: [ { label: 'Classic (Adam West)', value: 'classic 1960s (Adam West) style' }, { label: 'Modern Armored', value: 'modern armored movie style' } ] },
            { label: 'Wonder Woman', value: 'Wonder Woman costume', styles: [ { label: 'Classic Comic Book', value: 'classic comic book style' }, { label: 'Modern Movie Armor', value: 'modern movie armor style' } ] },
            { label: 'Spider-Man / Spider-Gwen', value: 'Spider-Man or Spider-Gwen costume', styles: [ { label: 'Classic Comic Book', value: 'classic comic book style' }, { label: 'Live-Action Movie', value: 'live-action movie style' } ] },
            { label: 'Iron Man / Rescue', value: 'Iron Man or Rescue armor', styles: [ { label: 'Classic Comic Book', value: 'classic comic book armor' }, { label: 'Modern MCU', value: 'modern MCU armor' } ] },
            { label: 'Captain America', value: 'Captain America costume', styles: [ { label: 'Classic WWII', value: 'classic WWII style' }, { label: 'Modern MCU', value: 'modern MCU style' } ] },
            { label: 'Thor', value: 'Thor costume', styles: [ { label: 'Classic Comic Book', value: 'classic comic book style' }, { label: 'Modern MCU Armor', value: 'modern MCU armor' } ] },
            { label: 'Black Widow', value: 'Black Widow costume', styles: [ { label: 'Classic Jumpsuit', value: 'classic black jumpsuit style' }, { label: 'Modern Tactical', value: 'modern tactical MCU style' } ] },
            { label: 'Scarlet Witch', value: 'Scarlet Witch costume', styles: [ { label: 'Classic Comic Book', value: 'classic comic book headpiece and cape style' }, { label: 'Modern MCU', value: 'modern MCU style' } ] },
            { label: 'Captain Marvel', value: 'Captain Marvel costume', styles: [ { label: 'Classic Red & Blue', value: 'classic red and blue MCU style' } ] },
            { label: 'The Flash', value: 'The Flash costume', styles: [ { label: 'Classic Comic Book', value: 'classic comic book style' }, { label: 'Modern Armored', value: 'modern armored TV/movie style' } ] },
            { label: 'Green Lantern', value: 'Green Lantern costume', styles: [ { label: 'Classic Hal Jordan', value: 'classic Hal Jordan style' }, { label: 'Modern John Stewart', value: 'modern John Stewart style' } ] },
            { label: 'Catwoman', value: 'Catwoman costume', styles: [ { label: 'Classic 90s (Michelle Pfeiffer)', value: 'classic 90s (Michelle Pfeiffer) style' }, { label: 'Modern Tactical (Anne Hathaway)', value: 'modern tactical (Anne Hathaway) style' } ] },
            { label: 'Harley Quinn', value: 'Harley Quinn costume', styles: [ { label: 'Classic Jester', value: 'classic jester style' }, { label: 'Modern Movie (Suicide Squad)', value: 'modern movie (Suicide Squad) style' } ] },
            { label: 'The Joker', value: 'The Joker costume', styles: [ { label: 'Classic Purple Suit', value: 'classic purple suit style' }, { label: 'Modern (Heath Ledger)', value: 'modern (Heath Ledger) style' } ] },
            { label: 'Loki', value: 'Loki costume', styles: [ { label: 'Classic Asgardian Armor', value: 'classic Asgardian armor style' }, { label: 'Modern TVA Agent', value: 'modern TVA agent style' } ] },
            { label: 'Maleficent', value: 'Maleficent costume', styles: [ { label: 'Classic Animated', value: 'classic animated Disney style' }, { label: 'Modern Live-Action', value: 'modern live-action movie style' } ] },
            { label: 'Darth Vader', value: 'Darth Vader costume', styles: [] }
        ],
        fabrics: [{ label: 'Roughspun Linen', value: 'roughspun linen' }, { label: 'Burlap', value: 'burlap' }, { label: 'Latex', value: 'latex' }, { label: 'Chainmail', value: 'chainmail' }, { label: 'Worn Leather', value: 'worn leather' }, { label: 'Ethereal Silk', value: 'ethereal silk' }, { label: 'Dark Velvet', value: 'dark velvet' }], 
        colors: [{ label: 'Muted Brown', value: 'muted brown' }, { label: 'Faded Gray', value: 'faded gray' }], 
        patterns: [{ label: 'Tattered', value: 'tattered' }, { label: 'Stained', value: 'stained' }]
      }},
      traditional: { label: 'Cultural & Traditional Attire', options: {
        types: [
          { label: 'Plains Nations Inspired (USA)', value: 'Plains Nations Inspired (USA)' },
          { label: 'Kayapo Inspired (Brazil)', value: 'Kayapo Inspired (Brazil)' },
          { label: 'Japanese Kimono Inspired', value: 'Japanese Kimono Inspired' },
          { label: 'Indian Sari Inspired', value: 'Indian Sari Inspired' },
          { label: 'Scottish Highland Dress Inspired', value: 'Scottish Highland Dress Inspired' },
          { label: 'Maasai Inspired (Kenya/Tanzania)', value: 'Maasai Inspired (Kenya/Tanzania)' },
          { label: 'South Korean Hanbok Inspired', value: 'South Korean Hanbok Inspired' },
          { label: 'Vietnamese Áo Dài Inspired', value: 'Vietnamese Áo Dài Inspired' },
          { label: 'Andean Inspired (Peru/Bolivia)', value: 'Andean Inspired (Peru/Bolivia)' },
        ],
        headwear: [
            { label: 'Feather Headdress (War Bonnet)', value: 'a large feather headdress (war bonnet)' },
            { label: 'Large Circular Headdress', value: 'a large, circular, vibrant feather headdress' },
            { label: 'Kanzashi Hair Ornaments (Japan)', value: 'delicate Kanzashi hair ornaments' },
            { label: 'Glengarry Bonnet (Scotland)', value: 'a Glengarry bonnet' },
            { label: 'Nón Lá Conical Hat (Vietnam)', value: 'a traditional Nón Lá (conical leaf hat)' },
            { label: 'Andean Montera Hat (Peru/Bolivia)', value: 'an Andean Montera hat' },
        ],
        tops: [
            { label: 'Leather Tunic', value: 'a fringed leather tunic with beadwork' },
            { label: 'Leather Top', value: 'a leather top with beadwork' },
            { label: 'Feather Top', value: 'a top made of feathers' },
            { label: 'Body Paint (Torso)', value: 'intricate black geometric body paint covering the torso' },
            { label: 'Silk Kimono with Obi Sash (Japan)', value: 'a full-length silk kimono with flowing sleeves, tied with a wide obi sash' },
            { label: 'Sari with Choli Blouse (India)', value: 'a traditional Sari with a matching Choli blouse' },
            { label: 'Prince Charlie Jacket (Scotland)', value: 'a formal Prince Charlie jacket' },
            { label: 'Draped Shuka Blanket (Maasai)', value: 'a red Shuka blanket draped over the shoulders' },
            { label: 'Hanbok Jeogori Jacket (S. Korea)', value: 'a traditional Hanbok jeogori (upper jacket)' },
            { label: 'Áo Dài Silk Tunic (Vietnam)', value: 'a long, tight-fitting Áo Dài silk tunic with high side slits' },
            { label: 'Embroidered Chompa Jacket (Andean)', value: 'a colorful, embroidered jacket (chompa) and a woven lliklla shawl' },
        ],
        bottoms: [
            { label: 'Leather Leggings', value: 'leather leggings with beadwork' },
            { label: 'Feather Skirt', value: 'a skirt made of feathers' },
            { label: 'Cotton Loincloth', value: 'a simple cotton loincloth' },
            { label: 'Tartan Kilt with Sporran (Scotland)', value: 'a tartan kilt with a sporran' },
            { label: 'Hanbok Chima Skirt (S. Korea)', value: 'a full, high-waisted Hanbok chima skirt' },
            { label: 'Silk Trousers (Vietnam)', value: 'loose silk trousers' },
            { label: 'Andean Pollera Skirt (Peru/Bolivia)', value: 'a wide, layered pollera skirt' },
        ],
        featherColors: [
          { label: 'Red', value: 'red' }, { label: 'Yellow', value: 'yellow' }, { label: 'Blue', value: 'blue' }, { label: 'Green', value: 'green' }, { label: 'White', value: 'white' }, { label: 'Black', value: 'black' }, { label: 'Eagle (Brown/White)', value: 'eagle-like brown and white'}
        ],
        bodyPaintColors: [
          { label: 'Black (from Genipapo)', value: 'black (from genipapo)' }, { label: 'Red (from Urucum)', value: 'red (from urucum)' }, { label: 'White (from Clay)', value: 'white (from clay)' }, { label: 'Yellow (from Clay)', value: 'yellow (from clay)' }
        ],
      }},
    },
    footwearOptions: {
      types: [
        { 
          label: 'Sneakers', value: 'sneakers',
          materials: [ { label: 'Canvas', value: 'canvas' }, { label: 'Leather', value: 'leather' }, { label: 'Suede', value: 'suede' }, { label: 'Knit Fabric', value: 'knit fabric' }, { label: 'Mesh', value: 'mesh' }, { label: 'Synthetic', value: 'synthetic' } ],
          colors: [ { label: 'White', value: 'white' }, { label: 'Black', value: 'black' }, { label: 'Gray', value: 'gray' }, { label: 'Red', value: 'red' }, { label: 'Blue', value: 'blue' } ]
        },
        {
          label: 'High Heels', value: 'high heels',
          materials: [ { label: 'Patent Leather', value: 'patent leather' }, { label: 'Suede', value: 'suede' }, { label: 'Satin', value: 'satin' }, { label: 'Leather', value: 'leather' }, { label: 'Velvet', value: 'velvet' }, { label: 'Glitter', value: 'glitter' }, { label: 'PVC', value: 'pvc' }, { label: 'Snakeskin', value: 'snakeskin' } ],
          colors: [ { label: 'Black', value: 'black' }, { label: 'Nude', value: 'nude' }, { label: 'Red', value: 'red' }, { label: 'Silver', value: 'silver' }, { label: 'Gold', value: 'gold' } ]
        },
        { 
          label: 'Flats', value: 'flats',
          materials: [ { label: 'Leather', value: 'leather' }, { label: 'Suede', value: 'suede' }, { label: 'Canvas', value: 'canvas' }, { label: 'Ballet Style', value: 'ballet style' }, { label: 'Patent Leather', value: 'patent leather' }, { label: 'Fabric', value: 'fabric' } ],
          colors: [ { label: 'Black', value: 'black' }, { label: 'Beige', value: 'beige' }, { label: 'Navy Blue', value: 'navy blue' }, { label: 'Red', value: 'red' } ]
        },
        { 
          label: 'Boots', value: 'boots',
          materials: [ { label: 'Leather', value: 'leather' }, { label: 'Suede', value: 'suede' }, { label: 'Rubber', value: 'rubber' }, { label: 'Combat Style', value: 'combat style' }, { label: 'Hiking Style', value: 'hiking style' }, { label: 'Patent Leather', value: 'patent leather' }, { label: 'Velvet', value: 'velvet' }, { label: 'Faux Fur Lined', value: 'faux fur lined' } ],
          colors: [ { label: 'Black', value: 'black' }, { label: 'Brown', value: 'brown' }, { label: 'Tan', value: 'tan' }, { label: 'Burgundy', value: 'burgundy' } ]
        },
        { 
          label: 'Sandals', value: 'sandals',
          materials: [ { label: 'Leather', value: 'leather' }, { label: 'Strappy', value: 'strappy' }, { label: 'Wedge', value: 'wedge' }, { label: 'Flat', value: 'flat' }, { label: 'Gladiator', value: 'gladiator' }, { label: 'Suede', value: 'suede' }, { label: 'Rope', value: 'rope' }, { label: 'Rubber', value: 'rubber' } ],
          colors: [ { label: 'Brown', value: 'brown' }, { label: 'Black', value: 'black' }, { label: 'White', value: 'white' }, { label: 'Gold', value: 'gold' } ]
        },
        { 
          label: 'Oxfords', value: 'oxfords',
          materials: [ { label: 'Leather', value: 'leather' }, { label: 'Suede', value: 'suede' }, { label: 'Patent Leather', value: 'patent leather' }, { label: 'Canvas', value: 'canvas' }, { label: 'Brogue detailing', value: 'brogue detailing' } ],
          colors: [ { label: 'Black', value: 'black' }, { label: 'Brown', value: 'brown' }, { label: 'Two-tone (Spectator)', value: 'two-tone' } ]
        },
        { 
          label: 'Loafers', value: 'loafers',
          materials: [ { label: 'Leather', value: 'leather' }, { label: 'Suede', value: 'suede' }, { label: 'Velvet', value: 'velvet' }, { label: 'Patent Leather', value: 'patent leather' }, { label: 'Tassel', value: 'tassel' } ],
          colors: [ { label: 'Black', value: 'black' }, { label: 'Brown', value: 'brown' }, { label: 'Navy Blue', value: 'navy blue' } ]
        },
        { 
          label: 'Mules', value: 'mules',
          materials: [ { label: 'Leather', value: 'leather' }, { label: 'Suede', value: 'suede' }, { label: 'Woven', value: 'woven' }, { label: 'Velvet', value: 'velvet' }, { label: 'Faux Fur', value: 'faux fur' } ],
          colors: [ { label: 'Black', value: 'black' }, { label: 'White', value: 'white' }, { label: 'Tan', value: 'tan' } ]
        },
        { 
          label: 'Espadrilles', value: 'espadrilles',
          materials: [ { label: 'Canvas', value: 'canvas' }, { label: 'Wedge', value: 'wedge' }, { label: 'Flat', value: 'flat' }, { label: 'Suede', value: 'suede' }, { label: 'Leather', value: 'leather' } ],
          colors: [ { label: 'Beige', value: 'beige' }, { label: 'Navy Blue', value: 'navy blue' }, { label: 'Red', value: 'red' } ]
        },
        { 
          label: 'Platform Shoes', value: 'platform shoes',
          materials: [ { label: 'Leather', value: 'leather' }, { label: 'Suede', value: 'suede' }, { label: 'Velvet', value: 'velvet' }, { label: 'Patent Leather', value: 'patent leather' }, { label: 'Canvas', value: 'canvas' }, { label: 'Glitter', value: 'glitter' } ],
          colors: [ { label: 'Black', value: 'black' }, { label: 'White', value: 'white' }, { label: 'Pink', value: 'pink' } ]
        },
        { 
            label: 'Gothic Platform Boots', value: 'gothic platform boots',
            materials: [ { label: 'Black Leather', value: 'black leather' }, { label: 'Patent Leather', value: 'patent leather' }, { label: 'With Buckles and Straps', value: 'with buckles and straps' }, { label: 'Velvet', value: 'velvet' }, { label: 'Matte Black', value: 'matte black' } ],
            colors: [ { label: 'Black', value: 'black' }, { label: 'Dark Purple', value: 'dark purple' }, { label: 'Blood Red', value: 'blood red' } ]
        }
      ]
    },
    accessoriesOptions: [
      { id: 'head', label: 'Headwear', options: [
        { id: 'type', label: 'Type', options: [ { label: 'Hat', value: 'hat' }, { label: 'Beanie', value: 'beanie' }, { label: 'Headband', value: 'headband' }, { label: 'Crown', value: 'crown' }, { label: 'Tiara', value: 'tiara' }, { label: 'Fascinator', value: 'fascinator' }, { label: 'Beret', value: 'beret' }, { label: 'Visor', value: 'visor' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Felt', value: 'felt' }, { label: 'Knit', value: 'knit' }, { label: 'Metal', value: 'metal' }, { label: 'Straw', value: 'straw' }, { label: 'Leather', value: 'leather' }, { label: 'Silk', value: 'silk' }, { label: 'Velvet', value: 'velvet' } ] }
      ]},
      { id: 'neck', label: 'Neckwear', options: [
        { id: 'type', label: 'Type', options: [ { label: 'Necklace', value: 'necklace' }, { label: 'Choker', value: 'choker' }, { label: 'Scarf', value: 'scarf' }, { label: 'Tie', value: 'tie' }, { label: 'Pendant', value: 'pendant' }, { label: 'Bow Tie', value: 'bow tie' }, { label: 'Bandana', value: 'bandana' }, { label: 'Lace Choker', value: 'lace choker' }, { label: 'Velvet Choker with Cameo', value: 'velvet choker with a cameo' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Gold', value: 'gold' }, { label: 'Silver', value: 'silver' }, { label: 'Silk', value: 'silk' }, { label: 'Pearls', value: 'pearls' }, { label: 'Leather', value: 'leather' }, { label: 'Velvet', value: 'velvet' }, { label: 'Gemstones', value: 'gemstones' }, { label: 'Beads', value: 'beads' } ] }
      ]},
      { id: 'ears', label: 'Earrings', options: [
        { id: 'type', label: 'Type', options: [ { label: 'Studs', value: 'studs' }, { label: 'Hoops', value: 'hoops' }, { label: 'Dangle', value: 'dangle earrings' }, { label: 'Ear Cuffs', value: 'ear cuffs' }, { label: 'Chandelier Earrings', value: 'chandelier earrings' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Diamonds', value: 'diamond' }, { label: 'Pearls', value: 'pearl' }, { label: 'Gold', value: 'gold' }, { label: 'Silver', value: 'silver' }, { label: 'Platinum', value: 'platinum' }, { label: 'Gemstones', value: 'gemstones' }, { label: 'Enamel', value: 'enamel' } ] }
      ]},
      { id: 'wrists', label: 'Wristwear', options: [
        { id: 'type', label: 'Type', options: [ { label: 'Bracelet', value: 'bracelet' }, { label: 'Cuff', value: 'cuff' }, { label: 'Watch', value: 'watch' }, { label: 'Shackles', value: 'shackles' }, { label: 'Bangle', value: 'bangle' }, { label: 'Charm Bracelet', value: 'charm bracelet' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Leather', value: 'leather' }, { label: 'Silver', value: 'silver' }, { label: 'Gold', value: 'gold' }, { label: 'Rusted Iron', value: 'rusted iron' }, { label: 'Beads', value: 'beads' }, { label: 'Rope', value: 'rope' }, { label: 'Stainless Steel', value: 'stainless steel' }, { label: 'Gemstones', value: 'gemstones' } ] }
      ]},
       { id: 'hands', label: 'Handwear', options: [
        { id: 'type', label: 'Type', options: [ { label: 'Gloves', value: 'gloves' }, { label: 'Fingerless Gloves', value: 'fingerless gloves' }, { label: 'Opera Gloves', value: 'opera gloves' }, { label: 'Lace Gloves', value: 'lace gloves' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Leather', value: 'leather' }, { label: 'Lace', value: 'lace' }, { label: 'Satin', value: 'satin' }, { label: 'Velvet', value: 'velvet' }, { label: 'Knit Wool', value: 'knit wool' }, { label: 'Sheer Tulle', value: 'sheer tulle' }, { label: 'Fishnet', value: 'fishnet' } ] }
      ]},
       { id: 'fingers', label: 'Rings', options: [
        { id: 'type', label: 'Type', options: [ { label: 'Solitaire Ring', value: 'solitaire ring' }, { label: 'Band', value: 'band' }, { label: 'Cocktail Ring', value: 'cocktail ring' }, { label: 'Signet Ring', value: 'signet ring' }, { label: 'Stacking Rings', value: 'stacking rings' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Gold with Diamond', value: 'gold with diamond' }, { label: 'Silver', value: 'silver' }, { label: 'Platinum', value: 'platinum' }, { label: 'Rose Gold', value: 'rose gold' }, { label: 'Titanium', value: 'titanium' }, { label: 'With Gemstones', value: 'with gemstones' } ] }
      ]},
       { id: 'waist', label: 'Belts', options: [
        { id: 'type', label: 'Type', options: [ { label: 'Thin Belt', value: 'thin belt' }, { label: 'Wide Belt', value: 'wide belt' }, { label: 'Chain Belt', value: 'chain belt' }, { label: 'Obi Belt', value: 'obi belt' }, { label: 'Hip Belt', value: 'hip belt' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Leather', value: 'leather' }, { label: 'Metal', value: 'metal' }, { label: 'Fabric', value: 'fabric' }, { label: 'Suede', value: 'suede' }, { label: 'Braided Rope', value: 'braided rope' }, { label: 'PVC', value: 'pvc' } ] }
      ]},
       { id: 'other', label: 'Other', options: [
        { id: 'type', label: 'Type', options: [ { label: 'Glasses', value: 'glasses' }, { label: 'Sunglasses', value: 'sunglasses' }, { label: 'Handbag', value: 'handbag' }, { label: 'Backpack', value: 'backpack' }, { label: 'Clutch', value: 'clutch' }, { label: 'Tote Bag', value: 'tote bag' }, { label: 'Crossbody Bag', value: 'crossbody bag' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Leather', value: 'leather' }, { label: 'Canvas', value: 'canvas' }, { label: 'Acetate', value: 'acetate' }, { label: 'Nylon', value: 'nylon' }, { label: 'Metal', value: 'metal' }, { label: 'Suede', value: 'suede' }, { label: 'Faux Fur', value: 'faux fur' } ] }
      ]}
    ],
    poseOptions: [
      { label: 'Standing', value: 'standing' },
      { label: 'Sitting', value: 'sitting' },
      { label: 'Lying Down', value: 'lying down' },
      { label: 'Kneeling', value: 'kneeling' },
      { label: 'Running', value: 'running' },
      { label: 'Jumping', value: 'jumping' },
      { label: 'Dancing', value: 'dancing' },
      { label: 'Walking', value: 'walking' },
    ],
    poseDetailsByPose: {
      'standing': [
        { label: 'Hands on Hips', value: 'with hands on hips' },
        { label: 'Arms Crossed', value: 'with arms crossed' },
        { label: 'Leaning against a Wall', value: 'leaning against a wall' },
        { label: 'Fashion Walk', value: 'walking forward as if on a runway' },
        { label: 'Hands Behind Back', value: 'with hands behind back' },
        { label: 'Standing on Tiptoes', value: 'standing on tiptoe' },
        { label: 'Arms Outstretched', value: 'with arms outstretched' },
        { label: 'Waving', value: 'waving hello or goodbye' },
        { label: 'Shrugging shoulders', value: 'shrugging shoulders' },
        { label: 'View from Back', value: 'view from back' },
      ],
      'sitting': [
        { label: 'Cross-Legged', value: 'sitting cross-legged' },
        { label: 'Leaning Forward', value: 'leaning forward' },
        { label: 'Hand Supporting Head', value: 'with one hand supporting the head' },
        { label: 'Meditating', value: 'meditating peacefully' },
        { label: 'Looking Down', value: 'looking down' },
        { label: 'View from Back', value: 'view from back' },
      ],
      'lying down': [
        { label: 'On back (Supine)', value: 'on back, facing up (supine)' },
        { label: 'On stomach (Prone)', value: 'on stomach (prone)' },
        { label: 'On side, facing camera', value: 'on side, facing the camera' },
        { label: 'With back to camera', value: 'with back to the camera' },
        { label: 'Looking over shoulder', value: 'looking over the shoulder' },
        { label: 'Head resting on hand', value: 'with head resting on one hand' },
        { label: 'Reclining on pillows', value: 'reclining on pillows' },
        { label: 'View from Back', value: 'view from back' },
      ],
      'kneeling': [
        { label: 'Upright', value: 'kneeling upright' },
        { label: 'Sitting back on heels', value: 'sitting back on heels' },
        { label: 'Looking up', value: 'looking up' },
        { label: 'As if Proposing Marriage', value: 'as if proposing marriage' },
        { label: 'As if Surrendering (Hands Up)', value: 'as if surrendering with hands up' },
        { label: 'View from Back', value: 'view from back' },
      ],
      'running': [
        { label: 'Sprinting', value: 'sprinting' },
        { label: 'Jogging', value: 'jogging casually' },
        { label: 'View from Back', value: 'view from back' },
      ],
      'jumping': [
        { label: 'Jumping for joy', value: 'jumping for joy' },
        { label: 'Mid-air action pose', value: 'in a mid-air action pose' },
        { label: 'Doing a Star Jump', value: 'doing a star jump' },
        { label: 'View from Back', value: 'view from back' },
      ],
      'dancing': [
        { label: 'Graceful ballet pose', value: 'in a graceful ballet pose' },
        { label: 'Dynamic hip-hop move', value: 'in a dynamic hip-hop move' },
        { label: 'Twirling', value: 'twirling' },
        { label: 'Salsa Dancing', value: 'salsa dancing' },
        { label: 'Breakdancing Freeze', value: 'in a breakdancing freeze pose' },
        { label: 'Ballroom Dancing', value: 'ballroom dancing' },
        { label: 'View from Back', value: 'view from back' },
      ],
       'walking': [
        { label: 'Striding purposefully', value: 'striding purposefully' },
        { label: 'Strolling casually', value: 'strolling casually' },
        { label: 'Looking back', value: 'while looking back' },
        { label: 'View from Back', value: 'view from back' },
      ]
    },
    lightingOptions: [
      { label: 'Studio Light', value: 'bright studio lighting' },
      { label: 'Golden Hour', value: 'warm, golden hour lighting' },
      { label: 'Dramatic (Chiaroscuro)', value: 'dramatic, high-contrast chiaroscuro lighting' },
      { label: 'Neon Glow', value: 'lit by vibrant neon signs' },
      { label: 'Soft and Diffused', value: 'soft, diffused natural light' },
    ],
    backgroundOptions: [
      { label: 'Studio Backdrop (Gray)', value: 'a solid gray studio backdrop' },
      { label: 'Bustling City Street', value: 'a bustling city street at night' },
      { label: 'Dark Alleyway', value: 'a dark, gritty urban alleyway with moody lighting' },
      { label: 'Serene Natural Landscape', value: 'a serene natural landscape with mountains and a lake' },
      { label: 'Luxurious Interior', value: 'a luxurious, modern interior of a penthouse' },
      { label: 'Opulent Ballroom', value: 'an opulent ballroom with crystal chandeliers' },
      { label: 'Modern Bathroom', value: 'a sleek, modern bathroom with a large bathtub' },
      { label: 'Hot Tub / Jacuzzi', value: 'a luxurious outdoor hot tub at a ski resort' },
      { label: 'Rainy Shower', value: 'inside a modern glass shower with water streaming down' },
      { label: 'Cozy Library', value: 'a cozy library with a fireplace and leather armchairs' },
      { label: 'Enchanted Forest', value: 'an enchanted, magical forest at twilight' },
      { label: 'Gothic Dungeon', value: 'a dark and moody gothic dungeon with stone walls and chains' },
      { label: 'Crumbling Castle Ruins at Dusk', value: 'crumbling castle ruins at dusk' },
      { label: 'Sacrificial Altar in Cavern', value: 'a sacrificial altar in a dark cavern' },
      { label: 'Dark Lord\'s Throne Room', value: 'a throne room of a dark lord' },
      { label: 'Haunted Battlefield', value: 'a haunted battlefield under a blood moon' },
      { label: 'Abandoned Gothic Cathedral', value: 'the interior of a grand, abandoned gothic cathedral' },
      { label: 'Misty Cemetery', value: 'a misty cemetery with old gravestones' },
      { label: 'Victorian Haunted Mansion', value: 'a Victorian-era haunted mansion' },
      { label: 'Ornate Library with Candlelight', value: 'an ornate library with candlelight' },
      { label: 'Dark Prison Cell', value: 'a dark, oppressive prison cell with a single barred window' },
      { label: 'Torture Chamber', value: 'a torture chamber with ominous devices in the shadows' },
      { label: 'Mossy Dungeon Corridor', value: 'an ancient, moss-covered dungeon corridor lit by torches' },
      { label: 'Underground Sewer', value: 'a dark, damp underground sewer tunnel' },
      { label: 'Crumbling Crypt', value: 'a crumbling castle crypt filled with cobwebs' },
      { label: 'Spaceship Bridge', value: 'the command bridge of a futuristic spaceship' },
      { label: 'Graffiti Wall', value: 'an urban alley with vibrant graffiti' },
      { label: 'Beach at Sunset', value: 'a tropical beach at sunset' },
      { label: 'Snowy Mountain Peak', value: 'a snowy mountain peak with a clear blue sky' },
      { label: 'Vast Prairie at Sunset', value: 'a vast, open prairie at sunset with rolling hills' },
      { label: 'Tipi Village on the Plains', value: 'a tipi village on the Great Plains under a wide-open sky' },
      { label: 'Amazon Rainforest Clearing', value: 'a traditional village clearing in the Amazon rainforest' },
      { label: 'Winding Jungle River', value: 'beside a winding river in the heart of the jungle' },
      { label: 'Japanese Garden', value: 'a tranquil japanese garden with a koi pond' },
      { label: 'Stage with Spotlight', value: 'on a stage under a single spotlight' },
      { label: 'High-Rise Balcony', value: 'on a high-rise balcony overlooking a city at night' },
      { label: 'Chic Bar Counter', value: 'at a chic, modern bar counter' },
      { label: 'Mansion Window', value: 'in front of a grand bay window in a mansion' },
      { label: 'Throne Room', value: 'in a majestic throne room' },
      { label: 'Autumn Park Bench', value: 'on a park bench in autumn' },
      { label: 'Vintage Motorcycle', value: 'next to a vintage motorcycle on a desert road' },
      { label: 'Sunlit Bedroom', value: 'on the edge of a bed in a sunlit, minimalist bedroom' },
      { label: 'Rooftop Edge', value: 'on the edge of a skyscraper rooftop at sunset' },
      { label: 'Field of Wildflowers', value: 'in a vibrant field of wildflowers' },
      { label: 'Graveyard in the Mist', value: 'in a graveyard on a misty morning' },
      { label: 'Rainy City Street', value: 'on a city street during a downpour at night' },
      { label: 'Grand Staircase', value: 'on a grand staircase in an opera house' },
      { label: 'Action Movie Explosion', value: 'an action movie scene with an explosion in the background' },
      { label: 'Music Festival Crowd', value: 'in the middle of a lively music festival crowd' },
      { label: 'Red Carpet Event', value: 'on a red carpet at a movie premiere' },
      { label: 'Vast Sand Desert', value: 'in a vast sand desert at sunrise' },
      { label: 'Bustling Street Market', value: 'in a bustling, colorful open-air street market' },
    ],
  },
  pt: {
    visualStyleOptions: [
      { label: "Fotorrealista", value: "Uma imagem fotorrealista de alta resolução." },
      { label: "Arte Digital", value: "Uma ilustração digital detalhada e vibrante." },
      { label: "Pintura a Óleo", value: "Uma pintura a óleo clássica com texturas ricas." },
      { label: "Aquarela", value: "Uma pintura em aquarela suave e fluida." },
      { label: "Esboço a Carvão", value: "Um esboço dramático em preto e branco a carvão." },
      { label: "Estilo Anime", value: "Um estilo de anime vibrante dos anos 90." },
      { label: "Renderização 3D", value: "Uma renderização 3D cinematográfica, como um personagem de filme de animação." },
      { label: "Fotografia Vintage", value: "A aparência de uma fotografia vintage, tirada em filme de 35mm." },
      { label: "Arte de Fantasia", value: "Arte conceitual de fantasia épica com elementos mágicos." },
      { label: "Arte de Rua (Grafite)", value: "Um estilo de arte de rua vibrante e ousado de grafite." },
      { label: "Arte de Graphic Novel", value: "Um estilo de graphic novel ou história em quadrinhos arrojado e com nanquim." },
    ],
    imageStyleOptions: [
        { label: "Padrão (Nenhum)", value: "" },
        { label: "Animação Pixar", value: "estilo de filme de animação da Pixar" },
        { label: "Animação Disney", value: "estilo de filme de animação da Disney" },
        { label: "Estilo Tim Burton", value: "estilo de animação gótico e peculiar característico de Tim Burton" },
        { label: "Studio Ghibli", value: "estilo de anime desenhado à mão do Studio Ghibli" },
        { label: "Estilo Grand Theft Auto", value: "estilo de arte de videogame Grand Theft Auto" },
        { label: "Estilo Os Simpsons", value: "estilo de animação do desenho Os Simpsons" },
        { label: "Estilo Rick and Morty", value: "estilo de animação do desenho Rick and Morty" },
        { label: "Estilo Claymation", value: "estilo de claymation da Aardman, como Wallace e Gromit" },
        { label: "Estilo Boneco LEGO", value: "um boneco LEGO" },
        { label: "Estilo Final Fantasy VII", value: "estilo de arte do videogame Final Fantasy VII Remake" },
        { label: "Zelda: Breath of the Wild", value: "estilo de arte do videogame The Legend of Zelda: Breath of the Wild" },
        { label: "Arte de Fantasia Sombria", value: "estilo de arte conceitual dos videogames Dark Souls / Bloodborne" },
        { label: "Cyberpunk", value: "estilo de arte de videogame Cyberpunk 2077" },
        { label: "Steampunk", value: "estilo de arte conceitual Steampunk" },
        { label: "Estilo Marvel Comics", value: "estilo de arte clássico das histórias em quadrinhos da Marvel" },
        { label: "Estilo DC (Novos 52)", value: "estilo de arte dos Novos 52 da DC Comics" },
        { label: "Estilo Ukiyo-e", value: "estilo de gravura japonesa Ukiyo-e" },
        { label: "Vitral", value: "um vitral vibrante e intrincado" },
        { label: "Art Déco", value: "estilo de pôster Art Déco" },
        { label: "Pop Art", value: "estilo Pop Art de Andy Warhol" },
        { label: "Surrealismo", value: "estilo de pintura surrealista de Salvador Dali" },
        { label: "Impressionismo", value: "estilo de pintura impressionista de Claude Monet" },
        { label: "Cubismo", value: "estilo de pintura cubista de Pablo Picasso" },
    ],
    decadeOptions: [
      { label: "Atual", value: "atual" },
      { label: "Anos 2020", value: "2020s" },
      { label: "Anos 2010", value: "2010s" },
      { label: "Anos 2000 (Y2K)", value: "2000s (Y2K)" },
      { label: "Anos 1990", value: "1990s" },
      { label: "Anos 1980", value: "1980s" },
      { label: "Anos 1970", value: "1970s" },
      { label: "Anos 1960", value: "1960s" },
      { label: "Anos 1950", value: "1950s" },
      { label: "Anos 1940", value: "1940s" },
      { label: "Anos 1930", value: "1930s" },
      { label: "Anos 1920", value: "1920s" },
      { label: "Anos 1910", value: "1910s" },
      { label: "Anos 1900", value: "1900s" },
      { label: "Anos 1890", value: "1890s" },
      { label: "Anos 1880", value: "1880s" },
      { label: "Anos 1870", value: "1870s" },
      { label: "Anos 1860", value: "1860s" },
      { label: "Anos 1850", value: "1850s" },
      { label: "Anos 1840", value: "1840s" },
      { label: "Anos 1830", value: "1830s" },
      { label: "Anos 1820", value: "1820s" },
      { label: "Anos 1810", value: "1810s" },
      { label: "Anos 1800", value: "1800s" },
      { label: "Era Eduardiana", value: "Era Eduardiana", costumes: [ { label: "Aristocrata", value: "um traje formal de aristocrata eduardiano, como um vestido longo de gola alta com espartilho 'curva S' para mulheres ou um terno de três peças para homens, com sapatos ou botas de couro elegantes." }, { label: "Sufragista", value: "o traje de uma sufragista eduardiana, muitas vezes um vestido ou blusa branca prática com saia longa, e botas de caminhada sensatas." }, { label: "Servo", value: "um uniforme de servo simples e funcional da era eduardiana, como o vestido preto de uma empregada com avental e touca brancos, e sapatos pretos simples." } ] },
      { label: "Era Vitoriana", value: "Era Vitoriana", costumes: [ { label: "Classe Alta", value: "um elegante traje vitoriano de classe alta, como um vestido com espartilho e anquinha para mulheres ou uma sobrecasaca para homens, com botas de couro polido." }, { label: "Classe Trabalhadora", value: "as roupas gastas e práticas da classe trabalhadora vitoriana, como vestidos simples ou calças com coletes, e botas de trabalho resistentes e gastas." }, { label: "Gótico", value: "gótico" }, { label: "Steampunk", value: "steampunk" } ] },
      { label: "Período Regencial", value: "Período Regencial" },
      { label: "Era Rococó", value: "Era Rococó" },
      { label: "Era Barroca", value: "Era Barroca" },
      { label: "Era Renascentista", value: "Era Renascentista", costumes: [ { label: "Nobre", value: "um opulento traje nobre renascentista, com tecidos ricos como veludo e brocado, e sapatos de couro macio." }, { label: "Artista", value: "as roupas práticas e estilosas de um artista renascentista, como uma camisa solta, calções e sapatos de couro simples." }, { label: "Comerciante", value: "as roupas abastadas de um comerciante renascentista, mostrando riqueza com mantos forrados de pele e sapatos de couro resistentes." } ] },
      { label: "Era Medieval", value: "Era Medieval", costumes: [ { label: "Plebeu", value: "as roupas simples e rústicas de um plebeu medieval, como uma túnica e calças, com sapatos simples de couro ou faixas nos pés." }, { label: "Nobre", value: "o traje luxuoso de um nobre medieval, como um vestido de veludo ou um gibão fino, completo com sapatos de couro elegantes." }, { label: "Armadura de Cavaleiro", value: "uma armadura de placas completa e polida de cavaleiro, do capacete aos sabatons (armadura para os pés)." }, { label: "Monge", value: "as vestes marrons humildes de um monge, amarradas com um cinto de corda, e usando sandálias de couro simples." } ] },
      { label: "Roma Antiga", value: "romana antiga", costumes: [ { label: "Cidadão", value: "cidadão" }, { label: "Senador", value: "senador" }, { label: "Soldado (Legionário)", value: "Armadura completa de legionário romano, incluindo lorica segmentata (couraça segmentada), capacete galea, túnica vermelha e sandálias caligae." }, { label: "Gladiador", value: "Equipamento autêntico de gladiador: {{gladiator_chest}}, um subligaculum (tanga), uma manica (protetor de braço), uma ocrea (greva na perna esquerda), um capacete distinto e sandálias de couro (caligae)." } ] },
      { label: "Grécia Antiga", value: "grega antiga", costumes: [ { label: "Cidadão", value: "um quíton ou peplos grego simples, e sandálias de couro." }, { label: "Filósofo", value: "um himation simples drapeado sobre um quíton, com sandálias de couro, com ar contemplativo." }, { label: "Soldado Hoplita", value: "a armadura completa de um soldado hoplita grego, incluindo couraça de bronze, capacete, grevas e sandálias de couro." } ] },
      { label: "Egito Antigo", value: "egípcia antiga", costumes: [ { label: "Realeza (Faraó/Rainha)", value: "Traje real de um Faraó egípcio, incluindo um toucado Nemes dourado, um opulento colar Usekh adornado com lápis-lazúli, um kilt Shendyt e sandálias douradas ornamentadas." }, { label: "Sacerdote/Sacerdotisa", value: "As vestes de um sacerdote egípcio, com cabeça raspada, túnicas simples de linho branco e pés descalços. Sumos sacerdotes também devem usar uma pele de leopardo sobre um ombro." }, { label: "Plebeu", value: "Traje simples de um plebeu egípcio: um kilt de linho simples e sem decoração para homens, ou um vestido reto e simples de linho para mulheres, e eles devem estar descalços." } ] },
      { label: "Pré-histórico", value: "pré-histórico" },
    ],
    hairOptions: [
      { id: 'length', label: 'Comprimento', options: [ { label: 'Corte Militar (Buzz Cut)', value: 'corte militar' }, { label: 'Corte Pixie', value: 'corte pixie' }, { label: 'Bob Curto', value: 'bob curto' }, { label: 'Comprimento Médio', value: 'comprimento médio' }, { label: 'Na Altura dos Ombros', value: 'na altura dos ombros' }, { label: 'Longo', value: 'longo' }, { label: 'Extra Longo', value: 'extra longo' }, { label: 'Raspado', value: 'cabeça raspada' } ] },
      { id: 'style', label: 'Estilo', options: [ { label: 'Liso', value: 'liso' }, { label: 'Ondulado', value: 'ondulado' }, { label: 'Cacheado', value: 'cacheado' }, { label: 'Crespo', value: 'crespo' }, { label: 'Tranças', value: 'tranças' }, { label: 'Tranças Nagô', value: 'tranças nagô' }, { label: 'Dreadlocks', value: 'dreadlocks' }, { label: 'Coque', value: 'coque' }, { label: 'Coque Bagunçado', value: 'coque bagunçado' }, { label: 'Rabo de Cavalo', value: 'rabo de cavalo' }, { label: 'Rabo de Cavalo Alto', value: 'rabo de cavalo alto' }, { label: 'Penteado Preso', value: 'penteado preso' }, { label: 'Afro', value: 'afro' }, { label: 'Moicano', value: 'moicano' }, { label: 'Mullet', value: 'mullet' } ] },
      { id: 'color', label: 'Cor', options: [ { label: 'Preto', value: 'preto' }, { label: 'Castanho', value: 'castanho' }, { label: 'Loiro', value: 'loiro' }, { label: 'Loiro Platinado', value: 'loiro platinado' }, { label: 'Ruivo', value: 'ruivo' }, { label: 'Acobreado', value: 'acobreado' }, { label: 'Vinho (Burgundy)', value: 'vinho' }, { label: 'Grisalho', value: 'grisalho' }, { label: 'Prateado', value: 'prateado' }, { label: 'Branco', value: 'branco' }, { label: 'Rosa Pastel', value: 'rosa pastel' }, { label: 'Lilás', value: 'lilás' }, { label: 'Azul Elétrico', value: 'azul elétrico' }, { label: 'Turquesa', value: 'turquesa' }, { label: 'Verde Esmeralda', value: 'verde esmeralda' }, { label: 'Laranja Vibrante', value: 'laranja vibrante' }, { label: 'Arco-íris', value: 'arco-íris' } ] },
    ],
    clothingOptions: {
      onePiece: { label: 'Peça Única', options: {
        types: [
          { label: 'Vestido', value: 'vestido', styles: [ { label: 'Curto (Mini)', value: 'curto, comprimento mini' }, { label: 'Na Altura do Joelho', value: 'comprimento no joelho' }, { label: 'Midi', value: 'comprimento midi' }, { label: 'Longo (Maxi)', value: 'longo, comprimento maxi' }, { label: 'Decotado / Decote V Profundo', value: 'decotado com decote V profundo' }, { label: 'Ombro a Ombro', value: 'ombro a ombro' }, { label: 'Um Ombro Só', value: 'de um ombro só' }, { label: 'Frente Única', value: 'frente única' }, { label: 'Tomara que Caia', value: 'tomara que caia' }, { label: 'Linha A', value: 'linha A' }, { label: 'Justo (Bodycon)', value: 'justo (bodycon)' }, { label: 'Tubinho', value: 'tubinho' }, { label: 'Acinturado e Rodado', value: 'acinturado e rodado' }, { label: 'Vestido de Baile', value: 'vestido de baile' }, { label: 'Sereia', value: 'estilo sereia' }, { label: 'Com Fenda', value: 'com uma fenda alta na perna' }, { label: 'Costas Nuas', value: 'costas nuas' }, { label: 'Envelope', value: 'vestido envelope' }, { label: 'Slip Dress', value: 'slip dress' }, { label: 'Cintura Império', value: 'cintura império' }, { label: 'Vestido Camponesa', value: 'vestido camponesa' }, { label: 'Vestido Camisa', value: 'vestido camisa' }, { label: 'Vestido de Tricô', value: 'vestido de tricô' } ] },
          { label: 'Macacão', value: 'macacão', styles: [ { label: 'Perna Larga (Wide-Leg)', value: 'perna larga (wide-leg)' }, { label: 'Perna Afunilada', value: 'perna afunilada' }, { label: 'Tomara que Caia', value: 'tomara que caia' }, { label: 'Manga Longa', value: 'manga longa' }, { label: 'Manga Curta', value: 'manga curta' }, { label: 'Frente Única', value: 'frente única' }, { label: 'Macacão Utilitário', value: 'macacão utilitário' }, { label: 'Macacão Pantacourt', value: 'macacão pantacourt' } ] },
          { label: 'Macaquinho', value: 'macaquinho', styles: [ { label: 'Ombro a Ombro', value: 'ombro a ombro' }, { label: 'Manga Longa', value: 'manga longa' }, { label: 'Alças Finas', value: 'com alças finas' }, { label: 'Abotoado na Frente', value: 'abotoado na frente' } ] },
          { label: 'Kaftan', value: 'kaftan', styles: [ { label: 'Bordado', value: 'bordado' }, { label: 'Transparente', value: 'transparente' } ] },
          { label: 'Salopete', value: 'salopete', styles: [] },
          { label: 'Macacão Utilitário (Boiler Suit)', value: 'macacão de trabalho', styles: [] },
          { label: 'Vestido Gótico Lolita', value: 'vestido gótico lolita', styles: [ { label: 'Com Renda e Fitas', value: 'com renda e fitas' }, { label: 'Saia em Formato de Sino', value: 'com saia em formato de sino' } ] },
        ],
        fabrics: [ { label: 'Algodão', value: 'algodão' }, { label: 'Jeans', value: 'jeans' }, { label: 'Couro', value: 'couro' }, { label: 'Látex', value: 'látex' }, { label: 'Seda', value: 'seda' }, { label: 'Linho', value: 'linho' }, { label: 'Lã', value: 'lã' }, { label: 'Cetim', value: 'cetim' }, { label: 'Veludo', value: 'veludo' }, { label: 'Renda', value: 'renda' }, { label: 'Chiffon', value: 'chiffon' }, { label: 'Lantejoula', value: 'lantejoula' }, { label: 'Tweed', value: 'tweed' }, { label: 'Brocado', value: 'brocado' }, { label: 'Tule', value: 'tule' }, { label: 'Organza', value: 'organza' }, { label: 'Jersey', value: 'jersey' }, { label: 'Georgette', value: 'georgette' } ],
        colors: [ { label: 'Preto', value: 'preto' }, { label: 'Branco', value: 'branco' }, { label: 'Vermelho', value: 'vermelho' }, { label: 'Azul', value: 'azul' }, { label: 'Azul Marinho', value: 'azul marinho' }, { label: 'Verde', value: 'verde' }, { label: 'Verde Esmeralda', value: 'verde esmeralda' }, { label: 'Amarelo', value: 'amarelo' }, { label: 'Amarelo Mostarda', value: 'amarelo mostarda' }, { label: 'Rosa', value: 'rosa' }, { label: 'Roxo', value: 'roxo' }, { label: 'Laranja', value: 'laranja' }, { label: 'Cinza', value: 'cinza' }, { label: 'Marrom', value: 'marrom' }, { label: 'Bege', value: 'bege' }, { label: 'Dourado', value: 'dourado' }, { label: 'Prateado', value: 'prateado' }, { label: 'Verde-azulado (Teal)', value: 'verde-azulado' }, { label: 'Magenta', value: 'magenta' }, { label: 'Vinho (Burgundy)', value: 'vinho' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Listras', value: 'listrado' }, { label: 'Poá (Bolinhas)', value: 'de poá' }, { label: 'Floral', value: 'estampa floral' }, { label: 'Xadrez', value: 'xadrez' }, { label: 'Estampa de Animal', value: 'estampa de animal' }, { label: 'Camuflado', value: 'camuflado' }, { label: 'Geométrico', value: 'padrão geométrico' }, { label: 'Paisley', value: 'paisley' }, { label: 'Pied de Poule', value: 'pied de poule' }, { label: 'Tie-Dye', value: 'tie-dye' } ]
      }},
      tops: { label: 'Blusas e Camisetas', options: {
        types: [
          { label: 'Camiseta', value: 'camiseta', styles: [ { label: 'Gola Redonda', value: 'gola redonda' }, { label: 'Gola V', value: 'gola V' }, { label: 'Estampada', value: 'estampada' }, { label: 'Oversized', value: 'oversized' }, { label: 'Henley', value: 'henley' }, { label: 'Ringer Tee', value: 'ringer tee' } ] },
          { label: 'Blusa', value: 'blusa', styles: [ { label: 'De Botões', value: 'de botões' }, { label: 'Peplum', value: 'peplum' }, { label: 'Ombro a Ombro', value: 'ombro a ombro' }, { label: 'Com Laço no Pescoço', value: 'com laço no pescoço' }, { label: 'Com Babados', value: 'com babados' }, { label: 'Envelope', value: 'envelope' }, { label: 'De Renda', value: 'de renda' } ] },
          { label: 'Camisa', value: 'camisa', styles: [ { label: 'De Botões', value: 'de botões' }, { label: 'Flanela', value: 'flanela' }, { label: 'Chambray', value: 'chambray' }, { label: 'Polo', value: 'camisa polo' }, { label: 'Henley', value: 'camisa henley' } ] },
          { label: 'Regata', value: 'regata', styles: [ { label: 'Alças Finas', value: 'com alças finas' }, { label: 'Nadador', value: 'nadador' }, { label: 'Frente Única', value: 'frente única' } ] },
          { label: 'Cropped', value: 'cropped', styles: [ { label: 'Manga Longa', value: 'manga longa' }, { label: 'Ombro a Ombro', value: 'ombro a ombro' }, { label: 'Corpete (Bustier)', value: 'estilo corpete' } ] },
          { label: 'Suéter', value: 'suéter', styles: [ { label: 'Gola Alta', value: 'gola alta' }, { label: 'Gola Redonda', value: 'gola redonda' }, { label: 'Gola V', value: 'gola V' }, { label: 'Cardigã', value: 'cardigã' }, { label: 'Tricô Trançado', value: 'de tricô trançado' } ] },
          { label: 'Moletom com Capuz', value: 'moletom com capuz', styles: [ { label: 'Com Zíper', value: 'com zíper' }, { label: 'Fechado', value: 'fechado' } ] },
          { label: 'Moletom', value: 'moletom', styles: [] },
          { label: 'Body', value: 'body', styles: [ { label: 'Manga Longa', value: 'manga longa' }, { label: 'Sem Manga', value: 'sem manga' }, { label: 'Fio Dental', value: 'fio dental' } ] },
          { label: 'Tomara que Caia (Faixa)', value: 'top tomara que caia', styles: [] },
          { label: 'Túnica', value: 'túnica', styles: [] },
          { label: 'Corselet', value: 'corselet', styles: [] },
          { label: 'Blusa Camponesa', value: 'blusa camponesa', styles: [] },
          { label: 'Blusa Gótica Vitoriana', value: 'blusa gótica vitoriana', styles: [ { label: 'Gola Alta com Babados', value: 'gola alta com babados' }, { label: 'Detalhes em Renda', value: 'com detalhes em renda' } ] },
        ],
        fabrics: [ { label: 'Algodão', value: 'algodão' }, { label: 'Tricô', value: 'tricô' }, { label: 'Seda', value: 'seda' }, { label: 'Chiffon', value: 'chiffon' }, { label: 'Jersey', value: 'jersey' }, { label: 'Lã', value: 'lã' }, { label: 'Caxemira', value: 'caxemira' }, { label: 'Cetim', value: 'cetim' }, { label: 'Renda', value: 'renda' }, { label: 'Látex', value: 'látex' }, { label: 'Fleece', value: 'fleece' }, { label: 'Linho', value: 'linho' }, { label: 'Popeline', value: 'popeline' }, { label: 'Malha Canelada', value: 'malha canelada' }, { label: 'Tela', value: 'tela' } ],
        colors: [ { label: 'Preto', value: 'preto' }, { label: 'Branco', value: 'branco' }, { label: 'Vermelho', value: 'vermelho' }, { label: 'Azul', value: 'azul' }, { label: 'Verde', value: 'verde' }, { label: 'Verde Oliva', value: 'verde oliva' }, { label: 'Amarelo', value: 'amarelo' }, { label: 'Rosa', value: 'rosa' }, { label: 'Cinza', value: 'cinza' }, { label: 'Coral', value: 'coral' }, { label: 'Lavanda', value: 'lavanda' }, { label: 'Verde-azulado (Teal)', value: 'verde-azulado' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Listras', value: 'listrado' }, { label: 'Estampa Floral', value: 'estampa floral' }, { label: 'Estampa Gráfica', value: 'estampa gráfica' }, { label: 'Xadrez', value: 'xadrez' }, { label: 'Estampa de Animal', value: 'estampa de animal' } ]
      }},
      bottoms: { label: 'Calças e Saias', options: {
        types: [
          { label: 'Calça', value: 'calça', styles: [ { label: 'Perna Larga (Wide-Leg)', value: 'perna larga' }, { label: 'Corte Reto', value: 'corte reto' }, { label: 'Afunilada', value: 'afunilada' }, { label: 'Boca de Sino', value: 'boca de sino' }, { label: 'Cintura Alta', value: 'cintura alta' }, { label: 'Capri', value: 'capri' }, { label: 'Palazzo', value: 'palazzo' }, { label: 'Cintura Paperbag', value: 'cintura paperbag' } ] },
          { label: 'Calça Jeans', value: 'calça jeans', styles: [ { label: 'Skinny', value: 'skinny' }, { label: 'Reta', value: 'reta' }, { label: 'Bootcut', value: 'bootcut' }, { label: 'Boyfriend', value: 'estilo boyfriend' }, { label: 'Mom Jeans', value: 'mom jeans' }, { label: 'Rasgada', value: 'rasgada' } ] },
          { label: 'Saia', value: 'saia', styles: [ { label: 'Mini', value: 'mini' }, { label: 'Lápis', value: 'lápis' }, { label: 'Linha A', value: 'linha A' }, { label: 'Plissada', value: 'plissada' }, { label: 'Maxi', value: 'maxi' }, { label: 'Envelope', value: 'saia envelope' }, { label: 'Skater', value: 'skater' }, { label: 'Com Fenda', value: 'com fenda' }, { label: 'De Camadas', value: 'de camadas' } ] },
          { label: 'Shorts', value: 'shorts', styles: [ { label: 'Jeans Curtos', value: 'jeans curtos' }, { label: 'Bermuda', value: 'bermuda' }, { label: 'Cintura Alta', value: 'cintura alta' } ] },
          { label: 'Legging', value: 'legging', styles: [ { label: 'Cintura Alta', value: 'cintura alta' }, { label: 'Capri', value: 'comprimento capri' }, { label: 'Couro Sintético', value: 'couro sintético' } ] },
          { label: 'Pantacourt', value: 'pantacourt', styles: [] },
          { label: 'Calça Cargo', value: 'calça cargo', styles: [] },
          { label: 'Calça de Moletom', value: 'calça de moletom', styles: [] },
          { label: 'Saia Gótica em Camadas', value: 'saia gótica em camadas', styles: [ { label: 'Borda de Renda', value: 'com borda de renda' }, { label: 'Bainha Assimétrica', value: 'com bainha assimétrica' } ] },
        ],
        fabrics: [ { label: 'Jeans', value: 'jeans' }, { label: 'Algodão', value: 'algodão' }, { label: 'Couro', value: 'couro' }, { label: 'Látex', value: 'látex' }, { label: 'Veludo Cotelê', value: 'veludo cotelê' }, { label: 'Sarja', value: 'sarja' }, { label: 'Linho', value: 'linho' }, { label: 'Cetim', value: 'cetim' }, { label: 'Veludo', value: 'veludo' }, { label: 'Lã', value: 'lã' }, { label: 'Gabardine', value: 'gabardine' }, { label: 'Camurça', value: 'camurça' }, { label: 'Malha Ponte', value: 'malha ponte' } ],
        colors: [ { label: 'Azul', value: 'azul' }, { label: 'Preto', value: 'preto' }, { label: 'Branco', value: 'branco' }, { label: 'Cáqui', value: 'cáqui' }, { label: 'Cinza', value: 'cinza' }, { label: 'Vinho (Burgundy)', value: 'vinho' }, { label: 'Verde Militar', value: 'verde militar' }, { label: 'Mostarda', value: 'mostarda' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Risca de Giz', value: 'risca de giz' }, { label: 'Xadrez', value: 'xadrez' }, { label: 'Camuflado', value: 'camuflado' }, { label: 'Floral', value: 'floral' }, { label: 'Pied de Poule', value: 'pied de poule' } ]
      }},
      stockings: { label: 'Meias', options: {
        types: [
          { label: 'Meia-Calça', value: 'meia-calça', styles: [ { label: 'Opaca', value: 'opaca' }, { label: 'Fina (Sheer)', value: 'fina' }, { label: 'Arrastão', value: 'arrastão' }, { label: 'Estampada', value: 'estampada' }, { label: 'Com Glitter', value: 'com glitter' }, { label: 'Com Costura Atrás', value: 'com costura atrás' } ] },
          { label: 'Meias', value: 'meias', styles: [ { label: 'Soquete', value: 'soquete' }, { label: 'Cano Médio', value: 'cano médio' }, { label: 'Até o Joelho', value: 'até o joelho' }, { label: 'Invisível', value: 'invisível' } ] },
          { label: 'Meias 7/8', value: 'meias 7/8', styles: [ { label: 'Topo de Renda', value: 'com topo de renda' }, { label: 'Com Faixa de Silicone', value: 'com faixa de silicone' }, { label: 'Com Cinta-Liga', value: 'presas por uma cinta-liga' } ] },
          { label: 'Polainas', value: 'polainas', styles: [ { label: 'Folgeda (Slouchy)', value: 'folgada' }, { label: 'Canelada', value: 'canelada' } ] },
          { label: 'Meia-Calça com Cinta-Liga', value: 'meia-calça com cinta-liga', styles: [] },
          { label: 'Meia-Calça sem Pé', value: 'meia-calça sem pé', styles: [] },
        ],
        fabrics: [ { label: 'Nylon', value: 'nylon' }, { label: 'Algodão', value: 'algodão' }, { label: 'Lã', value: 'lã' }, { label: 'Renda', value: 'renda' }, { label: 'Látex', value: 'látex' }, { label: 'Microfibra', value: 'microfibra' }, { label: 'Lurex', value: 'lurex' }, { label: 'Spandex', value: 'spandex' }, { label: 'Arrastão', value: 'arrastão' }, { label: 'Caxemira', value: 'caxemira' } ],
        colors: [ { label: 'Preto', value: 'preto' }, { label: 'Cor da Pele', value: 'cor da pele' }, { label: 'Branco', value: 'branco' }, { label: 'Vermelho', value: 'vermelho' }, { label: 'Cinza', value: 'cinza' }, { label: 'Roxo', value: 'roxo' }, { label: 'Azul Marinho', value: 'azul marinho' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Argyle', value: 'argyle' }, { label: 'Listrado', value: 'listrado' }, { label: 'Poá', value: 'poá' }, { label: 'Renda Floral', value: 'renda floral' } ]
      }},
      outerwear: { label: 'Casacos e Jaquetas', options: {
        types: [
          { label: 'Jaqueta', value: 'jaqueta', styles: [ { label: 'Jeans', value: 'jeans' }, { label: 'De Couro (Biker)', value: 'de couro (biker)' }, { label: 'Bomber', value: 'bomber' }, { label: 'Acolchoada (Puffer)', value: 'acolchoada (puffer)' }, { label: 'Corta-Vento', value: 'corta-vento' }, { label: 'Militar', value: 'militar' }, { label: 'Trucker', value: 'trucker' } ] },
          { label: 'Casaco', value: 'casaco', styles: [ { label: 'Trench Coat', value: 'trench coat' }, { label: 'Pea Coat', value: 'pea coat' }, { label: 'Sobretudo', value: 'sobretudo' }, { label: 'Pele Sintética', value: 'pele sintética' }, { label: 'Parka', value: 'parka' }, { label: 'Duffle Coat', value: 'duffle coat' }, { label: 'Envelope', value: 'envelope' } ] },
          { label: 'Blazer', value: 'blazer', styles: [ { label: 'Abotoamento Simples', value: 'abotoamento simples' }, { label: 'Abotoamento Duplo', value: 'abotoamento duplo' }, { label: 'Oversized', value: 'oversized' } ] },
          { label: 'Cardigã', value: 'cardigã', styles: [ { label: 'Longo', value: 'longo' }, { label: 'Curto (Cropped)', value: 'curto (cropped)' }, { label: 'Tricô Grosso', value: 'de tricô grosso' } ] },
          { label: 'Colete', value: 'colete', styles: [ { label: 'De Alfaiataria', value: 'de alfaiataria' }, { label: 'Acolchoado', value: 'acolchoado' }, { label: 'Utilitário', value: 'utilitário' } ] },
          { label: 'Capa', value: 'capa', styles: [ { label: 'Com Capuz', value: 'com capuz' }, { label: 'Longa', value: 'longa' } ] },
          { label: 'Poncho', value: 'poncho', styles: [] },
          { label: 'Casaco Duster', value: 'casaco duster', styles: [] },
          { label: 'Casaca Gótica', value: 'casaca gótica', styles: [ { label: 'De Veludo', value: 'de veludo' }, { label: 'Botões Ornamentados', value: 'com botões ornamentados' } ] },
        ],
        fabrics: [ { label: 'Jeans', value: 'jeans' }, { label: 'Couro', value: 'couro' }, { label: 'Látex', value: 'látex' }, { label: 'Lã', value: 'lã' }, { label: 'Fleece', value: 'fleece' }, { label: 'Tweed', value: 'tweed' }, { label: 'Pluma', value: 'pluma' }, { label: 'Caxemira', value: 'caxemira' }, { label: 'Pelo de Ovelha Sintético', value: 'pelo de ovelha sintético' }, { label: 'Gabardine', value: 'gabardine' }, { label: 'Veludo Cotelê', value: 'veludo cotelê' }, { label: 'Pele Sintética', value: 'pele sintética' }, { label: 'Nylon', value: 'nylon' } ],
        colors: [ { label: 'Preto', value: 'preto' }, { label: 'Caramelo', value: 'caramelo' }, { label: 'Azul Marinho', value: 'azul marinho' }, { label: 'Cinza', value: 'cinza' }, { label: 'Verde Oliva', value: 'verde oliva' }, { label: 'Vinho (Burgundy)', value: 'vinho' }, { label: 'Verde Floresta', value: 'verde floresta' }, { label: 'Creme', value: 'creme' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Xadrez', value: 'xadrez' }, { label: 'Pied de Poule', value: 'pied de poule' }, { label: 'Espinha de Peixe', value: 'espinha de peixe' }, { label: 'Camuflado', value: 'camuflado' } ]
      }},
      suits: { label: 'Terno / Roupa Formal', options: {
        types: [
          { label: 'Terno Executivo', value: 'terno executivo', styles: [ { label: 'Com Saia', value: 'com saia' }, { label: 'Com Calça', value: 'com calça' }, { label: 'Três Peças', value: 'três peças' }, { label: 'Abotoamento Duplo', value: 'abotoamento duplo' }, { label: 'Abotoamento Simples', value: 'abotoamento simples' } ] },
          { label: 'Smoking', value: 'smoking', styles: [ { label: 'Black Tie Clássico', value: 'black tie clássico' }, { label: 'Moderno Slim Fit', value: 'moderno slim fit' } ] },
          { label: 'Macacão Formal', value: 'macacão formal', styles: [ { label: 'Perna Larga', value: 'perna larga' }, { label: 'Com Sobreposição de Capa', value: 'com sobreposição de capa' } ] },
          { label: 'Vestido de Gala', value: 'vestido de gala', styles: [] },
          { label: 'Vestido de Coquetel', value: 'vestido de coquetel', styles: [] },
        ],
        fabrics: [ { label: 'Lã', value: 'lã' }, { label: 'Linho', value: 'linho' }, { label: 'Látex', value: 'látex' }, { label: 'Veludo', value: 'veludo' }, { label: 'Cetim', value: 'cetim' }, { label: 'Seda', value: 'seda' }, { label: 'Brocado', value: 'brocado' }, { label: 'Tweed', value: 'tweed' }, { label: 'Sharkskin', value: 'sharkskin' }, { label: 'Seersucker', value: 'seersucker' }, { label: 'Caxemira', value: 'caxemira' } ],
        colors: [ { label: 'Preto', value: 'preto' }, { label: 'Azul Marinho', value: 'azul marinho' }, { label: 'Cinza Chumbo', value: 'cinza chumbo' }, { label: 'Branco', value: 'branco' }, { label: 'Azul Royal', value: 'azul royal' }, { label: 'Vinho (Burgundy)', value: 'vinho' }, { label: 'Verde Esmeralda', value: 'verde esmeralda' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Risca de Giz', value: 'risca de giz' }, { label: 'Quadriculado', value: 'quadriculado' }, { label: 'Textura Sutil', value: 'textura sutil' }, { label: 'Xadrez Príncipe de Gales', value: 'xadrez príncipe de gales' } ]
      }},
      swimwear: { label: 'Roupas de Banho', options: {
        types: [
          { label: 'Biquíni', value: 'biquíni', styles: [ { label: 'Cortininha', value: 'cortininha' }, { label: 'Tomara que Caia', value: 'tomara que caia' }, { label: 'Calcinha de Cintura Alta', value: 'calcinha de cintura alta' }, { label: 'Calcinha de Lacinho', value: 'calcinha de lacinho' }, { label: 'Top com Aro', value: 'top com aro' }, { label: 'Calcinha Fio Dental', value: 'calcinha fio dental' }, { label: 'Biquíni Esportivo', value: 'biquíni esportivo' } ] },
          { label: 'Maiô', value: 'maiô', styles: [ { label: 'Asa Delta', value: 'asa delta' }, { label: 'Costas Baixas', value: 'costas baixas' }, { label: 'Com Recortes', value: 'com recortes' }, { label: 'Monokini', value: 'monokini' }, { label: 'Decote Profundo', value: 'decote profundo' }, { label: 'Maiô com Babados', value: 'maiô com babados' } ] },
          { label: 'Tanquíni', value: 'tanquíni', styles: [] },
          { label: 'Sunga', value: 'sunga', styles: [] },
          { label: 'Shorts de Praia', value: 'shorts de praia', styles: [] },
          { label: 'Camisa de Lycra (Rash Guard)', value: 'camisa de lycra', styles: [] },
          { label: 'Saída de Praia', value: 'saída de praia', styles: [] },
          { label: 'Canga', value: 'canga', styles: [] },
          { label: 'Burkini', value: 'burkini', styles: [] },
        ],
        fabrics: [ { label: 'Nylon', value: 'nylon' }, { label: 'Spandex', value: 'spandex' }, { label: 'Poliéster', value: 'poliéster' }, { label: 'Látex', value: 'látex' }, { label: 'Neoprene', value: 'neoprene' }, { label: 'Lycra', value: 'lycra' }, { label: 'Crochê', value: 'crochê' } ],
        colors: [ { label: 'Preto', value: 'preto' }, { label: 'Branco', value: 'branco' }, { label: 'Azul Royal', value: 'azul royal' }, { label: 'Rosa Shocking', value: 'rosa shocking' }, { label: 'Turquesa', value: 'turquesa' }, { label: 'Coral', value: 'coral' }, { label: 'Amarelo', value: 'amarelo' }, { label: 'Laranja', value: 'laranja' }, { label: 'Roxo', value: 'roxo' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Estampa Tropical', value: 'estampa tropical' }, { label: 'Listras Náuticas', value: 'listras náuticas' }, { label: 'Estampa de Animal', value: 'estampa de animal' }, { label: 'Poá', value: 'poá' }, { label: 'Geométrico', value: 'geométrico' }, { label: 'Tie-Dye', value: 'tie-dye' } ]
      }},
      activewear: { label: 'Roupa Esportiva', options: {
        types: [
          { label: 'Top Esportivo', value: 'top esportivo', styles: [ { label: 'Costas Nadador', value: 'costas nadador' }, { label: 'Costas Cruzadas', value: 'costas cruzadas' } ] },
          { label: 'Regata Esportiva', value: 'regata esportiva', styles: [ { label: 'Solta', value: 'solta' }, { label: 'Justa', value: 'justa' } ] },
          { label: 'Camiseta Esportiva', value: 'camiseta esportiva', styles: [ { label: 'Manga Curta', value: 'manga curta' }, { label: 'Manga Longa', value: 'manga longa' } ] },
          { label: 'Legging Esportiva', value: 'legging esportiva', styles: [ { label: 'Cintura Alta', value: 'cintura alta' }, { label: 'Com Bolsos', value: 'com bolsos' }, { label: 'Painéis de Tela', value: 'com painéis de tela' }, { label: 'Comprimento Capri', value: 'comprimento capri' }, { label: 'Sem Costura', value: 'sem costura' } ] },
          { label: 'Shorts Atlético', value: 'shorts atlético', styles: [ { label: 'Shorts de Corrida', value: 'shorts de corrida' }, { label: 'Shorts de Ciclismo', value: 'shorts de ciclismo' }, { label: 'Shorts de Yoga', value: 'shorts de yoga' } ] },
          { label: 'Calça Jogger', value: 'calça jogger', styles: [ { label: 'Corte Afunilado', value: 'corte afunilado' }, { label: 'Punhos no Tornozelo', value: 'com punhos no tornozelo' } ] },
          { label: 'Agasalho', value: 'agasalho', styles: [ { label: 'Conjunto Combinando', value: 'conjunto combinando' }, { label: 'Estilo Retrô', value: 'estilo retrô' } ] },
          { label: 'Calça de Yoga', value: 'calça de yoga', styles: [] },
          { label: 'Bermuda de Ciclismo', value: 'bermuda de ciclismo', styles: [] },
          { label: 'Jaqueta Corta-Vento', value: 'jaqueta corta-vento', styles: [] },
        ],
        fabrics: [ { label: 'Mistura de Spandex', value: 'mistura de spandex' }, { label: 'Látex', value: 'látex' }, { label: 'Tecido de Secagem Rápida', value: 'tecido de secagem rápida' }, { label: 'Fleece', value: 'fleece' }, { label: 'Nylon', value: 'nylon' }, { label: 'Poliéster', value: 'poliéster' }, { label: 'Lã Merino', value: 'lã merino' }, { label: 'Bambu', value: 'bambu' } ],
        colors: [ { label: 'Preto', value: 'preto' }, { label: 'Cinza', value: 'cinza' }, { label: 'Verde Neon', value: 'verde neon' }, { label: 'Rosa Shocking', value: 'rosa shocking' }, { label: 'Azul Royal', value: 'azul royal' }, { label: 'Roxo', value: 'roxo' }, { label: 'Laranja', value: 'laranja' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Color Block', value: 'color block' }, { label: 'Estampa Abstrata', value: 'estampa abstrata' }, { label: 'Camuflado', value: 'camuflado' }, { label: 'Estampa de Animal', value: 'estampa de animal' } ]
      }},
      sleepwear: { label: 'Pijamas / Loungewear', options: {
        types: [
          { label: 'Conjunto de Pijama', value: 'conjunto de pijama', styles: [ { label: 'Conjunto com Shorts', value: 'conjunto com shorts' }, { label: 'Conjunto com Calça', value: 'conjunto com calça' }, { label: 'Com Blusa de Botões', value: 'com blusa de botões' }, { label: 'Conjunto Térmico', value: 'conjunto térmico' }, { label: 'Conjunto de Flanela', value: 'conjunto de flanela' } ] },
          { label: 'Camisola', value: 'camisola', styles: [ { label: 'Curta (Chemise)', value: 'curta (chemise)' }, { label: 'Longa', value: 'longa' }, { label: 'Com Detalhes em Renda', value: 'com detalhes em renda' } ] },
          { label: 'Robe', value: 'robe', styles: [ { label: 'Plush', value: 'plush' }, { label: 'Seda/Cetim', value: 'seda/cetim' }, { label: 'Malha Waffle', value: 'malha waffle' } ] },
          { label: 'Macacão (Onesie)', value: 'macacão (onesie)', styles: [ { label: 'Tema de Animal', value: 'tema de animal' }, { label: 'Com Pés', value: 'com pés' } ] },
          { label: 'Conjunto Loungewear', value: 'conjunto loungewear', styles: [] },
          { label: 'Chemise', value: 'chemise', styles: [] },
          { label: 'Pantufas', value: 'pantufas', styles: [] },
        ],
        fabrics: [ { label: 'Algodão', value: 'algodão' }, { label: 'Flanela', value: 'flanela' }, { label: 'Seda', value: 'seda' }, { label: 'Cetim', value: 'cetim' }, { label: 'Látex', value: 'látex' }, { label: 'Fleece de Pelúcia', value: 'fleece de pelúcia' }, { label: 'Jersey', value: 'jersey' }, { label: 'Modal', value: 'modal' }, { label: 'Veludo', value: 'veludo' }, { label: 'Caxemira', value: 'caxemira' } ],
        colors: [ { label: 'Azul Pastel', value: 'azul pastel' }, { label: 'Rosa Claro', value: 'rosa claro' }, { label: 'Branco', value: 'branco' }, { label: 'Cinza', value: 'cinza' }, { label: 'Lavanda', value: 'lavanda' }, { label: 'Verde Menta', value: 'verde menta' }, { label: 'Azul Marinho', value: 'azul marinho' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Xadrez', value: 'xadrez' }, { label: 'Listras', value: 'listrado' }, { label: 'Floral', value: 'floral' }, { label: 'Poá', value: 'poá' }, { label: 'Estampa de Animal', value: 'estampa de animal' } ]
      }},
      underwear: { label: 'Roupa Íntima / Lingerie', options: {
        types: [
          { label: 'Sutiã', value: 'sutiã', styles: [ { label: 'Push-Up', value: 'push-up' }, { label: 'Bralette', value: 'bralette' }, { label: 'Com Aro', value: 'com aro' }, { label: 'Tomara que Caia', value: 'tomara que caia' }, { label: 'Balconette', value: 'balconette' }, { label: 'Esportivo', value: 'esportivo' }, { label: 'De Renda', value: 'de renda' } ] },
          { label: 'Calcinha', value: 'calcinha', styles: [ { label: 'Caleçon', value: 'caleçon' }, { label: 'Fio Dental', value: 'fio dental' }, { label: 'Boyshorts', value: 'boyshorts' }, { label: 'Cintura Alta', value: 'cintura alta' }, { label: 'Biquíni', value: 'biquíni' }, { label: 'De Renda', value: 'de renda' } ] },
          { label: 'Conjunto de Lingerie', value: 'conjunto de lingerie', styles: [ { label: 'Sutiã e Calcinha Combinando', value: 'conjunto de sutiã e calcinha combinando' }, { label: 'Com Cinta-Liga', value: 'com cinta-liga' } ] },
          { label: 'Body', value: 'body', styles: [ { label: 'De Renda', value: 'de renda' }, { label: 'Transparente', value: 'transparente' } ] },
          { label: 'Corselet / Bustier', value: 'corselet ou bustier', styles: [ { label: 'Overbust', value: 'overbust' }, { label: 'Underbust', value: 'underbust' } ] },
          { label: 'Cueca Boxer', value: 'cueca boxer', styles: [] },
          { label: 'Cueca Samba-Canção', value: 'cueca samba-canção', styles: [] },
          { label: 'Cinta-Liga', value: 'cinta-liga', styles: [] },
          { label: 'Meias 7/8', value: 'meias 7/8', styles: [] },
          { label: 'Chemise', value: 'chemise', styles: [] },
        ],
        fabrics: [ { label: 'Renda', value: 'renda' }, { label: 'Látex', value: 'látex' }, { label: 'Algodão', value: 'algodão' }, { label: 'Seda', value: 'seda' }, { label: 'Cetim', value: 'cetim' }, { label: 'Tela', value: 'tela' }, { label: 'Veludo', value: 'veludo' }, { label: 'Microfibra', value: 'microfibra' }, { label: 'Modal', value: 'modal' }, { label: 'Bambu', value: 'bambu' }, { label: 'Spandex', value: 'spandex' } ],
        colors: [ { label: 'Preto', value: 'preto' }, { label: 'Branco', value: 'branco' }, { label: 'Vermelho', value: 'vermelho' }, { label: 'Cor da Pele', value: 'cor da pele' }, { label: 'Vinho (Burgundy)', value: 'vinho' }, { label: 'Azul Bebê', value: 'azul bebê' }, { label: 'Rosa Shocking', value: 'rosa shocking' }, { label: 'Verde Esmeralda', value: 'verde esmeralda' } ],
        patterns: [ { label: 'Cor Sólida', value: 'cor sólida' }, { label: 'Estampa Floral', value: 'estampa floral' }, { label: 'Padrão de Renda', value: 'padrão de renda' }, { label: 'Poá', value: 'poá' }, { label: 'Estampa de Animal', value: 'estampa de animal' } ]
      }},
      fantasy: { label: 'Fantasia e Trajes', options: {
        types: [
          { label: 'Trapos Esfarrapados', value: 'trapos esfarrapados', styles: [ { label: 'Manchados e Sujos', value: 'manchados e sujos' }, { label: 'Muito Rasgados', value: 'muito rasgados' } ] },
          { label: 'Túnica Rasgada', value: 'túnica rasgada', styles: [ { label: 'Bordas Desfiadas', value: 'com bordas desfiadas' }, { label: 'Salpicada de Lama', value: 'salpicada de lama' } ] },
          { label: 'Roupas de Prisioneiro Gastas', value: 'roupas de prisioneiro gastas', styles: [ { label: 'Uniforme Listrado', value: 'uniforme listrado' }, { label: 'Saco de Estopa', value: 'saco de estopa' } ] },
          { label: 'Mantos de Necromante', value: 'mantos de necromante', styles: [ { label: 'Com Capuz e Motivos de Caveira', value: 'com capuz e motivos de caveira' }, { label: 'Com Sombras Etéreas e Flutuantes', value: 'com sombras etéreas e flutuantes' } ] },
          { label: 'Vestido de Feiticeira Sombria', value: 'vestido de feiticeira sombria', styles: [ { label: 'Gola Alta e Ombros com Penas', value: 'com gola alta e ombros com penas' }, { label: 'Bordado Sombrio Intrincado', value: 'com bordado sombrio intrincado' } ] },
          { label: 'Armadura de Couro de Ladino', value: 'armadura de couro de ladino', styles: [ { label: 'Com Capuz', value: 'com capuz' }, { label: 'Com Várias Adagas', value: 'com várias adagas' } ] },
          { label: 'Traje de Médico da Peste', value: 'traje de médico da peste', styles: [ { label: 'Máscara Clássica de Bico', value: 'com a máscara clássica de bico' }, { label: 'Casaco Longo de Couro', value: 'com um casaco longo de couro' } ] },
          { label: 'Fantasia de Fada', value: 'fantasia de fada', styles: [ { label: 'Asas de Gaze', value: 'com asas de gaze' }, { label: 'Coroa de Flores', value: 'com uma coroa de flores' } ] },
          { label: 'Fantasia de Vampiro', value: 'fantasia de vampiro', styles: [ { label: 'Capa de Gola Alta', value: 'com uma capa de gola alta' }, { label: 'Estilo Vitoriano', value: 'estilo vitoriano' } ] },
          { label: 'Fantasia de Pirata', value: 'fantasia de pirata', styles: [ { label: 'Chapéu de Três Pontas', value: 'com um chapéu de três pontas' }, { label: 'Tapa-Olho', value: 'com um tapa-olho' } ] },
          { label: 'Mantos de Bruxa/Mago', value: 'mantos de bruxa ou mago', styles: [ { label: 'Chapéu Pontudo', value: 'com um chapéu pontudo' }, { label: 'Padrão Estrelado', value: 'com um padrão estrelado' } ] },
          { label: 'Armadura de Cavaleiro', value: 'armadura de cavaleiro', styles: [ { label: 'Armadura de Placas Completa', value: 'armadura de placas completa' }, { label: 'Cota de Malha', value: 'cota de malha' } ] },
          { label: 'Túnica de Elfo', value: 'túnica de elfo', styles: [ { label: 'Bordado Élfico', value: 'com bordado élfico' }, { label: 'Com Capuz', value: 'com capuz' } ] },
          { label: 'Cauda de Sereia', value: 'cauda de sereia', styles: [ { label: 'Escamas Iridescentes', value: 'com escamas iridescentes' }, { label: 'Barbatanas Flutuantes', value: 'com barbatanas flutuantes' } ] },
          { label: 'Superman / Supergirl', value: 'traje do Superman ou Supergirl', styles: [ { label: 'Clássico dos Quadrinhos', value: 'estilo clássico dos quadrinhos' }, { label: 'Moderno do Cinema', value: 'estilo moderno do cinema' } ] },
          { label: 'Batman / Batgirl', value: 'traje do Batman ou Batgirl', styles: [ { label: 'Clássico (Adam West)', value: 'estilo clássico dos anos 1960 (Adam West)' }, { label: 'Moderno com Armadura', value: 'estilo moderno com armadura do cinema' } ] },
          { label: 'Mulher-Maravilha', value: 'traje da Mulher-Maravilha', styles: [ { label: 'Clássico dos Quadrinhos', value: 'estilo clássico dos quadrinhos' }, { label: 'Armadura Moderna do Cinema', value: 'estilo armadura moderna do cinema' } ] },
          { label: 'Homem-Aranha / Spider-Gwen', value: 'traje do Homem-Aranha ou Spider-Gwen', styles: [ { label: 'Clássico dos Quadrinhos', value: 'estilo clássico dos quadrinhos' }, { label: 'Filme Live-Action', value: 'estilo filme live-action' } ] },
          { label: 'Homem de Ferro / Resgate', value: 'armadura do Homem de Ferro ou Resgate', styles: [ { label: 'Clássica dos Quadrinhos', value: 'armadura clássica dos quadrinhos' }, { label: 'Moderna do MCU', value: 'armadura moderna do MCU' } ] },
          { label: 'Capitão América', value: 'traje do Capitão América', styles: [ { label: 'Clássico da Segunda Guerra', value: 'estilo clássico da Segunda Guerra Mundial' }, { label: 'Moderno do MCU', value: 'estilo moderno do MCU' } ] },
          { label: 'Thor', value: 'traje do Thor', styles: [ { label: 'Clássico dos Quadrinhos', value: 'estilo clássico dos quadrinhos' }, { label: 'Armadura Moderna do MCU', value: 'armadura moderna do MCU' } ] },
          { label: 'Viúva Negra', value: 'traje da Viúva Negra', styles: [ { label: 'Macacão Clássico', value: 'estilo macacão preto clássico' }, { label: 'Tático Moderno', value: 'estilo tático moderno do MCU' } ] },
          { label: 'Feiticeira Escarlate', value: 'traje da Feiticeira Escarlate', styles: [ { label: 'Clássico dos Quadrinhos', value: 'estilo clássico com diadema e capa dos quadrinhos' }, { label: 'Moderno do MCU', value: 'estilo moderno do MCU' } ] },
          { label: 'Capitã Marvel', value: 'traje da Capitã Marvel', styles: [ { label: 'Clássico Vermelho e Azul', value: 'estilo clássico vermelho e azul do MCU' } ] },
          { label: 'Flash', value: 'traje do Flash', styles: [ { label: 'Clássico dos Quadrinhos', value: 'estilo clássico dos quadrinhos' }, { label: 'Moderno com Armadura', value: 'estilo moderno com armadura da TV/cinema' } ] },
          { label: 'Lanterna Verde', value: 'traje do Lanterna Verde', styles: [ { label: 'Clássico Hal Jordan', value: 'estilo clássico Hal Jordan' }, { label: 'Moderno John Stewart', value: 'estilo moderno John Stewart' } ] },
          { label: 'Mulher-Gato', value: 'traje da Mulher-Gato', styles: [ { label: 'Clássico anos 90 (Michelle Pfeiffer)', value: 'estilo clássico anos 90 (Michelle Pfeiffer)' }, { label: 'Tático Moderno (Anne Hathaway)', value: 'estilo tático moderno (Anne Hathaway)' } ] },
          { label: 'Arlequina', value: 'traje da Arlequina', styles: [ { label: 'Bobo da Corte Clássico', value: 'estilo bobo da corte clássico' }, { label: 'Moderno do Cinema (Esquadrão Suicida)', value: 'estilo moderno do cinema (Esquadrão Suicida)' } ] },
          { label: 'Coringa', value: 'traje do Coringa', styles: [ { label: 'Terno Roxo Clássico', value: 'estilo terno roxo clássico' }, { label: 'Moderno (Heath Ledger)', value: 'estilo moderno (Heath Ledger)' } ] },
          { label: 'Loki', value: 'traje do Loki', styles: [ { label: 'Armadura Asgardiana Clássica', value: 'estilo armadura asgardiana clássica' }, { label: 'Agente da TVA Moderno', value: 'estilo agente da TVA moderno' } ] },
          { label: 'Malévola', value: 'traje da Malévola', styles: [ { label: 'Clássico da Animação', value: 'estilo clássico da animação Disney' }, { label: 'Moderno do Live-Action', value: 'estilo moderno do filme live-action' } ] },
          { label: 'Darth Vader', value: 'traje do Darth Vader', styles: [] }
        ],
        fabrics: [{ label: 'Linho Rústico', value: 'linho rústico' }, { label: 'Estopa', value: 'estopa' }, { label: 'Látex', value: 'látex' }, { label: 'Cota de Malha', value: 'cota de malha' }, { label: 'Couro Gasto', value: 'couro gasto' }, { label: 'Seda Etérea', value: 'seda etérea' }, { label: 'Veludo Escuro', value: 'veludo escuro' }], 
        colors: [{ label: 'Marrom Desbotado', value: 'marrom desbotado' }, { label: 'Cinza Desbotado', value: 'cinza desbotado' }], 
        patterns: [{ label: 'Esfarrapado', value: 'esfarrapado' }, { label: 'Manchado', value: 'manchado' }]
      }},
      traditional: { label: 'Trajes Culturais e Tradicionais', options: {
        types: [
          { label: 'Inspirado nas Nações das Planícies (EUA)', value: 'Inspirado nas Nações das Planícies (EUA)' },
          { label: 'Inspirado nos Kayapó (Brasil)', value: 'Inspirado nos Kayapó (Brasil)' },
          { label: 'Inspirado em Quimono Japonês', value: 'Inspirado em Quimono Japonês' },
          { label: 'Inspirado em Sari Indiano', value: 'Inspirado em Sari Indiano' },
          { label: 'Inspirado em Traje Escocês (Highland Dress)', value: 'Inspirado em Traje Escocês (Highland Dress)' },
          { label: 'Inspirado em Maasai (Quênia/Tanzânia)', value: 'Inspirado em Maasai (Quênia/Tanzânia)' },
          { label: 'Inspirado em Hanbok Sul-Coreano', value: 'Inspirado em Hanbok Sul-Coreano' },
          { label: 'Inspirado em Áo Dài Vietnamita', value: 'Inspirado em Áo Dài Vietnamita' },
          { label: 'Inspirado em Traje Andino (Peru/Bolívia)', value: 'Inspirado em Traje Andino (Peru/Bolívia)' },
        ],
        headwear: [
            { label: 'Cocar de Penas (War Bonnet)', value: 'um grande cocar de penas (war bonnet)' },
            { label: 'Grande Cocar Circular', value: 'um grande cocar de penas circular e vibrante' },
            { label: 'Ornamentos de cabelo Kanzashi (Japão)', value: 'delicados ornamentos de cabelo Kanzashi' },
            { label: 'Boina Glengarry (Escócia)', value: 'uma boina Glengarry' },
            { label: 'Chapéu cônico Nón Lá (Vietnã)', value: 'um chapéu cônico tradicional Nón Lá' },
            { label: 'Chapéu Montera Andino (Peru/Bolívia)', value: 'um chapéu Montera andino' },
        ],
        tops: [
            { label: 'Túnica de Couro', value: 'uma túnica de couro com franjas e miçangas' },
            { label: 'Top de Couro', value: 'um top de couro com miçangas' },
            { label: 'Top de Penas', value: 'um top feito de penas' },
            { label: 'Pintura Corporal (Torso)', value: 'pintura corporal geométrica preta e intrincada cobrindo o torso' },
            { label: 'Quimono de seda com faixa Obi (Japão)', value: 'um quimono de seda comprido com mangas fluidas, amarrado com uma faixa larga de obi' },
            { label: 'Sari com blusa Choli (Índia)', value: 'um Sari tradicional com uma blusa Choli combinando' },
            { label: 'Jaqueta Prince Charlie (Escócia)', value: 'uma jaqueta formal Prince Charlie' },
            { label: 'Manta Shuka drapeada (Maasai)', value: 'uma manta Shuka vermelha drapeada sobre os ombros' },
            { label: 'Jaqueta Jeogori de Hanbok (Cor. do Sul)', value: 'uma jaqueta superior tradicional de Hanbok (jeogori)' },
            { label: 'Túnica de seda Áo Dài (Vietnã)', value: 'uma túnica de seda Áo Dài longa e justa com fendas laterais altas' },
            { label: 'Jaqueta bordada Chompa (Andina)', value: 'uma jaqueta colorida e bordada (chompa) e um xale lliklla tecido' },
        ],
        bottoms: [
            { label: 'Leggings de Couro', value: 'leggings de couro com miçangas' },
            { label: 'Saia de Penas', value: 'uma saia feita de penas' },
            { label: 'Tanga de Algodão', value: 'uma tanga simples de algodão' },
            { label: 'Kilt de tartan com sporran (Escócia)', value: 'um kilt de tartan com um sporran' },
            { label: 'Saia Chima de Hanbok (Cor. do Sul)', value: 'uma saia chima de Hanbok cheia e de cintura alta' },
            { label: 'Calças de seda soltas (Vietnã)', value: 'calças de seda soltas' },
            { label: 'Saia larga e em camadas Pollera (Andina)', value: 'uma saia pollera larga e em camadas' },
        ],
        featherColors: [
          { label: 'Vermelho', value: 'vermelho' }, { label: 'Amarelo', value: 'amarelo' }, { label: 'Azul', value: 'azul' }, { label: 'Verde', value: 'verde' }, { label: 'Branco', value: 'branco' }, { label: 'Preto', value: 'preto' }, { label: 'Águia (Marrom/Branco)', value: 'marrom e branco como de águia'}
        ],
        bodyPaintColors: [
          { label: 'Preto (de Genipapo)', value: 'preto (de genipapo)' }, { label: 'Vermelho (de Urucum)', value: 'vermelho (de urucum)' }, { label: 'Branco (de Argila)', value: 'branco (de argila)' }, { label: 'Amarelo (de Argila)', value: 'amarelo (de argila)' }
        ],
      }},
    },
    footwearOptions: {
      types: [
        { 
          label: 'Tênis', value: 'tênis',
          materials: [ { label: 'Lona', value: 'lona' }, { label: 'Couro', value: 'couro' }, { label: 'Camurça', value: 'camurça' }, { label: 'Tricô', value: 'tricô' }, { label: 'Tela', value: 'tela' }, { label: 'Sintético', value: 'sintético' } ],
          colors: [ { label: 'Branco', value: 'branco' }, { label: 'Preto', value: 'preto' }, { label: 'Cinza', value: 'cinza' }, { label: 'Vermelho', value: 'vermelho' }, { label: 'Azul', value: 'azul' } ]
        },
        {
          label: 'Salto Alto', value: 'salto alto',
          materials: [ { label: 'Couro Envernizado', value: 'couro envernizado' }, { label: 'Camurça', value: 'camurça' }, { label: 'Cetim', value: 'cetim' }, { label: 'Couro', value: 'couro' }, { label: 'Veludo', value: 'veludo' }, { label: 'Glitter', value: 'glitter' }, { label: 'PVC', value: 'pvc' }, { label: 'Pele de Cobra', value: 'pele de cobra' } ],
          colors: [ { label: 'Preto', value: 'preto' }, { label: 'Nude', value: 'nude' }, { label: 'Vermelho', value: 'vermelho' }, { label: 'Prateado', value: 'prateado' }, { label: 'Dourado', value: 'dourado' } ]
        },
        { 
          label: 'Sapatilhas', value: 'sapatilhas',
          materials: [ { label: 'Couro', value: 'couro' }, { label: 'Camurça', value: 'camurça' }, { label: 'Lona', value: 'lona' }, { label: 'Estilo Bailarina', value: 'estilo bailarina' }, { label: 'Couro Envernizado', value: 'couro envernizado' }, { label: 'Tecido', value: 'tecido' } ],
          colors: [ { label: 'Preto', value: 'preto' }, { label: 'Bege', value: 'bege' }, { label: 'Azul Marinho', value: 'azul marinho' }, { label: 'Vermelho', value: 'vermelho' } ]
        },
        { 
          label: 'Botas', value: 'botas',
          materials: [ { label: 'Couro', value: 'couro' }, { label: 'Camurça', value: 'camurça' }, { label: 'Borracha', value: 'borracha' }, { label: 'Estilo Coturno', value: 'estilo coturno' }, { label: 'Estilo Trilha', value: 'estilo trilha' }, { label: 'Couro Envernizado', value: 'couro envernizado' }, { label: 'Veludo', value: 'veludo' }, { label: 'Forrada com Pele Sintética', value: 'forrada com pele sintética' } ],
          colors: [ { label: 'Preto', value: 'preto' }, { label: 'Marrom', value: 'marrom' }, { label: 'Caramelo', value: 'caramelo' }, { label: 'Vinho (Burgundy)', value: 'vinho' } ]
        },
        { 
          label: 'Sandálias', value: 'sandálias',
          materials: [ { label: 'Couro', value: 'couro' }, { label: 'De Tiras', value: 'de tiras' }, { label: 'Anabela', value: 'anabela' }, { label: 'Rasteirinha', value: 'rasteirinha' }, { label: 'Gladiadora', value: 'gladiadora' }, { label: 'Camurça', value: 'camurça' }, { label: 'Corda', value: 'corda' }, { label: 'Borracha', value: 'borracha' } ],
          colors: [ { label: 'Marrom', value: 'marrom' }, { label: 'Preto', value: 'preto' }, { label: 'Branco', value: 'branco' }, { label: 'Dourado', value: 'dourado' } ]
        },
        { 
          label: 'Sapatos Oxford', value: 'sapatos oxford',
          materials: [ { label: 'Couro', value: 'couro' }, { label: 'Camurça', value: 'camurça' }, { label: 'Couro Envernizado', value: 'couro envernizado' }, { label: 'Lona', value: 'lona' }, { label: 'Com Detalhes Brogue', value: 'com detalhes brogue' } ],
          colors: [ { label: 'Preto', value: 'preto' }, { label: 'Marrom', value: 'marrom' }, { label: 'Bicolor', value: 'bicolor' } ]
        },
        { 
          label: 'Mocassins', value: 'mocassins',
          materials: [ { label: 'Couro', value: 'couro' }, { label: 'Camurça', value: 'camurça' }, { label: 'Veludo', value: 'veludo' }, { label: 'Couro Envernizado', value: 'couro envernizado' }, { label: 'Com Tassel', value: 'com tassel' } ],
          colors: [ { label: 'Preto', value: 'preto' }, { label: 'Marrom', value: 'marrom' }, { label: 'Azul Marinho', value: 'azul marinho' } ]
        },
        { 
          label: 'Mules', value: 'mules',
          materials: [ { label: 'Couro', value: 'couro' }, { label: 'Camurça', value: 'camurça' }, { label: 'Tramado', value: 'tramado' }, { label: 'Veludo', value: 'veludo' }, { label: 'Pele Sintética', value: 'pele sintética' } ],
          colors: [ { label: 'Preto', value: 'preto' }, { label: 'Branco', value: 'branco' }, { label: 'Caramelo', value: 'caramelo' } ]
        },
        { 
          label: 'Espadrilles', value: 'espadrilles',
          materials: [ { label: 'Lona', value: 'lona' }, { label: 'Anabela', value: 'anabela' }, { label: 'Rasteira', value: 'rasteira' }, { label: 'Camurça', value: 'camurça' }, { label: 'Couro', value: 'couro' } ],
          colors: [ { label: 'Bege', value: 'bege' }, { label: 'Azul Marinho', value: 'azul marinho' }, { label: 'Vermelho', value: 'vermelho' } ]
        },
        { 
          label: 'Sapatos Plataforma', value: 'sapatos plataforma',
          materials: [ { label: 'Couro', value: 'couro' }, { label: 'Camurça', value: 'camurça' }, { label: 'Veludo', value: 'veludo' }, { label: 'Couro Envernizado', value: 'couro envernizado' }, { label: 'Lona', value: 'lona' }, { label: 'Glitter', value: 'glitter' } ],
          colors: [ { label: 'Preto', value: 'preto' }, { label: 'Branco', value: 'branco' }, { label: 'Rosa', value: 'rosa' } ]
        },
        { 
            label: 'Botas Plataforma Góticas', value: 'botas plataforma góticas',
            materials: [ { label: 'Couro Preto', value: 'couro preto' }, { label: 'Couro Envernizado', value: 'couro envernizado' }, { label: 'Com Fivelas e Tiras', value: 'com fivelas e tiras' }, { label: 'Veludo', value: 'veludo' }, { label: 'Preto Fosco', value: 'preto fosco' } ],
            colors: [ { label: 'Preto', value: 'preto' }, { label: 'Roxo Escuro', value: 'roxo escuro' }, { label: 'Vermelho Sangue', value: 'vermelho sangue' } ]
        }
      ]
    },
    accessoriesOptions: [
      { id: 'head', label: 'Acessórios de Cabeça', options: [
        { id: 'type', label: 'Tipo', options: [ { label: 'Chapéu', value: 'chapéu' }, { label: 'Gorro', value: 'gorro' }, { label: 'Tiara', value: 'tiara' }, { label: 'Coroa', value: 'coroa' }, { label: 'Diadema', value: 'diadema' }, { label: 'Fascinator', value: 'fascinator' }, { label: 'Boina', value: 'boina' }, { label: 'Viseira', value: 'viseira' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Feltro', value: 'feltro' }, { label: 'Tricô', value: 'tricô' }, { label: 'Metal', value: 'metal' }, { label: 'Palha', value: 'palha' }, { label: 'Couro', value: 'couro' }, { label: 'Seda', value: 'seda' }, { label: 'Veludo', value: 'veludo' } ] }
      ]},
      { id: 'neck', label: 'Acessórios de Pescoço', options: [
        { id: 'type', label: 'Tipo', options: [ { label: 'Colar', value: 'colar' }, { label: 'Gargantilha (Choker)', value: 'gargantilha' }, { label: 'Cachecol', value: 'cachecol' }, { label: 'Gravata', value: 'gravata' }, { label: 'Pingente', value: 'pingente' }, { label: 'Gravata Borboleta', value: 'gravata borboleta' }, { label: 'Bandana', value: 'bandana' }, { label: 'Gargantilha de Renda', value: 'gargantilha de renda' }, { label: 'Gargantilha de Veludo com Camafeu', value: 'gargantilha de veludo com um camafeu' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Ouro', value: 'ouro' }, { label: 'Prata', value: 'prata' }, { label: 'Seda', value: 'seda' }, { label: 'Pérolas', value: 'pérolas' }, { label: 'Couro', value: 'couro' }, { label: 'Veludo', value: 'veludo' }, { label: 'Pedras Preciosas', value: 'pedras preciosas' }, { label: 'Miçangas', value: 'miçangas' } ] }
      ]},
      { id: 'ears', label: 'Brincos', options: [
        { id: 'type', label: 'Tipo', options: [ { label: 'Pequenos (Studs)', value: 'pequenos' }, { label: 'Argolas', value: 'argolas' }, { label: 'Pendentes', value: 'pendentes' }, { label: 'Ear Cuffs', value: 'ear cuffs' }, { label: 'Candelabro', value: 'candelabro' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Diamantes', value: 'diamante' }, { label: 'Pérolas', value: 'pérola' }, { label: 'Ouro', value: 'ouro' }, { label: 'Prata', value: 'prata' }, { label: 'Platina', value: 'platina' }, { label: 'Pedras Preciosas', value: 'pedras preciosas' }, { label: 'Esmalte', value: 'esmalte' } ] }
      ]},
      { id: 'wrists', label: 'Acessórios de Pulso', options: [
        { id: 'type', label: 'Tipo', options: [ { label: 'Pulseira', value: 'pulseira' }, { label: 'Bracelete', value: 'bracelete' }, { label: 'Relógio', value: 'relógio' }, { label: 'Algemas', value: 'algemas' }, { label: 'Bangle', value: 'bangle' }, { label: 'Pulseira de Berloques', value: 'pulseira de berloques' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Couro', value: 'couro' }, { label: 'Prata', value: 'prata' }, { label: 'Ouro', value: 'ouro' }, { label: 'Ferro Enferrujado', value: 'ferro enferrujado' }, { label: 'Miçangas', value: 'miçangas' }, { label: 'Corda', value: 'corda' }, { label: 'Aço Inoxidável', value: 'aço inoxidável' }, { label: 'Pedras Preciosas', value: 'pedras preciosas' } ] }
      ]},
       { id: 'hands', label: 'Luvas', options: [
        { id: 'type', label: 'Tipo', options: [ { label: 'Luvas', value: 'luvas' }, { label: 'Luvas sem Dedos', value: 'luvas sem dedos' }, { label: 'Luvas de Ópera', value: 'luvas de ópera' }, { label: 'Luvas de Renda', value: 'luvas de renda' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Couro', value: 'couro' }, { label: 'Renda', value: 'renda' }, { label: 'Cetim', value: 'cetim' }, { label: 'Veludo', value: 'veludo' }, { label: 'Lã de Tricô', value: 'lã de tricô' }, { label: 'Tule Transparente', value: 'tule transparente' }, { label: 'Arrastão', value: 'arrastão' } ] }
      ]},
       { id: 'fingers', label: 'Anéis', options: [
        { id: 'type', label: 'Tipo', options: [ { label: 'Anel Solitário', value: 'anel solitário' }, { label: 'Aliança', value: 'aliança' }, { label: 'Anel de Coquetel', value: 'anel de coquetel' }, { label: 'Anel de Sinete', value: 'anel de sinete' }, { label: 'Anéis de Empilhar', value: 'anéis de empilhar' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Ouro com Diamante', value: 'ouro com diamante' }, { label: 'Prata', value: 'prata' }, { label: 'Platina', value: 'platina' }, { label: 'Ouro Rosa', value: 'ouro rosa' }, { label: 'Titânio', value: 'titânio' }, { label: 'Com Pedras Preciosas', value: 'com pedras preciosas' } ] }
      ]},
       { id: 'waist', label: 'Cintos', options: [
        { id: 'type', label: 'Tipo', options: [ { label: 'Cinto Fino', value: 'cinto fino' }, { label: 'Cinto Largo', value: 'cinto largo' }, { label: 'Cinto de Corrente', value: 'cinto de corrente' }, { label: 'Cinto Obi', value: 'cinto obi' }, { label: 'Cinto de Quadril', value: 'cinto de quadril' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Couro', value: 'couro' }, { label: 'Metal', value: 'metal' }, { label: 'Tecido', value: 'tecido' }, { label: 'Camurça', value: 'camurça' }, { label: 'Corda Trançada', value: 'corda trançada' }, { label: 'PVC', value: 'pvc' } ] }
      ]},
       { id: 'other', label: 'Outros', options: [
        { id: 'type', label: 'Tipo', options: [ { label: 'Óculos', value: 'óculos' }, { label: 'Óculos de Sol', value: 'óculos de sol' }, { label: 'Bolsa', value: 'bolsa' }, { label: 'Mochila', value: 'mochila' }, { label: 'Clutch', value: 'clutch' }, { label: 'Bolsa Tote', value: 'bolsa tote' }, { label: 'Bolsa Transversal', value: 'bolsa transversal' } ] },
        { id: 'material', label: 'Material', options: [ { label: 'Couro', value: 'couro' }, { label: 'Lona', value: 'lona' }, { label: 'Acetato', value: 'acetato' }, { label: 'Nylon', value: 'nylon' }, { label: 'Metal', value: 'metal' }, { label: 'Camurça', value: 'camurça' }, { label: 'Pele Sintética', value: 'pele sintética' } ] }
      ]}
    ],
    poseOptions: [
      { label: 'Em Pé', value: 'em pé' },
      { label: 'Sentado(a)', value: 'sentado' },
      { label: 'Deitado(a)', value: 'deitado' },
      { label: 'Ajoelhado(a)', value: 'ajoelhado' },
      { label: 'Correndo', value: 'correndo' },
      { label: 'Pulando', value: 'pulando' },
      { label: 'Dançando', value: 'dançando' },
      { label: 'Andando', value: 'andando' },
    ],
    poseDetailsByPose: {
      'em pé': [
        { label: 'Mãos na Cintura', value: 'com as mãos na cintura' },
        { label: 'Braços Cruzados', value: 'com os braços cruzados' },
        { label: 'Encostado(a) na Parede', value: 'encostado em uma parede' },
        { label: 'Andar de Passarela', value: 'andando para a frente como se estivesse em uma passarela' },
        { label: 'Mãos para Trás', value: 'com as mãos para trás' },
        { label: 'Na Ponta dos Pés', value: 'na ponta dos pés' },
        { label: 'Braços Estendidos', value: 'com os braços estendidos' },
        { label: 'Acenando', value: 'acenando olá ou adeus' },
        { label: 'Dando de Ombros', value: 'dando de ombros' },
        { label: 'Vista de Costas', value: 'vista de costas' },
      ],
      'sentado': [
        { label: 'Pernas Cruzadas', value: 'sentado com as pernas cruzadas' },
        { label: 'Inclinado(a) para Frente', value: 'inclinado para a frente' },
        { label: 'Mão Apoiando a Cabeça', value: 'com uma mão apoiando a cabeça' },
        { label: 'Meditando', value: 'meditando pacificamente' },
        { label: 'Olhando para Baixo', value: 'olhando para baixo' },
        { label: 'Vista de Costas', value: 'vista de costas' },
      ],
      'deitado': [
        { label: 'De costas (Supino)', value: 'de costas, virado para cima (supino)' },
        { label: 'De bruços (Prono)', value: 'de bruços (prono)' },
        { label: 'De lado, virado(a) para a câmera', value: 'de lado, virado para a câmera' },
        { label: 'De costas para a câmera', value: 'de costas para a câmera' },
        { label: 'Olhando por cima do ombro', value: 'olhando por cima do ombro' },
        { label: 'Cabeça apoiada na mão', value: 'com a cabeça apoiada em uma mão' },
        { label: 'Reclinado(a) em almofadas', value: 'reclinado em almofadas' },
        { label: 'Vista de Costas', value: 'vista de costas' },
      ],
      'ajoelhado': [
        { label: 'Ereto(a)', value: 'ajoelhado ereto' },
        { label: 'Sentado(a) nos calcanhares', value: 'sentado nos calcanhares' },
        { label: 'Olhando para cima', value: 'olhando para cima' },
        { label: 'Como se Estivesse Pedindo em Casamento', value: 'como se estivesse pedindo em casamento' },
        { label: 'Como se Estivesse se Rendendo (Mãos para Cima)', value: 'como se estivesse se rendendo com as mãos para cima' },
        { label: 'Vista de Costas', value: 'vista de costas' },
      ],
      'correndo': [
        { label: 'Correndo Rápido', value: 'correndo rápido' },
        { label: 'Trotando', value: 'trotando casualmente' },
        { label: 'Vista de Costas', value: 'vista de costas' },
      ],
      'pulando': [
        { label: 'Pulando de alegria', value: 'pulando de alegria' },
        { label: 'Pose de ação no ar', value: 'em uma pose de ação no ar' },
        { label: 'Fazendo um Polichinelo', value: 'fazendo um polichinelo (star jump)' },
        { label: 'Vista de Costas', value: 'vista de costas' },
      ],
      'dançando': [
        { label: 'Pose de balé graciosa', value: 'em uma pose de balé graciosa' },
        { label: 'Movimento dinâmico de hip-hop', value: 'em um movimento dinâmico de hip-hop' },
        { label: 'Rodopiando', value: 'rodopiando' },
        { label: 'Dançando Salsa', value: 'dançando salsa' },
        { label: 'Pose Congelada de Breakdance', value: 'em uma pose congelada de breakdance' },
        { label: 'Dança de Salão', value: 'dançando dança de salão' },
        { label: 'Vista de Costas', value: 'vista de costas' },
      ],
       'andando': [
        { label: 'Andando com determinação', value: 'andando com determinação' },
        { label: 'Passeando casualmente', value: 'passeando casualmente' },
        { label: 'Olhando para trás', value: 'enquanto olha para trás' },
        { label: 'Vista de Costas', value: 'vista de costas' },
      ]
    },
    lightingOptions: [
      { label: 'Luz de Estúdio', value: 'iluminação de estúdio brilhante' },
      { label: 'Golden Hour', value: 'iluminação quente e dourada da golden hour' },
      { label: 'Dramática (Chiaroscuro)', value: 'iluminação dramática de alto contraste chiaroscuro' },
      { label: 'Brilho Neon', value: 'iluminado por letreiros de neon vibrantes' },
      { label: 'Suave e Difusa', value: 'luz natural suave e difusa' },
    ],
    backgroundOptions: [
      { label: 'Fundo de Estúdio (Cinza)', value: 'um fundo de estúdio cinza sólido' },
      { label: 'Rua de Cidade Agitada', value: 'uma rua de cidade agitada à noite' },
      { label: 'Beco Escuro', value: 'um beco urbano escuro e sombrio com iluminação dramática' },
      { label: 'Paisagem Natural Serena', value: 'uma paisagem natural serena com montanhas e um lago' },
      { label: 'Interior Luxuoso', value: 'o interior luxuoso e moderno de uma cobertura' },
      { label: 'Salão de Baile Opulento', value: 'um salão de baile opulento com lustres de cristal' },
      { label: 'Banheiro Moderno', value: 'um banheiro moderno e elegante com uma grande banheira' },
      { label: 'Banheira de Hidromassagem / Jacuzzi', value: 'uma luxuosa banheira de hidromassagem ao ar livre em um resort de esqui' },
      { label: 'Chuveiro com Chuva', value: 'dentro de um chuveiro de vidro moderno com a água escorrendo' },
      { label: 'Biblioteca Aconchegante', value: 'uma biblioteca aconchegante com lareira e poltronas de couro' },
      { label: 'Floresta Encantada', value: 'uma floresta encantada e mágica ao crepúsculo' },
      { label: 'Masmorra Gótica', value: 'uma masmorra gótica escura e sombria com paredes de pedra e correntes' },
      { label: 'Ruínas de Castelo ao Anoitecer', value: 'ruínas de um castelo ao anoitecer' },
      { label: 'Altar de Sacrifício em Caverna', value: 'um altar de sacrifício em uma caverna escura' },
      { label: 'Sala do Trono do Lorde Sombrio', value: 'a sala do trono de um lorde sombrio' },
      { label: 'Campo de Batalha Assombrado', value: 'um campo de batalha assombrado sob uma lua de sangue' },
      { label: 'Catedral Gótica Abandonada', value: 'o interior de uma grande catedral gótica abandonada' },
      { label: 'Cemitério Enevoado', value: 'um cemitério enevoado com lápides antigas' },
      { label: 'Mansão Assombrada Vitoriana', value: 'uma mansão assombrada da era vitoriana' },
      { label: 'Biblioteca Ornamentada à Luz de Velas', value: 'uma biblioteca ornamentada à luz de velas' },
      { label: 'Cela de Prisão Escura', value: 'uma cela de prisão escura e opressiva com uma única janela gradeada' },
      { label: 'Câmara de Tortura', value: 'uma câmara de tortura com dispositivos sinistros nas sombras' },
      { label: 'Corredor de Masmorra com Musgo', value: 'um corredor de masmorra antigo e coberto de musgo, iluminado por tochas' },
      { label: 'Esgoto Subterrâneo', value: 'um túnel de esgoto subterrâneo escuro e úmido' },
      { label: 'Cripta em Ruínas', value: 'uma cripta de castelo em ruínas cheia de teias de aranha' },
      { label: 'Ponte de Nave Espacial', value: 'a ponte de comando de uma nave espacial futurista' },
      { label: 'Muro com Grafite', value: 'um beco urbano com grafites vibrantes' },
      { label: 'Praia ao Pôr do Sol', value: 'uma praia tropical ao pôr do sol' },
      { label: 'Pico de Montanha Nevada', value: 'um pico de montanha nevado com um céu azul claro' },
      { label: 'Vasta Pradaria ao Pôr do Sol', value: 'uma vasta pradaria aberta ao pôr do sol com colinas' },
      { label: 'Aldeia Tipi nas Planícies', value: 'uma aldeia de tipis nas Grandes Planícies sob um céu aberto' },
      { label: 'Clareira na Floresta Amazônica', value: 'uma clareira de aldeia tradicional na floresta amazônica' },
      { label: 'Rio Sinuoso na Selva', value: 'ao lado de um rio sinuoso no coração da selva' },
      { label: 'Jardim Japonês', value: 'um tranquilo jardim japonês com um lago de carpas' },
      { label: 'Palco com Holofote', value: 'em um palco sob um único holofote' },
      { label: 'Sacada de Arranha-céu', value: 'em uma sacada de arranha-céu com vista para a cidade à noite' },
      { label: 'Balcão de Bar Chique', value: 'em um balcão de bar chique e moderno' },
      { label: 'Janela de Mansão', value: 'em frente a uma grande janela de sacada em uma mansão' },
      { label: 'Sala do Trono', value: 'em uma majestosa sala do trono' },
      { label: 'Banco de Parque no Outono', value: 'em um banco de parque no outono' },
      { label: 'Motocicleta Vintage', value: 'ao lado de uma motocicleta vintage em uma estrada no deserto' },
      { label: 'Quarto Ensolarado', value: 'na beira de uma cama em um quarto minimalista e ensolarado' },
      { label: 'Borda de Telhado', value: 'na borda do telhado de um arranha-céu ao pôr do sol' },
      { label: 'Campo de Flores Silvestres', value: 'em um campo vibrante de flores silvestres' },
      { label: 'Cemitério na Névoa', value: 'em um cemitério em uma manhã enevoada' },
      { label: 'Rua Chuvosa da Cidade', value: 'em uma rua da cidade durante uma tempestade à noite' },
      { label: 'Grande Escadaria', value: 'em uma grande escadaria de uma casa de ópera' },
      { label: 'Explosão de Filme de Ação', value: 'uma cena de filme de ação com uma explosão ao fundo' },
      { label: 'Multidão de Festival de Música', value: 'no meio de uma multidão animada de um festival de música' },
      { label: 'Evento de Tapete Vermelho', value: 'em um tapete vermelho na estreia de um filme' },
      { label: 'Vasto Deserto de Areia', value: 'em um vasto deserto de areia ao nascer do sol' },
      { label: 'Mercado de Rua Agitado', value: 'em um mercado de rua colorido e movimentado' },
    ],
  },
};

export const getWardrobeOptions = (lang: 'en' | 'pt'): WardrobeOptions => {
  return optionsData[lang];
};