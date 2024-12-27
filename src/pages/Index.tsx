import ConsultingRoomCalendar from "@/components/ConsultingRoomCalendar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Gestión de Consultorios</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <ConsultingRoomCalendar />
      </main>
    </div>
  );
};

export default Index;