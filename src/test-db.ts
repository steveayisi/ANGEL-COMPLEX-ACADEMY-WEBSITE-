import { DatabaseService } from "../lib/database";

// Test the database connection
async function testDatabase() {
  console.log("Testing database connection...");

  try {
    const result = await DatabaseService.testConnection();
    console.log("Connection test result:", result);

    if (result.success) {
      console.log("✅ Database connection successful!");

      // Test submitting a sample admission
      console.log("Testing admission submission...");
      const sampleData = {
        parent_name: "Test Parent",
        parent_phone: "+233241234567",
        parent_email: "test@example.com",
        child_name: "Test Child",
        child_gender: "male" as const,
        child_age: 5,
        desired_level: "kg1",
      };

      const submitResult = await DatabaseService.submitAdmission(sampleData);
      console.log("Submit test result:", submitResult);

      if (submitResult.success) {
        console.log("✅ Database submission test successful!");
      } else {
        console.log("❌ Database submission test failed:", submitResult.error);
      }
    } else {
      console.log("❌ Database connection failed:", result.error);
    }
  } catch (error) {
    console.error("❌ Database test error:", error);
  }
}

// Run the test
testDatabase();
