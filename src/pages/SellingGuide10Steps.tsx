import ArticleLayout from "@/components/ArticleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    id: "step1",
    title: "Step 1: Decide When to Sell",
    content: [
      {
        subtitle: "Status report. Is it a buyer's or a seller's market?",
        text: "When there are lots of people looking for homes but not many for sale, this is called a 'seller's market', because the seller has something everybody wants. When there are more homes for sale and not many people buying them, this is called a 'buyer's market' because buyers have more power of choice. A REALTOR is the best person to consult about this."
      },
      {
        subtitle: "How quickly do you need to sell your home?",
        text: "In a seller's market, top price and a fast sale can go hand-in-hand. In a buyer's market, more sellers are competing for your potential buyer. If you have to sell right now, you may wish to lower your asking price a bit to speed up the sale. REALTORS are masters at figuring the price-to-listing ratio and know how to attract offers without going unnecessarily low."
      },
      {
        subtitle: "Seasonality. Do home sales get frostbite?",
        text: "It's true. Winter sales tend to be slower, and Spring sales are more brisk. Regardless, there are always people looking to buy, and seasonality is only one of many factors to consider."
      },
      {
        subtitle: "If you're also buying a home",
        text: "In this case, you don't really have to worry about playing the market. If you sell your existing home for a 'low' price, you're probably also buying at a low price. If you are upgrading to a larger home, this actually works to your advantage."
      },
      {
        subtitle: "Buy first or sell first? The eternal question.",
        text: "Many people are able to time their sale and purchase so they happen on the same 'closing date.' Buyers can make their offer 'conditional' on the sale of their existing home. When selling, you can try to extend the 'closing period' to give yourself more time to find your next home."
      }
    ]
  },
  {
    id: "step2",
    title: "Step 2: Find a REALTOR Who is Right for You",
    content: [
      {
        subtitle: "Your REALTOR who helped you buy your current house is a good start",
        text: "Sticking with a REALTOR just makes sense. If they did a good job helping you buy your home, they're probably the best candidate for helping you sell it. They already know the home inside and out, and they know you, so you'll save time two ways."
      },
      {
        subtitle: "Think locally",
        text: "Jot down the names and numbers of REALTORS on the 'For Sale' signs in your neighbourhood. Maybe your local friends or nearby family have a REALTOR to recommend. You can also visit one of your local real estate offices; it's guaranteed they'll know your area."
      },
      {
        subtitle: "Interviewing candidates",
        text: "Don't be afraid to ask questions, or screen a few REALTORS before deciding. Make sure you feel comfortable with them and that they show a genuine interest in helping you."
      },
      {
        subtitle: "Should you choose the REALTOR who suggests the highest asking price?",
        text: "Ask what method they used to assess your home's market value. How was your home compared to other homes in your neighbourhood that have been sold recently?"
      }
    ]
  },
  {
    id: "step3",
    title: "Step 3: Sign a Listing Agreement",
    content: [
      {
        subtitle: "The Listing Agreement serves three purposes",
        text: "1. It defines your relationship. Every detail of your work together, including the limits of your REALTOR'S authority, will be clearly defined. 2. It provides detailed information about the home. This information can then be placed on the board's Multiple Listing Service. 3. It forms the basis for drafting offers on your home."
      },
      {
        subtitle: "Exclusive or Multiple Listing Service?",
        text: "'Exclusive Listing' means that only your brokerage can find a buyer for your home. REALTORS generally recommend a 'Multiple Listing', which allows them to put your home on the Multiple Listing Service for maximum exposure."
      },
      {
        subtitle: "Price",
        text: "The real key to attracting buyers. You have the final say over this magic number, but your REALTOR will have very useful advice."
      },
      {
        subtitle: "Real estate commission",
        text: "This is usually a percentage of the final sale price, and you only pay once your REALTOR has found you an acceptable offer. This commission or percentage is negotiable."
      },
      {
        subtitle: "Chattels and Fixtures",
        text: "Chattels are moveable items like washers and dryers, microwaves and window blinds. Fixtures are permanent improvements like central air conditioning and wall-to-wall carpeting. Go over every item with your REALTOR and make sure it's accounted for."
      }
    ]
  },
  {
    id: "step4",
    title: "Step 4: Determine Your Home's Asking Price",
    content: [
      {
        subtitle: "You don't want to set your price too low or too high",
        text: "Setting too low a price means you could miss out on thousands of dollars. Setting too high a price can scare away willing buyers and leave your home on the market for too long."
      },
      {
        subtitle: "Your goal is fair market value",
        text: "'Market Value' is a term that simply means the maximum amount of money that interested buyers are willing to pay for your property. Remember, buyers comparison shop, especially for something as expensive as a home."
      },
      {
        subtitle: "REALTORS know the general factors affecting your market",
        text: "Maybe larger families are moving into your neighbourhood. Perhaps a large employer is opening a plant nearby. How are interest rates affecting people's willingness to take out big mortgages? Your REALTOR knows the answer to these questions."
      },
      {
        subtitle: "Comparative Market Analysis (CMA)",
        text: "Your REALTOR will compare your home to a collection of similar homes that have recently been sold in your area. Your REALTOR'S suggested asking price is thoroughly researched, and designed to maximize attention and profit for your home."
      }
    ]
  },
  {
    id: "step5",
    title: "Step 5: Add a Lawyer to Your Team",
    content: [
      {
        subtitle: "You've probably already worked with a real estate lawyer",
        text: "The most logical candidate is the lawyer you hired when you bought your home. They're already familiar with the property and may have even prepared the purchase documents."
      },
      {
        subtitle: "Other ways to find a lawyer",
        text: "Ask the people you trust like friends, family or business associates if they know a lawyer with substantial real estate experience. REALTORS can also give you the names of several lawyers."
      },
      {
        subtitle: "How your lawyer will help with the sale",
        text: "Your lawyer will review important documents that require your signature. The most critical of these is the 'offer' submitted by the buyer. You want to know exactly what you are agreeing to before you sign any offer."
      }
    ]
  },
  {
    id: "step6",
    title: "Step 6: Prepare Your Home for Sale",
    content: [
      {
        subtitle: "Time to see your home through a buyer's eyes",
        text: "Over the years, you've grown quite comfortable with your home's little imperfections. Grab a clipboard and take a tour of your home."
      },
      {
        subtitle: "Get rid of the clutter",
        text: "Your house will feel a lot bigger and more inviting when you get rid of all the non-essential stuff lying around. Clear out those closets, remove bulky, unused furniture and rearrange the remaining pieces to make the best use of space."
      },
      {
        subtitle: "Clean everything",
        text: "Cleaning is the single most cost effective way to make your home more attractive to buyers. Give extra care and attention to bathrooms and kitchens."
      },
      {
        subtitle: "Depersonalize your home",
        text: "You want buyers to walk through your house and feel like it's their home, not yours! Remove everything that's too much about you."
      },
      {
        subtitle: "Never underestimate the power of paint",
        text: "Consider repainting your home in bright, neutral colours that will enhance a room's size and look more inviting. Next to cleaning your home, paint is the most cost-effective way to increase your home's appeal."
      }
    ]
  },
  {
    id: "step7",
    title: "Step 7: Let Your REALTOR Market Your Home",
    content: [
      {
        subtitle: "The 'For Sale' Sign",
        text: "Despite all our leaps in technology, the 'For Sale' sign continues to be an extremely effective way to advertise. Anybody responding to your sign is a good lead."
      },
      {
        subtitle: "Traditional media",
        text: "Your REALTOR may choose classified ads in the newspaper, ads in REALTOR magazines, real estate listings on cable television and neighbourhood mailers."
      },
      {
        subtitle: "MLS and the power of the Internet",
        text: "Your REALTOR will place your home on the Multiple Listing Service, ensuring maximum exposure to all REALTORS and on popular real estate websites."
      },
      {
        subtitle: "Open House for REALTORS",
        text: "Most REALTORS like to see a home with their own eyes before they show it to their buyers. A 'REALTOR Open House' is the most efficient way to attract all these REALTORS."
      },
      {
        subtitle: "Open House for everybody",
        text: "Many buyers want to get a feel for your neighbourhood before they start working with a REALTOR. Open Houses to the public usually last a few hours on a Saturday or Sunday."
      }
    ]
  },
  {
    id: "step8",
    title: "Step 8: Prepare Your Finances",
    content: [
      {
        subtitle: "'Discharging' your mortgage",
        text: "Many people use the proceeds from the sale of their home to 'discharge' or pay off their mortgage. If you have an 'open' mortgage, you can pay it all off without any penalties. If you have a 'closed' mortgage, be prepared to pay a few month's payments in penalties."
      },
      {
        subtitle: "If you're buying a new home, is your mortgage 'portable'?",
        text: "Many mortgages are 'portable' meaning that you can take your mortgage money with you and buy a new home, without penalty. This can be a real bonus if the interest rate on your mortgage is lower than existing rates!"
      },
      {
        subtitle: "Capital gains tax",
        text: "If the home was your primary residence, you will not have to pay taxes on any capital gain. If you had tenants living in part of your home, you will pay capital gains tax on a portion of your profits."
      },
      {
        subtitle: "HST for professional services",
        text: "Your lawyer and REALTOR are providing services, and services are subject to HST."
      }
    ]
  },
  {
    id: "step9",
    title: "Step 9: Receive an Offer",
    content: [
      {
        subtitle: "You'll see every offer",
        text: "It's required that your REALTOR show you every offer that's submitted. They'll call for an appointment, usually at your home, to discuss the offer."
      },
      {
        subtitle: "Types of offers",
        text: "Firm Offer to Purchase: The buyer is prepared to purchase the home without any conditions. Conditional Offer to Purchase: There are one or more conditions on the purchase, such as 'subject to home inspection' or 'subject to financing'."
      },
      {
        subtitle: "Three Options when Responding to an Offer",
        text: "1. You can accept the offer. 2. You can reject the offer. 3. You can 'sign back' or 'counter' the offer."
      },
      {
        subtitle: "The Art of Counter-Offers and Negotiation",
        text: "A successful negotiation is one that leaves both you and the buyer feeling satisfied with the outcome. Remember once you 'sign back' an offer, you are releasing the buyer from their offer and they are free to walk away."
      }
    ]
  },
  {
    id: "step10",
    title: "Step 10: Close the Deal",
    content: [
      {
        subtitle: "Your REALTOR and lawyer will do most of the work",
        text: "Closing a deal involves many, many complicated and time-consuming legal maneuvers. That's why you've hired pros."
      },
      {
        subtitle: "Your Closing Checklist",
        text: "Contact your lawyer and notify them that an Agreement has been signed. Immediately begin satisfying any conditions of the agreement. Notify your lawyer if the buyer is assuming your mortgage. Contact utilities about transfer or removal of service. Call your insurance agent. Contact a moving company. Send out change of address notices."
      },
      {
        subtitle: "On closing day",
        text: "Your lawyer will receive and distribute the proceeds from the sale, pay off your mortgage and other costs, and give you a cheque for the net proceeds."
      },
      {
        subtitle: "Congratulations!",
        text: "You should be pleased that all your hard work paid off. Home ownership is one of the best long-term investments you'll ever make."
      }
    ]
  }
];

