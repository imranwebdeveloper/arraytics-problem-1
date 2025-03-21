import { useEffect } from "react";
import planData from "../assets/plan.json";
import { useDispatch } from "react-redux";
import { setPlan } from "../features/planSlice";
import PlanTab from "../components/PlanTab";
import PlanList from "../components/PlanList";

const Home = () => {
  const dispatch = useDispatch();

  // After get the plan data from the API set the plan in the store
  useEffect(() => {
    dispatch(setPlan(planData));
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      <p>30-Day Refund Policy | Cancel Anytime</p>
      <PlanTab />
      <PlanList />
    </div>
  );
};

export default Home;
