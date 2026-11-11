import { CropKey, LabelKey, Tone } from '../types/scan';

// classifier.ts ki LABELS ke naam, app ki keys se mila kar.
// "Other" yahan nahi hai: wo supported patta nahi, is liye scan save nahi hota.
export const LABEL_MAP: Record<
  string,
  { crop: CropKey; label: Exclude<LabelKey, 'expertReview'>; tone: Tone }
> = {
  Potato___Early_blight: { crop: 'potato', label: 'earlyBlight', tone: 'bad' },
  Potato___Late_blight: { crop: 'potato', label: 'lateBlight', tone: 'bad' },
  Potato___healthy: { crop: 'potato', label: 'healthy', tone: 'ok' },
  Tomato___Bacterial_spot: { crop: 'tomato', label: 'bacterialSpot', tone: 'bad' },
  Tomato___Early_blight: { crop: 'tomato', label: 'earlyBlight', tone: 'bad' },
  Tomato___Late_blight: { crop: 'tomato', label: 'lateBlight', tone: 'bad' },
  Tomato___Leaf_Mold: { crop: 'tomato', label: 'leafMold', tone: 'bad' },
  Tomato___Septoria_leaf_spot: { crop: 'tomato', label: 'septoriaLeafSpot', tone: 'bad' },
  Tomato___Target_Spot: { crop: 'tomato', label: 'targetSpot', tone: 'bad' },
  Tomato___Tomato_Yellow_Leaf_Curl_Virus: { crop: 'tomato', label: 'yellowLeafCurl', tone: 'bad' },
  Tomato___Tomato_mosaic_virus: { crop: 'tomato', label: 'mosaicVirus', tone: 'bad' },
  Tomato___healthy: { crop: 'tomato', label: 'healthy', tone: 'ok' },
};
