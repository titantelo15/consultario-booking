import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSlot: {
    start: Date;
    end: Date;
    resourceId: number;
  } | null;
  profesionalName: string;
  setProfesionalName: (name: string) => void;
  frequency: 'eventual' | 'quincenal' | 'semanal';
  setFrequency: (frequency: 'eventual' | 'quincenal' | 'semanal') => void;
  onConfirm: () => void;
}

const ReservationDialog = ({
  open,
  onOpenChange,
  selectedSlot,
  profesionalName,
  setProfesionalName,
  frequency,
  setFrequency,
  onConfirm
}: ReservationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            {selectedSlot?.start && format(selectedSlot.start, 'HH:mm', { locale: es })} hasta{' '}
            {selectedSlot?.end && format(selectedSlot.end, 'HH:mm', { locale: es })}
          </p>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={onConfirm}
              disabled={!profesionalName}
            >
              Confirmar Reserva
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;