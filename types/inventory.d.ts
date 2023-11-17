type Inventory = {
   id: string;
   name: string;
   descriptions: string;
   category: string;
   created_at: Date;
};
type InventoryList = {
   id: string;
   name: string;
   descriptions: string;
   category: ServiceType;
   created_at: Date;
};
