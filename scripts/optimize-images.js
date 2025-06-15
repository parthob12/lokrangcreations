import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgSrcDir = path.join(__dirname, "../img_src");
const optimizedDir = path.join(__dirname, "../public/optimized-images");

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Get all image files
const imageFiles = fs
  .readdirSync(imgSrcDir)
  .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

console.log(`Found ${imageFiles.length} images to optimize`);

// Process each image
const processImage = async (file) => {
  const inputPath = path.join(imgSrcDir, file);
  const outputPath = path.join(optimizedDir, file);

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`Processing ${file} (${metadata.width}x${metadata.height})`);

    // Only resize if image is larger than 1920px
    if (metadata.width > 1920) {
      await sharp(inputPath)
        .resize(1920, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .jpeg({ quality: 80 })
        .toFile(outputPath);
    } else {
      // Just copy and optimize if image is already small enough
      await sharp(inputPath).jpeg({ quality: 80 }).toFile(outputPath);
    }

    console.log(`✓ Optimized: ${file}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${file}:`, error.message);
    // Copy original file if optimization fails
    fs.copyFileSync(inputPath, outputPath);
    console.log(`  Copied original file as fallback`);
  }
};

// Process all images
Promise.all(imageFiles.map(processImage))
  .then(() => console.log("All images processed"))
  .catch((error) => {
    console.error("Error processing images:", error);
    process.exit(1);
  });
