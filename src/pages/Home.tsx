import { useEffect } from "react";
import planData from "../assets/plan.json";
import { useDispatch } from "react-redux";
import { setPlan } from "../features/planSlice";
import PlanTab from "../components/PlanTab";
import PlanList from "../components/PlanList";
import styled from "@emotion/styled";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlan(planData));
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <h1>Home</h1>
        <p>30-Day Refund Policy | Cancel Anytime</p>
      </Header>
      <Content>
        <PlanTab />
        <PlanList />
      </Content>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1rem;
    color: gray;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
