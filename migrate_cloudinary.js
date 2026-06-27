const cloudinary = require('cloudinary').v2;

// OLD credentials
const oldCloudinary = cloudinary.config({
  cloud_name: 'dyubgh5k4',
  api_key: '788125762231833',
  api_secret: 'f_ROwu4JKtfFemanjx9JSEwgcqE',
});

// NEW credentials
const newCloudinary = require('cloudinary').v2;
newCloudinary.config({
  cloud_name: 'drhkvdtw2',
  api_key: '817262721762154',
  api_secret: 'HUrHDRFhwi_teo_LWwPWw2HjGbM',
});

async function migrateAssets() {
  console.log("Starting asset migration...");
  let nextCursor = null;
  let totalMigrated = 0;

  try {
    do {
      // Fetch resources from the old account
      const result = await cloudinary.api.resources({
        max_results: 50,
        next_cursor: nextCursor,
      });

      for (const resource of result.resources) {
        console.log(`Migrating ${resource.public_id}...`);
        try {
          // Upload to the new account directly from the old account's URL
          await newCloudinary.uploader.upload(resource.secure_url, {
            public_id: resource.public_id,
            resource_type: 'auto',
          });
          totalMigrated++;
          console.log(`Success: ${resource.public_id}`);
        } catch (uploadErr) {
          console.error(`Failed to migrate ${resource.public_id}:`, uploadErr.message);
        }
      }

      nextCursor = result.next_cursor;
    } while (nextCursor);

    console.log(`Migration complete! Total migrated: ${totalMigrated}`);
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrateAssets();