const SellingGuide10Steps = () => {
  return (
    <ArticleLayout
      title="10-Step Guide to Selling Your Home"
      subtitle="A comprehensive step-by-step guide to help you navigate the home selling process from start to finish."
      backTo="/selling-tips"
      backLabel="Back to Selling Tips"
      cta={{
        title: "Ready to Sell Your Home?",
        description: "Get a free home valuation and personalized selling strategy from Sanjeev Manocha.",
        linkTo: "/home-valuation",
        linkLabel: "Get Your Free Home Valuation",
      }}
      maxWidth="max-w-4xl"
    >
      {/* Quick Navigation */}
      <div className="article-card rounded-sm p-8 mb-12">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Quick Navigation</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <a
              key={step.id}
              href={`#${step.id}`}
              className="rounded-sm border border-border/50 p-3 text-xs font-body font-medium uppercase tracking-[0.15em] text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-colors text-center"
            >
              Step {index + 1}
            </a>
          ))}
        </div>
      </div>

      {/* Steps Content */}
      <div className="space-y-12">
        {steps.map((step) => (
          <div key={step.id} id={step.id} className="article-card rounded-sm p-8 md:p-10 scroll-mt-24">
            <h3 className="font-display text-xl font-semibold text-primary md:text-2xl mb-6">{step.title}</h3>
            <div className="space-y-6">
              {step.content.map((item, index) => (
                <div key={index}>
                  <h4 className="mb-2 font-body font-semibold text-foreground">{item.subtitle}</h4>
                  <p className="text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-xs font-body uppercase tracking-[0.2em] text-muted-foreground">
        Source: OREA (Ontario Real Estate Association) www.howrealtorshelp.ca
      </p>
    </ArticleLayout>
  );
};

export default SellingGuide10Steps;
