import { supabase } from '../supabaseClient';

export interface AdmissionData {
  parent_name: string;
  parent_occupation?: string;
  parent_phone: string;
  parent_email: string;
  child_name: string;
  child_gender: 'male' | 'female';
  child_age: number;
  desired_level: string;
  previous_school?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  additional_message?: string;
}

export interface AdmissionRecord extends AdmissionData {
  id: string;
  application_status: 'pending' | 'under_review' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export class DatabaseService {
  // Submit a new admission application
  static async submitAdmission(data: AdmissionData) {
    try {
      const { data: result, error } = await supabase
        .from('admissions')
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(`Failed to submit application: ${error.message}`);
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Submission error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Get all admissions (for admin use)
  static async getAllAdmissions() {
    try {
      const { data, error } = await supabase
        .from('admissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch admissions: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Fetch error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Get admissions by status
  static async getAdmissionsByStatus(status: 'pending' | 'under_review' | 'accepted' | 'rejected') {
    try {
      const { data, error } = await supabase
        .from('admissions')
        .select('*')
        .eq('application_status', status)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch admissions: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Fetch error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Update admission status (for admin use)
  static async updateAdmissionStatus(id: string, status: 'pending' | 'under_review' | 'accepted' | 'rejected') {
    try {
      const { data, error } = await supabase
        .from('admissions')
        .update({ application_status: status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update admission: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Update error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Search admissions by parent email or child name
  static async searchAdmissions(searchTerm: string) {
    try {
      const { data, error } = await supabase
        .from('admissions')
        .select('*')
        .or(`parent_email.ilike.%${searchTerm}%,child_name.ilike.%${searchTerm}%,parent_name.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to search admissions: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Search error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Get admission statistics
  static async getAdmissionStats() {
    try {
      const { data, error } = await supabase
        .from('admissions')
        .select('application_status, desired_level');

      if (error) {
        throw new Error(`Failed to fetch stats: ${error.message}`);
      }

      type StatItem = {
        application_status: 'pending' | 'under_review' | 'accepted' | 'rejected';
        desired_level: string;
      };

      const typedData = data as StatItem[];

      // Process data to create statistics
      const stats = {
        total: typedData.length,
        pending: typedData.filter(item => item.application_status === 'pending').length,
        under_review: typedData.filter(item => item.application_status === 'under_review').length,
        accepted: typedData.filter(item => item.application_status === 'accepted').length,
        rejected: typedData.filter(item => item.application_status === 'rejected').length,
        by_level: typedData.reduce((acc: Record<string, number>, item) => {
          acc[item.desired_level] = (acc[item.desired_level] || 0) + 1;
          return acc;
        }, {})
      };

      return { success: true, data: stats };
    } catch (error) {
      console.error('Stats error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Test database connection
  static async testConnection() {
    try {
      const { error } = await supabase
        .from('admissions')
        .select('count', { count: 'exact', head: true });

      if (error) {
        throw new Error(`Database connection failed: ${error.message}`);
      }

      return { success: true, message: 'Database connection successful' };
    } catch (error) {
      console.error('Connection test error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }
}