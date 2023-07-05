import { ProfitabilityInterface } from 'interfaces/profitability';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface AssetInterface {
  id?: string;
  name: string;
  type: string;
  price: number;
  business_id?: string;
  created_at?: any;
  updated_at?: any;
  profitability?: ProfitabilityInterface[];
  business?: BusinessInterface;
  _count?: {
    profitability?: number;
  };
}

export interface AssetGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  type?: string;
  business_id?: string;
}
