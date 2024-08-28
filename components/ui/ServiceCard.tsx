import React from "react";
import {
  WashingMachineIcon,
  DropletIcon,
  DiffIcon,
  PickaxeIcon,
  FootprintsIcon,
} from "./Icons";
// Define a service type to enforce the structure of each service object
interface Service {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconText: string;
}

// Array of service objects, each containing a title, description, and icon component
const services: Service[] = [
  {
    title: "Wash & Fold",
    description:
      "Our professional laundry service will clean and fold your clothes with care, leaving them fresh and ready to wear.",
    icon: WashingMachineIcon,
    iconBg: "bg-indigo-500",
    iconText: "text-primary-foreground",
  },
  {
    title: "Dry Cleaning",
    description:
      "Trust our expert dry cleaning service to revive your delicate garments, ensuring they look their best.",
    icon: DropletIcon,
    iconBg: "bg-black",
    iconText: "text-secondary-foreground",
  },
  {
    title: "Alterations",
    description:
      "Our skilled tailors can expertly alter your clothing to ensure the perfect fit, whether it's hemming, taking in, or letting out.",
    icon: DiffIcon,
    iconBg: "bg-indigo-500",
    iconText: "text-muted-foreground",
  },
  {
    title: "Pickup & Delivery",
    description:
      "Enjoy our convenient pickup and delivery service, so you can focus on your busy schedule while we take care of your laundry.",
    icon: PickaxeIcon,
    iconBg: "bg-black",
    iconText: "text-accent-foreground",
  },
  {
    title: "Wash & Press",
    description:
      "Our professional laundry service will clean and press your clothes, ensuring they look crisp and polished.",
    icon: WashingMachineIcon,
    iconBg: "bg-indigo-500",
    iconText: "text-primary-foreground",
  },
  {
    title: "Shoe Cleaning",
    description:
      "Let us revive your favorite shoes with our expert cleaning service, restoring their shine and extending their life.",
    icon: FootprintsIcon,
    iconBg: "bg-black",
    iconText: "text-secondary-foreground",
  },
];

// ServiceCard component renders a list of service cards
export default function ServiceCard() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="mx-20 container flex justify-center items-center flex-wrap gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-md w-full md:w-1/3"
          >
            <div className="flex items-center gap-4">
              <div
                className={`${service.iconBg} p-3 rounded-md ${service.iconText}`}
              >
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-indigo-500 text-xl font-semibold">
                {service.title}
              </h3>
            </div>
            <p className="text-black mt-4 text-muted-foreground">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
