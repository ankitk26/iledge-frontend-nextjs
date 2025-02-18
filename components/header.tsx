import Link from "next/link";

export default function Header() {
  return (
    <header className="px-24">
      <div className="flex items-center py-4 justify-between border-b border-b-neutral-800">
        <Link href="/">
          <h1 className="text-2xl font-bold">iLedge</h1>
        </Link>
        <div className="flex text-sm items-center gap-8">
          <Link
            href="/transactions"
            className="hover:underline hover:text-gray-100"
          >
            Transactions
          </Link>
          <Link
            href="/insights"
            className="hover:underline hover:text-gray-100"
          >
            Insights
          </Link>
          <Link href="/admin" className="hover:underline hover:text-gray-100">
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
