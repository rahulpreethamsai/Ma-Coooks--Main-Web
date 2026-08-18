import Link from 'next/link';

export const metadata = {
  title: "Page Not Found | RuchiRush",
  description: "The page you are looking for does not exist. Explore home-cooked meal subscriptions in Hyderabad with RuchiRush.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-radial-gradient(circle at center, rgba(255, 253, 250, 0.75) 0%, rgba(253, 245, 237, 0.9) 100%)">
      <div className="max-w-md w-full bg-white border border-stone-200 rounded-3xl p-8 shadow-xl space-y-6">
        <span className="text-6xl block">🍲</span>
        <h1 className="font-h1 text-4xl font-bold text-primary font-['Newsreader']">Page Not Found</h1>
        <p className="text-sm text-stone-600 leading-relaxed font-body-md">
          We couldn&apos;t find the page you were looking for. Let&apos;s get you back to discovering fresh home kitchens in Hyderabad.
        </p>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-primary text-white py-3 rounded-full font-bold text-xs hover:scale-[1.02] active:scale-95 transition-transform shadow-md"
          >
            Back to RuchiRush Home
          </Link>

          <div className="pt-4 border-t border-stone-100 text-xs text-stone-500 space-y-2">
            <p className="font-semibold text-stone-700 uppercase tracking-wider text-[10px]">Popular Hyderabad Corridors</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/home-food-gachibowli" className="underline hover:text-primary">Gachibowli</Link>
              <span>•</span>
              <Link href="/home-food-kondapur" className="underline hover:text-primary">Kondapur</Link>
              <span>•</span>
              <Link href="/home-food-madhapur" className="underline hover:text-primary">Madhapur</Link>
              <span>•</span>
              <Link href="/home-food-hi-tech-city" className="underline hover:text-primary">Hi-Tech City</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
