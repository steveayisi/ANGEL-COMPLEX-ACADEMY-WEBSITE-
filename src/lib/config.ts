import { DatabaseService } from '../lib/database';

export class ConfigChecker {
  static async checkDatabaseConnection() {
    console.log('🔍 Checking database configuration...');
    
    // Check environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Environment variables missing:');
      console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
      console.error('VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
      return {
        success: false,
        error: 'Environment variables not configured. Please check your .env file.'
      };
    }
    
    console.log('✅ Environment variables configured');
    
    // Test database connection
    try {
      const result = await DatabaseService.testConnection();
      
      if (result.success) {
        console.log('✅ Database connection successful');
        return { success: true, message: 'Database ready' };
      } else {
        console.error('❌ Database connection failed:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ Database test error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
  
  static async runStartupChecks() {
    console.log('🚀 Running startup checks for Angels Complex Academy...');
    
    const dbCheck = await this.checkDatabaseConnection();
    
    if (dbCheck.success) {
      console.log('✅ All systems ready!');
    } else {
      console.warn('⚠️ System not fully configured:', dbCheck.error);
      console.log('📖 Please see database/README.md for setup instructions');
    }
    
    return dbCheck;
  }
}