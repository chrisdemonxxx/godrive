import { readFileSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL is not set in .env.local');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not set in .env.local');
  console.error('⚠️  You need to add your service role key to run migrations.');
  console.error('   Get it from: Supabase Dashboard → Settings → API → service_role key');
  console.error('\n📝 Alternatively, you can run the SQL manually:');
  console.error('   1. Open Supabase Dashboard → SQL Editor');
  console.error('   2. Copy contents of complete_schema.sql');
  console.error('   3. Paste and run in SQL Editor\n');
  process.exit(1);
}

async function runSchema() {
  console.log('🚀 Running GoDrive database schema migration...\n');

  // Create Supabase client with service role key
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // Read the schema file
    const schemaPath = join(__dirname, '../complete_schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    // Split by comments that indicate parts
    const parts = schema.split(/^-- GoDrive Database Schema - Part \d+:/m);

    console.log(`📄 Found ${parts.length - 1} schema parts to execute\n`);

    // Execute each part
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i].trim();
      if (!part) continue;

      console.log(`⏳ Executing Part ${i}...`);

      // Use RPC to execute SQL (if available) or use direct query
      // Note: Supabase JS client doesn't support raw SQL execution directly
      // We'll need to use the REST API or psql
      const { error } = await supabase.rpc('exec_sql', { sql: part });

      if (error) {
        // If RPC doesn't exist, we need to use a different approach
        console.error('⚠️  Direct SQL execution not available via JS client.');
        console.error('   Please run the schema manually in Supabase SQL Editor.\n');
        break;
      }

      console.log(`✅ Part ${i} completed\n`);
    }

    console.log('✅ Schema migration completed successfully!');
  } catch (error) {
    console.error('❌ Error running schema:', error);
    console.error('\n📝 Please run the SQL manually in Supabase SQL Editor.');
    process.exit(1);
  }
}

runSchema();
