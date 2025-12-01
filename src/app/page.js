import Cake3D from "./components/Cake3D";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">تولدت مبارک بابا 🎉</h1>

      <Cake3D />

      <p className="mt-6 opacity-70 text-lg">
        برای شروع، لطفاً چند ثانیه صبر کنید...
      </p>
    </main>
  );
}
