import { v2 as cloudinary } from "cloudinary";
import https from "https";
import fs from "fs";

// ─── NEW ACCOUNT (now source) ─────────────────────────────────────────────
const SOURCE = {
  cloud_name: "dyubgh5k4",
  api_key: "788125762231833",
  api_secret: "f_ROwu4JKtfFemanjx9JSEwgcqE",
};

// ─── OLD ACCOUNT (now destination) ─────────────────────────────────────────
const DESTINATION = {
  cloud_name: "dqvxeeedd",
  api_key: "321257998291866",
  api_secret: "AOY_Ko7exTRKThDuwUBIf53UCE0",
};

/** Fetch all resources from source account (handles pagination) */
async function getAllResources() {
  cloudinary.config(SOURCE);
  let resources = [];
  let nextCursor = null;

  do {
    const params = { max_results: 500, type: "upload" };
    if (nextCursor) params.next_cursor = nextCursor;

    const result = await cloudinary.api.resources(params);
    resources = resources.concat(result.resources);
    nextCursor = result.next_cursor || null;
    console.log(`  Fetched ${resources.length} resources so far...`);
  } while (nextCursor);

  return resources;
}

/** Download a URL into a buffer */
function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

/** Upload a buffer to destination account with the same public_id */
async function uploadToDest(buffer, publicId, resourceType = "image") {
  cloudinary.config(DESTINATION);
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: resourceType,
        overwrite: true,
        invalidate: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function migrateBack() {
  console.log("=== Cloudinary Reverse Migration ===");
  console.log(`FROM: ${SOURCE.cloud_name}  →  TO: ${DESTINATION.cloud_name}\n`);

  console.log("Fetching all resources from source account...");
  cloudinary.config(SOURCE);
  const resources = await getAllResources();
  console.log(`\nTotal images found: ${resources.length}\n`);

  const results = { success: [], failed: [] };

  for (let i = 0; i < resources.length; i++) {
    const r = resources[i];
    const publicId = r.public_id;
    const secureUrl = r.secure_url;
    console.log(`[${i + 1}/${resources.length}] Copying: ${publicId}`);

    try {
      // Check if already exists in destination
      cloudinary.config(DESTINATION);
      try {
        await cloudinary.api.resource(publicId);
        console.log(`  ✓ Already exists, skipping.`);
        results.success.push(publicId);
        continue;
      } catch {
        // Not found, proceed to upload
      }

      // Download from source
      const buffer = await downloadBuffer(secureUrl);

      // Upload to dest
      await uploadToDest(buffer, publicId);
      console.log(`  ✓ Copied successfully.`);
      results.success.push(publicId);
    } catch (err) {
      console.error(`  ✗ FAILED: ${err.message || err}`);
      results.failed.push({ publicId, error: err.message || String(err) });
    }
  }

  console.log("\n=== REVERSE MIGRATION COMPLETE ===");
  console.log(`✓ Succeeded: ${results.success.length}`);
  console.log(`✗ Failed:    ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log("\nFailed assets:");
    results.failed.forEach((f) => console.log(`  - ${f.publicId}: ${f.error}`));
  }
}

migrateBack().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
