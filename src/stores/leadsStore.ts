import { supabase } from "@/integrations/supabase/client";

export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string | null;
  property_id: string | null;
  property_title: string | null;
  phone: string | null;
  user_type: string | null;
  source: string | null;
  created_at: string;
}

export const addLead = async (lead: {
  name: string;
  email: string;
  message?: string;
  propertyId?: string;
  propertyTitle?: string;
  phone?: string;
  userType?: string;
  source?: string;
}): Promise<void> => {
  await supabase.from("leads" as any).insert({
    name: lead.name,
    email: lead.email,
    message: lead.message || null,
    property_id: lead.propertyId || null,
    property_title: lead.propertyTitle || null,
    phone: lead.phone || null,
    user_type: lead.userType || null,
    source: lead.source || null,
  } as any);
};

export const getLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase
    .from("leads" as any)
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as unknown as Lead[];
};
