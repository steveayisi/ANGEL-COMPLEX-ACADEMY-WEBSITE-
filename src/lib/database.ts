import { supabase } from "../supabaseClient";

export interface JobApplication {
  id?: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume_url?: string;
  status: "pending" | "reviewed" | "rejected";
  created_at?: string;
  updated_at?: string;
}

export interface AdmissionData {
  parent_name: string;
  parent_occupation?: string;
  parent_phone: string;
  parent_email: string;
  child_name: string;
  child_gender: "male" | "female";
  child_age: number;
  desired_level: string;
  previous_school?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  additional_message?: string;
}

export interface AdmissionRecord extends AdmissionData {
  id: string;
  application_status: "pending" | "under_review" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
}

export interface JobOpening {
  id?: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface NewsUpdate {
  id?: string;
  title: string;
  date: string;
  author: string;
  category:
    | "Achievement"
    | "Facilities"
    | "Academic"
    | "Sports"
    | "Events"
    | "Resources";
  excerpt: string;
  content: string;
  image_url?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Announcement {
  id?: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "event";
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export class DatabaseService {
  // ===== ADMISSION FUNCTIONS =====

  // Submit a new admission application
  static async submitAdmission(data: AdmissionData) {
    try {
      const { data: result, error } = await supabase
        .from("admissions")
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error("Database error:", error);
        throw new Error(`Failed to submit application: ${error.message}`);
      }

      return { success: true, data: result };
    } catch (error) {
      console.error("Submission error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get all admissions (for admin use)
  static async getAllAdmissions() {
    try {
      const { data, error } = await supabase
        .from("admissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch admissions: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get admissions by status
  static async getAdmissionsByStatus(
    status: "pending" | "under_review" | "accepted" | "rejected"
  ) {
    try {
      const { data, error } = await supabase
        .from("admissions")
        .select("*")
        .eq("application_status", status)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch admissions: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Update admission status (for admin use)
  static async updateAdmissionStatus(
    id: string,
    status: "pending" | "under_review" | "accepted" | "rejected"
  ) {
    try {
      const { data, error } = await supabase
        .from("admissions")
        .update({ application_status: status })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update admission: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Update error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Search admissions by parent email or child name
  static async searchAdmissions(searchTerm: string) {
    try {
      const { data, error } = await supabase
        .from("admissions")
        .select("*")
        .or(
          `parent_email.ilike.%${searchTerm}%,child_name.ilike.%${searchTerm}%,parent_name.ilike.%${searchTerm}%`
        )
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to search admissions: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Search error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get admission statistics
  static async getAdmissionStats() {
    try {
      const { data, error } = await supabase
        .from("admissions")
        .select("application_status, desired_level");

      if (error) {
        throw new Error(`Failed to fetch stats: ${error.message}`);
      }

      type StatItem = {
        application_status:
          | "pending"
          | "under_review"
          | "accepted"
          | "rejected";
        desired_level: string;
      };

      const typedData = data as StatItem[];

      // Process data to create statistics
      const stats = {
        total: typedData.length,
        pending: typedData.filter(
          (item) => item.application_status === "pending"
        ).length,
        under_review: typedData.filter(
          (item) => item.application_status === "under_review"
        ).length,
        accepted: typedData.filter(
          (item) => item.application_status === "accepted"
        ).length,
        rejected: typedData.filter(
          (item) => item.application_status === "rejected"
        ).length,
        by_level: typedData.reduce((acc: Record<string, number>, item) => {
          acc[item.desired_level] = (acc[item.desired_level] || 0) + 1;
          return acc;
        }, {}),
      };

      return { success: true, data: stats };
    } catch (error) {
      console.error("Stats error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Test database connection
  static async testConnection() {
    try {
      const { error } = await supabase
        .from("admissions")
        .select("count", { count: "exact", head: true });

      if (error) {
        throw new Error(`Database connection failed: ${error.message}`);
      }

      return { success: true, message: "Database connection successful" };
    } catch (error) {
      console.error("Connection test error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // ===== JOB MANAGEMENT FUNCTIONS =====

  // Get all active job openings
  static async getJobOpenings() {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch jobs: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch jobs error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get all job openings (including inactive) - for admin use
  static async getAllJobOpenings() {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch jobs: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch jobs error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Create a new job opening
  static async createJob(jobData: JobOpening) {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .insert([jobData])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create job: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Create job error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Update a job opening
  static async updateJob(jobId: string, jobData: Partial<JobOpening>) {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .update(jobData)
        .eq("id", jobId)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update job: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Update job error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Delete a job opening
  static async deleteJob(jobId: string) {
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);

      if (error) {
        throw new Error(`Failed to delete job: ${error.message}`);
      }

      return { success: true, message: "Job deleted successfully" };
    } catch (error) {
      console.error("Delete job error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Toggle job active status
  static async toggleJobStatus(jobId: string, isActive: boolean) {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .update({ is_active: isActive })
        .eq("id", jobId)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update job status: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Toggle job status error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // ===== JOB APPLICATION FUNCTIONS =====

  // Submit a job application
  static async submitJobApplication(applicationData: JobApplication) {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .insert([applicationData])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to submit application: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Submit application error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get all job applications (for admin use)
  static async getAllJobApplications() {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select(
          `*,
           jobs:job_id (title, department)`
        )
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch applications: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch applications error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get job applications by status
  static async getJobApplicationsByStatus(
    status: "pending" | "reviewed" | "rejected"
  ) {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select(
          `*,
           jobs:job_id (title, department)`
        )
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch applications: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch applications error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Update job application status
  static async updateJobApplicationStatus(
    applicationId: string,
    status: "pending" | "reviewed" | "rejected"
  ) {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .update({ status })
        .eq("id", applicationId)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update application: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Update application error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Delete job application
  static async deleteJobApplication(applicationId: string) {
    try {
      const { error } = await supabase
        .from("job_applications")
        .delete()
        .eq("id", applicationId);

      if (error) {
        throw new Error(`Failed to delete application: ${error.message}`);
      }

      return { success: true, message: "Application deleted successfully" };
    } catch (error) {
      console.error("Delete application error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // ===== NEWS UPDATES FUNCTIONS =====

  // Get all published news updates
  static async getAllPublishedUpdates() {
    try {
      const { data, error } = await supabase
        .from("news_updates")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch updates: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch updates error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get featured news update
  static async getFeaturedUpdate() {
    try {
      const { data, error } = await supabase
        .from("news_updates")
        .select("*")
        .eq("is_featured", true)
        .eq("is_published", true)
        .order("date", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is "not found" error
        throw new Error(`Failed to fetch featured update: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch featured update error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get all news updates (for admin use)
  static async getAllUpdates() {
    try {
      const { data, error } = await supabase
        .from("news_updates")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch updates: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch updates error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Create news update
  static async createUpdate(updateData: NewsUpdate) {
    try {
      const { data, error } = await supabase
        .from("news_updates")
        .insert([updateData])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create update: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Create update error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Update news update
  static async updateNewsUpdate(id: string, updateData: Partial<NewsUpdate>) {
    try {
      const { data, error } = await supabase
        .from("news_updates")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update news: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Update news error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Delete news update
  static async deleteUpdate(id: string) {
    try {
      const { error } = await supabase
        .from("news_updates")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(`Failed to delete update: ${error.message}`);
      }

      return { success: true, message: "Update deleted successfully" };
    } catch (error) {
      console.error("Delete update error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // ===== ANNOUNCEMENTS FUNCTIONS =====

  // Create announcement
  static async createAnnouncement(announcementData: Announcement) {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .insert([announcementData])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create announcement: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Create announcement error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Update announcement
  static async updateAnnouncement(id: string, announcementData: Partial<Announcement>) {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .update(announcementData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update announcement: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Update announcement error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Delete announcement
  static async deleteAnnouncement(id: string) {
    try {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(`Failed to delete announcement: ${error.message}`);
      }

      return { success: true, message: "Announcement deleted successfully" };
    } catch (error) {
      console.error("Delete announcement error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get all active announcements
  static async getActiveAnnouncements() {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch announcements: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch announcements error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Get all announcements (for admin)
  static async getAllAnnouncements() {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch announcements: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Fetch announcements error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
