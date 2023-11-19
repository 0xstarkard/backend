import supabase from "../config/supabase";
export const gettxHash = async (
  adminId: number,
  collectionId: number
): Promise<any> => {
  const { data, error } = await supabase.from("nfc").select().eq("id", collectionId);
   return error ? error : data;  
};

export const createUsers = async (serial: any, key_public: any, key_private: any, key_smartwallet: any, wallet_backup: any, linkto: any): Promise<any> => {
 
  const { data, error } = await supabase
    .from("stark_user")
    .insert([{ 'serial': serial, 'key_public':key_public,  'key_private':key_private, 'key_smartwallet':key_smartwallet, 'wallet_backup':wallet_backup, 'linkto':linkto }])
    .select();
    console.log(data); 
   return error ? error : data;
  
};
 