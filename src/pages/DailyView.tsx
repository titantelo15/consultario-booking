import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Resource {
  id: number;
  title: string;
}

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
}

const resources: Resource[] = [
  { id: 1, title: 'Consultorio 1' },
  { id: 2, title: 'Consultorio 2' },
  { id: 3, title: 'Consultorio 3' },
  { id: 4, title: 'Consultorio 4' },
  { id: 5, title: 'Consultorio 5' },
];

const DailyView = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const handleSelectSlot = (slotInfo: any) => {
    console.log('Selected slot:', slotInfo);
    setSelectedSlot(slotInfo);
    setShowReservationDialog(true);
  };

  const handleCreateReservation = () => {
    if (!selectedSlot) return;

    const newEvent: Event = {
      id: Math.random().toString(),
      title: 'Nueva Reserva',
      start: selectedSlot.start,
      end: selectedSlot.end,
      resourceId: selectedSlot.resourceId,
    };

    setEvents([...events, newEvent]);
    setShowReservationDialog(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Vista Diaria de Consultorios
      </h1>
      
      <div className="h-[800px] bg-white rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={events}
          step={60}
          views={['day']}
          defaultView={Views.DAY}
          resources={resources}
          resourceIdAccessor="id"
          resourceTitleAccessor="title"
          selectable
          onSelectSlot={handleSelectSlot}
          min={new Date(2024, 1, 1, 8, 0, 0)}
          max={new Date(2024, 1, 1, 20, 0, 0)}
          defaultDate={new Date()}
        />
      </div>

      <Dialog open={showReservationDialog} onOpenChange={setShowReservationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Reserva</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="mb-4">
              ¿Desea reservar el consultorio {selectedSlot?.resourceId} desde{' '}
              {selectedSlot?.start && format(selectedSlot.start, 'HH:mm')} hasta{' '}
              {selectedSlot?.end && format(selectedSlot.end, 'HH:mm')}?
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowReservationDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateReservation}>
                Confirmar Reserva
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyView;