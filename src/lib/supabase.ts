import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://sumkqzfioixiqhjnqlxm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1bWtxemZpb2l4aXFoam5xbHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NTA4NDcsImV4cCI6MjA1NDQyNjg0N30.QpFJJ8essPD5byeFRYmsauUj8Q1-OdWqz91Fdqn9ljg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);