import {
  CalendarOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  WalletFilled,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import IconPlus from "../../../../icons/IconPlus";

export const ButtonCreateProp = ({ dataProps, sendProps }) => {
  const [properties, setProperties] = useState(dataProps);
  const items = [
    {
      key: "1",
      icon: <MenuUnfoldOutlined style={{ color: "#fff" }} />,
      danger: false,
      label: (
        <button rel="noopener noreferrer" style={{ color: "#fff" }}>
          Texto
        </button>
      ),
    },
    //     {
    //       type: "divider",
    //     },
    {
      key: "2",
      icon: <CalendarOutlined style={{ color: "#fff" }} />,
      label: (
        <button className="button-color" style={{ color: "#fff" }}>
          Fecha
        </button>
      ),
      disabled: false,
    },
    {
      key: "3",
      icon: <OrderedListOutlined style={{ color: "#fff" }} />,
      label: (
        <button className="button-color" style={{ color: "#fff" }}>
          Lista desplegable
        </button>
      ),
      disabled: false,
    },
    {
      key: "4",
      icon: <UnorderedListOutlined style={{ color: "#fff" }} />,
      label: (
        <button className="button-color" style={{ color: "#fff" }}>
          Lista Multiseleccion
        </button>
      ),
      disabled: false,
    },
  ];

  const createProperty = (option) => {
    const newProperty = [...properties];

    const create = (type) => {
      newProperty.push({
        id: (properties.length + 1).toString(),
        type: type,
        title: "Titulo",
        value: "",
      });
    };

    switch (option) {
      case "1":
        create("text");
        break;
      case "2":
        create("date");
        break;
      case "3":
        create("list");
        break;
      case "4":
        create("multilist");
        break;
    }
    setProperties(newProperty);
    sendProps(newProperty);
  };

  useEffect(() => {
    setProperties(dataProps);
  }, [dataProps]);

  return (
    <Dropdown
      menu={{
        items,
        onClick: (e) => {
          createProperty(e.key);
        },
      }}
      trigger={["click"]}
      overlayClassName="dropdown-content"
      placement="bottom"
    >
      <button className="panel__create-prop">
        <IconPlus /> Agregar Propiedad
      </button>
    </Dropdown>
  );
};
