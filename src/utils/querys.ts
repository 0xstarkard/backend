import supabase from "../config/supabase";
export const gettxHash = async (
  adminId: number,
  collectionId: number
): Promise<any> => {
  const { data, error } = await supabase.from("nfc").select().eq("id", collectionId);
   return error ? error : data;  
};

