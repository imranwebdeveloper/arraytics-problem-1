import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import plan from "../assets/plan.json";

// type PlanState = keyof typeof plan.plansInfo;

interface PlanDetails {
  price: string;
  price_postfix: string;
  plan_type: string;
  plan_info: string;
  dd_text: string;
  btn_text: string;
  price_id: string;
}

interface Plan {
  name: string;
  price: string;
  title: string;
  text: string;
  details: {
    [key: string]: PlanDetails;
  };
}

interface PlanInfo {
  title: string;
  sub_title: string;
  discount: string;
}

interface Feature {
  is_pro: string;
  feature_title: string;
  feature_desc: string;
}

export interface planState {
  plan: typeof plan | null;
  planInfo: PlanInfo[];
}

const initialState: planState = {
  plan: null,
  planInfo: [],
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<planState["plan"]>) => {
      state.plan = action.payload;
      state.planInfo = Object.values(action.payload?.plansInfo || {});
    },
  },
});

export const { setPlan } = planSlice.actions;

export default planSlice.reducer;
