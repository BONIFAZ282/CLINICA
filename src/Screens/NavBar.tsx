import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faToolbox,
  IconDefinition,
  faUser,
  faUserCog,
  faUserShield,
  faUserNurse, faMoneyCheckAlt, faClipboardList,
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
            icon={faUserNurse} // Cambié faGavel por faUserNurse
          />
          <ItemSubCategory
            link="/mantenimiento/procedimientos"
            title="Procedimiento"
            icon={faClipboardList} // Cambié faGavel por faClipboardList
          />
          <ItemSubCategory
            link="/mantenimiento/mpagos"
            title="Metodo de Pago"
            icon={faMoneyCheckAlt} // Cambié faGavel por faMoneyCheckAlt
          />
          <ItemSubCategory
            link="/mantenimiento/consultas"
            title="Consultas"
            icon={faClipboardList} // Cambié faGavel por faClipboardList
          />
        </ Collapse>
      </>
      }
      <Divider />
    </>
  );
}

export default Navbar;