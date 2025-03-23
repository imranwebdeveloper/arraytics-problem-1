import plan from "../assets/plan.json";

export type PlanType = keyof typeof plan.plansInfo;
export type PlanData = typeof plan;

export interface PlanDetails {
  price: string;
  price_postfix: string;
  plan_type: string;
  plan_info: string;
  dd_text: string;
  btn_text: string;
  price_id: string;
}

export interface Plan {
  name: string;
  price: string;
  title: string;
  text: string;
  id: string | number;
  details: {
    [key: string]: PlanDetails;
  };
  planOptions: Plan[];
  features: Feature[];
  is_pro?: number;
}

export interface PlanInfo {
  title: string;
  sub_title: string;
  discount: string;
  type: PlanType;
}

export interface Feature {
  is_pro: number;
  feature_title: string;
  feature_desc: string;
}

export interface PlanState {
  plan: Plan[];
  planInfo: PlanInfo[];
  selectedPlan: PlanType;
}
