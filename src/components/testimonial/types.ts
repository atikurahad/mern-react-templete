export interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  company?: string;
  rating: number;
  text: string;
  image: string;
  featured?: boolean;
}
