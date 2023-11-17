type MedecinesType = object & ServiceType;
type MedecinesReportsType = {
   medecines: {
      id: string;
      batch_lot_no: string;
      category: string;
      created_at: Date;
      medicine_id: string;
      medicine: Inventory;
      stock_in: string;
   }[];
   adjusment: {
      id: string;
      created_at: Date;
      service_id: string;
      stock_out: string;
      medicine_id: string;
      reason: string;
   }[];
   medicines_request: {
      id: string;
      medicine_id: string;
      service_id: string;
      quantity: string;
   }[];
   medicine_adjustment: {
      id: string;
      service_id: string;
      medicine_id: string;
      stock_out: string;
      reason : string
   }[];
} & ServiceType;
