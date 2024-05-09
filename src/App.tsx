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
import CrearCategoria from "./Screens/Mantenimiento/CrearCategoria";
import CrearTipoVehiculo from "./Screens/Mantenimiento/CrearTipoVehiculo";
import CrearSeguridad from "./Screens/Mantenimiento/CrearSeguridad";

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
            path={`${folderDefault}/mantenimiento/usuarios`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearUsuario />} title="Usuario" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/privilegios`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearPrivilegio />} title="Categoria" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/categorias`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearCategoria />} title="Privilegio" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/tipoVehiculo`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearTipoVehiculo />} title="Privilegio" />} />}
          ></Route>
          <Route
            path={`${folderDefault}/mantenimiento/seguridad`}
            element={<PrivateRoute onlyAdmin={true} element={<DrawerContent element={<CrearSeguridad />} title="Privilegio" />} />}
          ></Route>
          <Route path={`${folderDefault}/*`} element={<NoFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;