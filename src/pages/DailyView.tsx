import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';

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
    
    // Si ya hay un slot seleccionado y es el mismo, abrimos el modal
    if (selectedSlot && 
        selectedSlot.start.getTime() === slotInfo.start.getTime() &&
        selectedSlot.end.getTime() === slotInfo.end.getTime() &&
        selectedSlot.resourceId === slotInfo.resourceId) {
      setShowReservationDialog(true);
    } else {
      // Si es un slot diferente o no hay selección, lo seleccionamos
      setSelectedSlot({
        start: slotInfo.start,
        end: slotInfo.end,
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

  // Componente personalizado para renderizar las celdas
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

      <Dialog open={showReservationDialog} onOpenChange={setShowReservationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Reserva</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profesionalName">Nombre del Profesional</Label>
              <Input
                id="profesionalName"
                value={profesionalName}
                onChange={(e) => setProfesionalName(e.target.value)}
                placeholder="Ingrese el nombre del profesional"
              />
            </div>

            <div className="space-y-2">
              <Label>Frecuencia de la Reserva</Label>
              <RadioGroup value={frequency} onValueChange={(value: 'eventual' | 'quincenal' | 'semanal') => setFrequency(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="eventual" id="eventual" />
                  <Label htmlFor="eventual">Eventual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quincenal" id="quincenal" />
                  <Label htmlFor="quincenal">Quincenal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="semanal" id="semanal" />
                  <Label htmlFor="semanal">Semanal</Label>
                </div>
              </RadioGroup>
            </div>

            <p className="text-sm text-gray-600">
              Consultorio {selectedSlot?.resourceId} - Horario:{' '}
              {selectedSlot?.start && format(selectedSlot.start, 'HH:mm')} hasta{' '}
              {selectedSlot?.end && format(selectedSlot.end, 'HH:mm')}
            </p>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setShowReservationDialog(false);
                setSelectedSlot(null);
              }}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateReservation}
                disabled={!profesionalName}
              >
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