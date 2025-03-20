import { useEffect } from "react";
import planData from "../assets/plan.json";
import { useDispatch } from "react-redux";
import { setPlan } from "../features/planSlice";
import { useAppSelector } from "../store/reduxStore";

const Home = () => {
  const dispatch = useDispatch();
  const { plan } = useAppSelector((state) => state.plan);
  // After get the plan from the API set the plan in the store
  useEffect(() => {
    dispatch(setPlan(planData));
  }, [dispatch]);

  const planInfo = Object.values(plan?.plansInfo || {});
  console.log(planInfo);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
