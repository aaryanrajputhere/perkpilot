interface PricingCardProps {
  planName: string;
  price: string;
  buttonText: string;
}

const PricingCard = ({ planName, price, buttonText }: PricingCardProps) => (
  <div
    data-layer="Frame 2147206305"
    className="Frame2147206305 w-[292px] p-6 bg-white/5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-white/10 inline-flex flex-col justify-start items-center gap-6"
  >
    <div
      data-layer="Professional"
      className="Professional self-stretch text-center justify-start text-neutral-50 text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal"
    >
      {planName}
    </div>
    <div
      data-layer="$12/Month"
      className="12Month self-stretch text-center justify-start text-neutral-50 text-[32px] font-medium font-['Plus_Jakarta_Sans'] leading-[42px]"
    >
      {price}
    </div>
    <div
      data-layer="Buttons/main"
      className="ButtonsMain self-stretch h-12 px-6 py-4 bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[100px] inline-flex justify-start items-center gap-3"
    >
      <div
        data-layer="Product Reviews"
        className="ProductReviews text-center justify-start text-white text-base font-normal font-['Poppins'] leading-normal"
      >
        {buttonText}
      </div>
    </div>
  </div>
);

export default function ProductPricing() {
  const pricingData = [
    {
      planName: "Starter",
      price: "$9/Month",
      buttonText: "Get Started",
    },
    {
      planName: "Professional",
      price: "$12/Month",
      buttonText: "Most Popular",
    },
    {
      planName: "Business",
      price: "$19/Month",
      buttonText: "For Teams",
    },
    {
      planName: "Enterprise",
      price: "$29/Month",
      buttonText: "Contact Sales",
    },
  ];

  return (
    <div>
      {/* Responsive Pricing Cards Container */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingData.map((plan, index) => (
          <PricingCard
            key={index}
            planName={plan.planName}
            price={plan.price}
            buttonText={plan.buttonText}
          />
        ))}
      </div>
    </div>
  );
}
