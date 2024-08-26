/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IDPt1WU5BXu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="ml-20 mr-20 bg-muted py-12 text-muted-foreground">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <h4 className="text-indigo-600 text-lg font-medium">Contact</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Phone:</span> (123) 456-7890
            </div>
            <div>
              <span className="font-medium">Email:</span> info@example.com
            </div>
            <div>
              <span className="font-medium">Address:</span> 123 Main St, Anytown
              USA
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-indigo-600 text-lg font-medium">About</h4>
          <p className="text-sm">
            We are a leading provider of innovative solutions for businesses of
            all sizes. Our mission is to help our clients succeed by delivering
            high-quality products and exceptional customer service.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-indigo-600 text-lg font-medium">Get Started</h4>
          <div className="space-y-2 text-sm">
            <Link
              href="#"
              className="mr-3 inline-flex items-center gap-2 hover:underline"
              prefetch={false}
            >
              <UserPlusIcon className="h-4 w-4" />
              Sign Up
            </Link>
            <Link
              href="#"
              className="m-3 inline-flex items-center gap-2 hover:underline"
              prefetch={false}
            >
              <LogInIcon className="h-4 w-4" />
              Log In
            </Link>
            <Link
              href="#"
              className="m-3 inline-flex items-center gap-2 hover:underline"
              prefetch={false}
            >
              <RocketIcon className="h-4 w-4" />
              Key Features
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center text-xs">
        <p>Lorem ipsum</p>
        <p>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          |{" "}
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

function LogInIcon(props) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function RocketIcon(props) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function UserPlusIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}
