import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-blue/5 to-medical-green/5">
      <div className="w-full max-w-md p-4">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Bienvenido</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="ejemplo@correo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">Iniciar sesión</Button>
            <div className="text-sm text-center text-gray-500">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-medical-blue hover:underline">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}