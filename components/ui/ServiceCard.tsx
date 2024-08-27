import React from "react";

const services = [
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

// Icon Components
function DiffIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v14" />
      <path d="M5 10h14" />
      <path d="M5 21h14" />
    </svg>
  );
}

function DropletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function FootprintsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
      <path d="M16 17h4" />
      <path d="M4 13h4" />
    </svg>
  );
}

function PickaxeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912" />
      <path d="M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393" />
      <path d="M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z" />
      <path d="M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319" />
    </svg>
  );
}

function WashingMachineIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h3" />
      <path d="M17 6h.01" />
      <rect width="18" height="20" x="3" y="2" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
    </svg>
  );
}
