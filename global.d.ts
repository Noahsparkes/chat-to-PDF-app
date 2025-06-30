import { LucideIcon } from "lucide-react"; // Add this line at the top

declare module "daisyui";
declare module "tailwindcss-animate";

// Add these new declarations:
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Fix for radial-progress component
      "radial-progress": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          role?: string;
          "aria-valuenow"?: number;
          "aria-valuemin"?: number;
          "aria-valuemax"?: number;
          "aria-valuetext"?: string;
          "data-value"?: number;
          "data-max"?: number;
          style?: React.CSSProperties & {
            "--value"?: number;
            "--size"?: string;
            "--thickness"?: string;
          };
        },
        HTMLElement
      >;
    }

    interface IntrinsicAttributes {
      'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
    }
  }

  // Fix for Lucide icons type safety
  declare module "lucide-react" {
    export const CircleArrowDown: LucideIcon;
    export const Rocket: LucideIcon; 
    export const Save: LucideIcon;
    export const Hammer: LucideIcon;
  }
}












// // global.d.ts
// import * as React from 'react'; // Add this import

// declare module "daisyui";
// declare module "tailwindcss-animate";

// declare global {
//   // This merges with existing JSX types
//   namespace JSX {
//     // interface Element extends React.ReactElement {} // Removed redundant empty interface
    
//     interface IntrinsicElements {
//       "radial-progress": React.DetailedHTMLProps<
//         React.HTMLAttributes<HTMLElement> & {
//           role?: string;
//           style?: React.CSSProperties & {
//             "--value"?: number;
//             "--size"?: string;
//             "--thickness"?: string;
//           };
//         },
//         HTMLElement
//       >;
//     }

//     interface IntrinsicAttributes {
//       'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
//     }
//   }
// }