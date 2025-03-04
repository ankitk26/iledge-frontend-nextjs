import { getCategories } from "@/queries/get-categories";
import { getReceivers } from "@/queries/get-receivers";
import ReceiverItem from "./receiver-item";

export default async function AdminPage() {
  const [receivers, categories] = await Promise.all([
    getReceivers(),
    getCategories(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin page</h1>
      <section className="flex flex-col mt-4 gap-8">
        {receivers.map((receiver) => (
          <ReceiverItem
            key={receiver.id}
            receiver={receiver}
            categories={categories}
          />
        ))}
      </section>
    </div>
  );
}
