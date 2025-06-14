const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

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

// Process each image
imageFiles.forEach(async (file) => {
  const inputPath = path.join(imgSrcDir, file);
  const outputPath = path.join(optimizedDir, file);

  try {
    await sharp(inputPath)
      .resize(1920, null, {
        // Max width 1920px, maintain aspect ratio
        withoutEnlargement: true,
        fit: "inside",
      })
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toFile(outputPath);

    console.log(`Optimized: ${file}`);
  } catch (error) {
    console.error(`Error optimizing ${file}:`, error);
  }
});
