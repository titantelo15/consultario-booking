import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import ReservationDialog from '@/components/ReservationDialog';

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
  profesionalName: string;
  frequency: 'eventual' | 'quincenal' | 'semanal';
}

interface SelectedSlot {
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
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [profesionalName, setProfesionalName] = useState('');
  const [frequency, setFrequency] = useState<'eventual' | 'quincenal' | 'semanal'>('eventual');

  const handleSelectSlot = (slotInfo: any) => {
    console.log('Selected slot:', slotInfo);
    
    if (selectedSlot && 
        selectedSlot.start.getTime() === slotInfo.slots[0].getTime() &&
        selectedSlot.end.getTime() === slotInfo.slots[1].getTime() &&
        selectedSlot.resourceId === slotInfo.resourceId) {
      setShowReservationDialog(true);
    } else {
      setSelectedSlot({
        start: slotInfo.slots[0],
        end: slotInfo.slots[1],
        resourceId: slotInfo.resourceId,
      });
      setShowReservationDialog(false);
    }
  };

  const handleCreateReservation = () => {
    if (!selectedSlot || !profesionalName) return;

    const newEvent: Event = {
      id: Math.random().toString(),
      title: `Reserva - ${profesionalName}`,
      start: selectedSlot.start,
      end: selectedSlot.end,
      resourceId: selectedSlot.resourceId,
      profesionalName,
      frequency,
    };

    setEvents([...events, newEvent]);
    setShowReservationDialog(false);
    setProfesionalName('');
    setFrequency('eventual');
    setSelectedSlot(null);
  };

  const components = {
    timeSlotWrapper: (props: any) => {
      const isSelected = selectedSlot && 
        props.value.getTime() === selectedSlot.start.getTime() &&
        props.resource?.id === selectedSlot.resourceId;

      return (
        <div
          className={`relative h-full ${
            isSelected ? 'bg-medical-green/20' : ''
          }`}
        >
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Plus className="w-6 h-6 text-medical-green" />
            </div>
          )}
          {props.children}
        </div>
      );
    },
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
          timeslots={1}
          views={['day']}
          defaultView={Views.DAY}
          resources={resources}
          resourceIdAccessor="id"
          resourceTitleAccessor="title"
          selectable
          onSelectSlot={handleSelectSlot}
          min={new Date(2024, 1, 1, 7, 0, 0)}
          max={new Date(2024, 1, 1, 22, 0, 0)}
          defaultDate={new Date()}
          components={components}
        />
      </div>

      <ReservationDialog
        open={showReservationDialog}
        onOpenChange={setShowReservationDialog}
        selectedSlot={selectedSlot}
        profesionalName={profesionalName}
        setProfesionalName={setProfesionalName}
        frequency={frequency}
        setFrequency={setFrequency}
        onConfirm={handleCreateReservation}
      />
    </div>
  );
};

export default DailyView;