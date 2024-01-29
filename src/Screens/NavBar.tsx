import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faToolbox,
  faEarthAfrica,
  IconDefinition,
  faMapLocationDot,
  faPeopleRoof,
  faTrowelBricks,
  faBuildingColumns,
  faEnvelopesBulk,
  faPowerOff,
  faCopyright,
  faCube,
  faMicrochip,
  faHeart,
  faUsers,        // Icono para "Area"
  faBriefcase,    // Icono para "Cargo"
  faLayerGroup,   // Icono para "Provincia"
  faGlobeAfrica,  // Icono para "Distrito" (cambié a un ícono de globo terráqueo)
  faMapMarkerAlt, // Icono para "Sede" (cambié a un ícono de marcador de mapa)
  faBuilding,     // Icono para "SubArea"
  faLaptop,       // Icono para "Regimen Laboral"
  faTools,        // Icono para "Condición" (cambié a un ícono de herramientas)
  faUser,         // Icono para "Persona" (cambié a un ícono de usuario)
  faUserCog,      // Icono para "Usuario" (cambié a un ícono de usuario con engranaje)
  faUserShield,
  faHardHat,
  faGavel
} from "@fortawesome/free-solid-svg-icons";
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { folderDefault } from "../config";
import { allowPermission } from "../Tools/Auth";
import { useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/es';


const ItemCategory:
  React.FC<{ title: string, setItem: () => any, icon: IconDefinition, open: boolean }> =
  ({ title, setItem, icon, open }) => {
    return (
      <Tooltip title={title} placement="right">
        <ListItemButton onClick={setItem}>
          <ListItemIcon>
            <FontAwesomeIcon icon={icon} size="xl" />
          </ListItemIcon>
          <ListItemText primary={title} />
          {open ?
            <FontAwesomeIcon icon={faChevronUp} size="sm" /> :
            <FontAwesomeIcon icon={faChevronDown} size="sm" />}
        </ListItemButton>
      </Tooltip>
    )
  }

const ItemSubCategory:
  React.FC<{ link: string, title: string, icon: IconDefinition }> =
  ({ link, title, icon }) => {
    return (
      <Tooltip title={title} placement="right">
        <NavLink to={`${folderDefault}${link}`}
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{ textDecoration: 'none', color: "#707070" }}>
          <List component="div" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FontAwesomeIcon icon={icon} size="1x" />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </List>
        </NavLink>
      </Tooltip >)
  }


function Navbar() {
  const [isCatMantenimiento, setIsCatMantenimiento] = useState(false);

  dayjs.locale('es');

  return (
    <>
      {/* Mantenimiento */}
      {allowPermission(["ADMINISTRADOR"]) && <>
        <ItemCategory
          title="Mantenimiento"
          setItem={() => setIsCatMantenimiento(!isCatMantenimiento)}
          icon={faToolbox}
          open={isCatMantenimiento}
        />
        <Collapse in={isCatMantenimiento} timeout="auto" unmountOnExit>

          <ItemSubCategory
            link="/mantenimiento/usuarios"
            title="Usuario"
            icon={faUserCog}
          />
          <ItemSubCategory
            link="/mantenimiento/privilegios"
            title="Privilegios"
            icon={faUserShield}
          />
          <ItemSubCategory
            link="/mantenimiento/cliente"
            title="Cliente"
            icon={faUser}
          />
          <ItemSubCategory
            link="/mantenimiento/trabajadores"
            title="Trabajador"
            icon={faGavel} // Puedes cambiar faHardHat por otro ícono que prefieras
          />
          <ItemSubCategory
            link="/mantenimiento/procedimientos"
            title="Procedimiento"
            icon={faGavel} // Puedes cambiar faHardHat por otro ícono que prefieras
          />
          <ItemSubCategory
            link="/mantenimiento/mpagos"
            title="Metodo de Pago"
            icon={faGavel} // Puedes cambiar faHardHat por otro ícono que prefieras
          />
          <ItemSubCategory
            link="/mantenimiento/consultas"
            title="Consultas"
            icon={faGavel} // Puedes cambiar faHardHat por otro ícono que prefieras
          />
        </ Collapse>
      </>
      }
      <Divider />
    </>
  );
}

export default Navbar;