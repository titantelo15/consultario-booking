import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export interface Reservation {
  id: string;
  title: string;
  start: Date;
  end: Date;
  consultingRoom: number;
  resourceId: number;
}

export interface ConsultingRoom {
  id: number;
  title: string;
}

const consultingRooms: ConsultingRoom[] = [
  { id: 1, title: 'Consultorio 1' },
  { id: 2, title: 'Consultorio 2' },
  { id: 3, title: 'Consultorio 3' },
  { id: 4, title: 'Consultorio 4' },
  { id: 5, title: 'Consultorio 5' },
];

const ConsultingRoomCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleSelectSlot = (slotInfo: any) => {
    setSelectedSlot(slotInfo);
    setShowReservationDialog(true);
  };

  const handleCreateReservation = () => {
    if (!selectedSlot) return;

    const newReservation: Reservation = {
      id: Math.random().toString(),
      title: 'Nueva Reserva',
      start: selectedSlot.start,
      end: selectedSlot.end,
      consultingRoom: selectedSlot.resourceId,
      resourceId: selectedSlot.resourceId,
    };

    setReservations([...reservations, newReservation]);
    setShowReservationDialog(false);
  };

  const filteredReservations = selectedRoom && selectedRoom !== 'all'
    ? reservations.filter(res => res.consultingRoom === parseInt(selectedRoom))
    : reservations;

  return (
    <div className="space-y-4">
      <div className="w-full max-w-xs">
        <Select
          value={selectedRoom || 'all'}
          onValueChange={(value) => setSelectedRoom(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar consultorio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los consultorios</SelectItem>
            {consultingRooms.map((room) => (
              <SelectItem key={room.id} value={room.id.toString()}>
                {room.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-[800px]">
        <Calendar
          localizer={localizer}
          events={filteredReservations}
          step={60}
          views={['day', 'work_week']}
          defaultView={Views.WORK_WEEK}
          selectable
          onSelectSlot={handleSelectSlot}
          min={new Date(2024, 1, 1, 8, 0, 0)}
          max={new Date(2024, 1, 1, 20, 0, 0)}
          className="rounded-lg shadow-lg bg-white"
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

export default ConsultingRoomCalendar;