import { AssetInterface } from 'interfaces/asset';
import { GetQueryInterface } from 'interfaces';

export interface ProfitabilityInterface {
  id?: string;
  rate: number;
  asset_id?: string;
  created_at?: any;
  updated_at?: any;

  asset?: AssetInterface;
  _count?: {};
}

export interface ProfitabilityGetQueryInterface extends GetQueryInterface {
  id?: string;
  asset_id?: string;
}
