// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { folderDefault } from "./config";
import NoFound from "./Components/NoFound";
import PrivateRoute from "./Components/PrivateRoute";
import DrawerContent from "./Components/DrawerContent";
import Login from './Screens/Principal/login';
import "./App.sass"


import CrearUsuario from "./Screens/Mantenimiento/CrearUsuario";
import CrearPrivilegio from "./Screens/Mantenimiento/CrearPrivilegio";
import CrearTrabajador from "./Screens/Mantenimiento/CrearTrabajador";
import CrearCliente from "./Screens/Mantenimiento/CrearCliente";
import CrearProcedimiento from "./Screens/Mantenimiento/CrearProcedimiento";
import CrearMetodoPago from "./Screens/Mantenimiento/CrearMetodoPago";
import CrearConsulta from "./Screens/Mantenimiento/CrearConsulta";
import PruebaConsulta from "./Screens/Mantenimiento/PruebaConsulta";


function App() {
  return (
    <div id="App">
      <Routes>
        <Route
          path={`${folderDefault}/`}
          errorElement={<Navigate to={`${folderDefault}/login`} />}
        >
          <Route path={`${folderDefault}/`} element={<Navigate to={`${folderDefault}/login`} />}></Route>

          {/* Login */}
          <Route path={`${folderDefault}/login`} element={<Login />}></Route>

          {/* Mantenimiento */}

          <Route
            path={`${folderDefault}/mantenimiento/cliente`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearCliente />} title="Cliente" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/usuarios`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearUsuario />} title="Usuario" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/privilegios`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearPrivilegio />} title="Privilegio" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/trabajadores`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearTrabajador />} title="Trabajador" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/procedimientos`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearProcedimiento />} title="Procedimiento" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/mpagos`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearMetodoPago />} title="Metodo de Pago" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/consultas`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<PruebaConsulta />} title="Consultas" />} />}
          ></Route>
          <Route path={`${folderDefault}/*`} element={<NoFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;