// Quick test to check Supabase connection and RLS
import { supabase } from "./supabaseClient";

export async function testJobsAccess() {
  console.log("Testing jobs table access...");

  // Test 1: Try to fetch jobs without authentication
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true);

    if (error) {
      console.error("❌ Error fetching jobs:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      return;
    }

    console.log("✅ Successfully fetched jobs:", data);
    console.log("Number of active jobs:", data?.length || 0);
  } catch (err) {
    console.error("❌ Exception occurred:", err);
  }
}

// Run this in browser console: testJobsAccess()
