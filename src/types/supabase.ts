export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          username: string;
          full_name: string;
          avatar_url: string;
          subscription_tier: 'free' | 'premium';
          subscription_status: 'active' | 'inactive';
          subscription_end_date: string | null;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string;
          avatar_url?: string;
          subscription_tier?: 'free' | 'premium';
          subscription_status?: 'active' | 'inactive';
          subscription_end_date?: string | null;
        };
        Update: {
          username?: string;
          full_name?: string;
          avatar_url?: string;
          subscription_tier?: 'free' | 'premium';
          subscription_status?: 'active' | 'inactive';
          subscription_end_date?: string | null;
        };
      };
      saved_items: {
        Row: {
          id: string;
          user_id: string;
          item_type: string;
          item_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          item_type: string;
          item_id: string;
        };
        Update: {
          item_type?: string;
          item_id?: string;
        };
      };
    };
  };
}