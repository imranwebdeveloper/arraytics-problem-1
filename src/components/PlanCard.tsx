import styled from "@emotion/styled";
import { Plan } from "../features/planSlice";
import CustomSelect from "./ui/Select";
import { useState } from "react";
interface Option {
  value: string;
  label: string;
}

interface PlanCardProps {
  price: string;
  priceLabel: string;
  isPopular?: boolean;
  plan: Plan;
  discountAmount: string;
  handlePlanOption: (value: Option) => void;
}

const PlanCard = ({
  price,
  priceLabel,
  isPopular = false,
  discountAmount,
  plan,
  handlePlanOption,
}: PlanCardProps) => {
  const [visitor, setVisitor] = useState<Option | null>(null);

  return (
    <Card>
      {isPopular && <Badge>Most Popular</Badge>}
      <Header />
      <Content>
        <PlanTitle>{plan.name}</PlanTitle>
        <PlanPrice>
          {price}
          <PriceLabel>
            <small>
              <s>{discountAmount}</s>
            </small>
            <p>{priceLabel}</p>
          </PriceLabel>
        </PlanPrice>
        {plan.planOptions.length > 1 ? (
          <CustomSelect
            onChange={(value) => {
              setVisitor(value);
              handlePlanOption(value);
            }}
            options={[
              ...plan.planOptions.map((item) => ({
                label: item.title,
                value: item.id.toString(),
              })),
            ]}
            value={visitor}
            placeholder="Select a plan"
          />
        ) : (
          <VisitorLimit dangerouslySetInnerHTML={{ __html: plan.title }} />
        )}

        <FeatureList>
          <FeatureTitle>Everything in free plus:</FeatureTitle>
          {plan.features.map((feature, index) => (
            <FeatureItem key={index}>{feature.feature_title}</FeatureItem>
          ))}
        </FeatureList>

        <SelectButton>Select Plan</SelectButton>
      </Content>
    </Card>
  );
};

export default PlanCard;

const Card = styled.div`
  background: #f7fcf9;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  overflow: hidden;
  text-align: center;
  font-family: "Inter", sans-serif;
  position: relative;
`;

const Header = styled.div`
  background: #6fdc91;
  height: 10px;
`;

const Badge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #4caf50;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 8px;
`;

const Content = styled.div`
  padding: 20px;
`;

const PlanTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const PlanPrice = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* flex-direction: column; */
`;

const PriceLabel = styled.p`
  font-size: 14px;
  color: #555;
  text-align: start;
`;

const VisitorLimit = styled.div`
  background: rgba(111, 220, 145, 0.2);
  padding: 6px 12px;
  border-radius: 16px;
  color: #4caf50;
  font-weight: bold;
  font-size: 14px;
  display: inline-block;
  margin-bottom: 16px;
`;

const FeatureList = styled.ul`
  text-align: left;
  padding: 0;
  margin-top: 16px;
  list-style: none;
`;

const FeatureTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const FeatureItem = styled.li`
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
`;

const SelectButton = styled.button`
  background: #6fdc91;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;

  &:hover {
    background: #57c07a;
  }
`;
