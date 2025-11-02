export interface StylePreset {
  id: string;
  name: string;
  description: string;
  selections: {
    visualStyle: string;
    imageStyle: {
        style: string;
    };
    decade: string;
  };
}

export const stylePresetsData: { [key in 'en' | 'pt']: StylePreset[] } = {
  en: [
    {
      id: '90s_anime',
      name: '90s Anime Throwback',
      description: 'Vibrant illustration in a retro anime style.',
      selections: {
        visualStyle: 'A detailed and vibrant digital illustration style.',
        imageStyle: { style: 'vintage 90s anime style' },
        decade: '1990s',
      },
    },
    {
      id: 'vintage_film',
      name: 'Vintage Film Portrait',
      description: 'A classic 70s look with grainy 35mm film.',
      selections: {
        visualStyle: 'The look of a vintage photograph, shot on 35mm film with light grain.',
        imageStyle: { style: '' },
        decade: '1970s',
      },
    },
    {
      id: 'pixar_look',
      name: 'Pixar Movie Look',
      description: 'Transform into a 3D animated movie character.',
      selections: {
        visualStyle: 'A cinematic 3D render, like an animated movie character.',
        imageStyle: { style: 'Pixar animated movie style' },
        decade: '',
      },
    },
    {
      id: 'y2k_cyberpunk',
      name: 'Y2K Cyberpunk',
      description: 'A futuristic, neon-drenched Y2K aesthetic.',
      selections: {
        visualStyle: 'A futuristic, neon-drenched cyberpunk aesthetic.',
        imageStyle: { style: '' },
        decade: '2000s (Y2K)',
      },
    }
  ],
  pt: [
    {
      id: '90s_anime',
      name: 'Anime Retrô anos 90',
      description: 'Ilustração vibrante em um estilo de anime retrô.',
      selections: {
        visualStyle: 'A detailed and vibrant digital illustration style.',
        imageStyle: { style: 'vintage 90s anime style' },
        decade: '1990s',
      },
    },
    {
      id: 'vintage_film',
      name: 'Retrato em Filme Vintage',
      description: 'Um visual clássico dos anos 70 com filme de 35mm.',
      selections: {
        visualStyle: 'The look of a vintage photograph, shot on 35mm film with light grain.',
        imageStyle: { style: '' },
        decade: '1970s',
      },
    },
    {
      id: 'pixar_look',
      name: 'Visual de Filme Pixar',
      description: 'Transforme-se em um personagem de filme 3D.',
      selections: {
        visualStyle: 'A cinematic 3D render, like an animated movie character.',
        imageStyle: { style: 'Pixar animated movie style' },
        decade: '',
      },
    },
     {
      id: 'y2k_cyberpunk',
      name: 'Cyberpunk Y2K',
      description: 'Uma estética futurista e neon dos anos 2000.',
      selections: {
        visualStyle: 'A futuristic, neon-drenched cyberpunk aesthetic.',
        imageStyle: { style: '' },
        decade: '2000s (Y2K)',
      },
    }
  ]
};

export const getStylePresets = (lang: 'en' | 'pt') => stylePresetsData[lang];
