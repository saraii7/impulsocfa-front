import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kweqoqguupwxgbwavyfb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3ZXFvcWd1dXB3eGdid2F2eWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTYzMTcsImV4cCI6MjA3MjY5MjMxN30.8mTZig7qpVjXWyHAjrPHenWwNbSQMbRUMNSqZr-m6u4"

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
