import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Datos de ejemplo - En una implementación real, estos vendrían de Supabase
const mockReservations = [
  {
    id: 1,
    date: new Date(2024, 2, 15, 14, 0),
    consultingRoom: "Consultorio 1",
    cost: 50000,
    profesionalName: "Dr. Juan Pérez",
  },
  {
    id: 2,
    date: new Date(2024, 2, 16, 15, 30),
    consultingRoom: "Consultorio 3",
    cost: 45000,
    profesionalName: "Dra. María González",
  },
  // Agrega más datos de ejemplo según sea necesario
];

const ReservationHistory = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reservations, setReservations] = useState(mockReservations);

  console.log("Selected date:", date);
  console.log("Current reservations:", reservations);

  const filteredReservations = date
    ? reservations.filter(
        (reservation) =>
          reservation.date.getMonth() === date.getMonth() &&
          reservation.date.getFullYear() === date.getFullYear()
      )
    : reservations;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Historial de Reservas
        </h1>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "MMMM yyyy", { locale: es })
              ) : (
                <span>Seleccione un mes</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              locale={es}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Table>
        <TableCaption>Listado de reservas realizadas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Consultorio</TableHead>
            <TableHead>Profesional</TableHead>
            <TableHead className="text-right">Costo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>
                {format(reservation.date, "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                {format(reservation.date, "HH:mm")}
              </TableCell>
              <TableCell>{reservation.consultingRoom}</TableCell>
              <TableCell>{reservation.profesionalName}</TableCell>
              <TableCell className="text-right">
                ${reservation.cost.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationHistory;