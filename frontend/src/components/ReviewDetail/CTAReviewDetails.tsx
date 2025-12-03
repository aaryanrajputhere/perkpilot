import { Link } from "react-router-dom";

export default function CTAReviewDetails() {
  return (
    <section className="w-full py-16 flex items-center justify-center">
      <div className="w-full max-w-7xl px-4">
        <div
          className="bg-gradient-to-b box-border content-stretch flex flex-col from-[#501bd6] gap-[24px] items-center justify-center p-[40px] relative rounded-[24px] size-full to-[#7f57e2]"
          data-name="CTA"
          data-node-id="201:681"
        >
          <div
            className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-center text-white w-full whitespace-pre-wrap"
            data-node-id="201:682"
          >
            <p
              className="capitalize font-['Plus_Jakarta_Sans'] font-semibold leading-[60px] relative shrink-0 text-[48px] w-full"
              data-node-id="201:683"
            >
              Ready to try Figma?
            </p>
            <p
              className="font-['Plus_Jakarta_Sans'] font-medium leading-[32px] relative shrink-0 text-[20px] w-full"
              data-node-id="201:684"
            >
              Join millions of designers who trust Figma for their design
              workflow. Start designing for free today.
            </p>
          </div>
          <div
            className="content-stretch flex flex-col md:flex-row gap-[24px] items-start justify-center relative shrink-0"
            data-node-id="201:685"
          >
            <div
              className="bg-neutral-50 box-border content-stretch flex h-[48px] items-center justify-center md:px-[32px] py-[8px] relative rounded-[100px] shrink-0 w-full"
              data-name="All Assets"
              data-node-id="201:686"
            >
              <p
                className="font-['Poppins'] leading-[24px] not-italic relative shrink-0 text-[16px] text-zinc-950"
                data-node-id="201:687"
              >
                Start Free Trial
              </p>
            </div>
            <Link to="/reviews">
              <div
                className="backdrop-blur-md backdrop-filter bg-[rgba(250,250,250,0.08)] box-border content-stretch flex h-[48px] items-center justify-center px-[32px] py-[8px] relative rounded-[100px] shrink-0"
                data-name="All Assets"
                data-node-id="201:688"
              >
                <p
                  className="font-['Poppins'] leading-[24px] not-italic relative shrink-0 text-[16px] text-neutral-50"
                  data-node-id="201:689"
                >
                  View All Reviews
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
