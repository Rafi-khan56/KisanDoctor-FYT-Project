import { loadTensorflowModel, TensorflowModel } from 'react-native-fast-tflite';

// Model 224x224 ki RGB tasveer leta hai (pixel 0 se 255), rang ki scaling model ke andar hai.
export const IMG_SIZE = 224;

// labels.txt jaisi hi tarteeb (Colab mein sorted). Model badlein to ye bhi badlein.
export const LABELS = [
  'Other',
  'Potato___Early_blight',
  'Potato___Late_blight',
  'Potato___healthy',
  'Tomato___Bacterial_spot',
  'Tomato___Early_blight',
  'Tomato___Late_blight',
  'Tomato___Leaf_Mold',
  'Tomato___Septoria_leaf_spot',
  'Tomato___Target_Spot',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  'Tomato___Tomato_mosaic_virus',
  'Tomato___healthy',
];

export type Prediction = {
  index: number;
  label: string;
  confidence: number; // 0 se 100
  probs: number[];
};

let modelPromise: Promise<TensorflowModel> | null = null;

function getModel() {
  if (!modelPromise) {
    modelPromise = loadTensorflowModel(require('./kisan_model.tflite'), []);
  }
  return modelPromise;
}

// pixels: IMG_SIZE * IMG_SIZE * 3 numbers (R, G, B, R, G, B ...), har ek 0 se 255
export async function classify(pixels: Float32Array): Promise<Prediction> {
  if (pixels.length !== IMG_SIZE * IMG_SIZE * 3) {
    throw new Error(`Input ka size galat hai: ${pixels.length}`);
  }
  const model = await getModel();
  const outputs = await model.run([pixels.buffer as ArrayBuffer]);
  const probs = Array.from(new Float32Array(outputs[0] as ArrayBuffer));

  let best = 0;
  probs.forEach((p, i) => {
    if (p > probs[best]) best = i;
  });
  return { index: best, label: LABELS[best] ?? `class ${best}`, confidence: probs[best] * 100, probs };
}
