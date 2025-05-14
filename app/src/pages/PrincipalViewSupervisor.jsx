import React, { useState } from "react";
import SideBoardFloat from "./views/components/SideBoardFloat";
import Footer from "./views/components/Footer";
import TablesMarked from "./views/components/TablesMarked";
import {
  closeLeftSliderWindow,
  LeftSliderWindow,
  openLeftSliderWindow,
} from "./views/components/LeftSliderWindow";
import LeftFloatButtonAcc from "./views/components/LeftFloatButtonAcc";
import OrdersArrivedSupervisor from "./views/components/OrdersArrivedSupervisor";

const sliderArrivedId = "principalViewSupervisor_slider";
const eventModuleID_tableList = "principalViewSupervisor_eventModule_tableList";

function PrincipalViewSupervisor(props) {
  const [tableStyleList, setTableStyleList] = useState([]);

  const openOrdersArrived = () => openLeftSliderWindow(sliderArrivedId);
  const closeOrdersArrived = () => closeLeftSliderWindow(sliderArrivedId);

  const selectTable = (index) => {
    const tableId = props.querys.tables[index]._id;

    props.goToView(false, null, (fun) => {
      props.querys.getOneTableBySupervisor(tableId, () => {
        fun("oneTableSuperVisor");
      });
    });
  };

  props.querys.workersListening.setEventModule(
    eventModuleID_tableList,
    (orderList) => {
      const newTableStyles = [];
      const idUpdated = [...new Set(orderList.map((order) => order.table))];

      idUpdated.forEach((id) => {
        newTableStyles[id] = { background: "var(--second_back)" };
      });

      setTableStyleList(newTableStyles);
    }
  );

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />

      <LeftSliderWindow id={sliderArrivedId}>
        <OrdersArrivedSupervisor
          querys={props.querys}
          goToView={props.goToView}
          closeOrdersArrived={closeOrdersArrived}
        />
      </LeftSliderWindow>

      <LeftFloatButtonAcc onClick={openOrdersArrived} />

      <h1 className="flexRowCenter infoGeneral_details">Mesas</h1>
      <TablesMarked
        styleList={tableStyleList}
        tableList={props.querys.tables}
        onClick={selectTable}
      />

      <Footer />
    </div>
  );
}

export default PrincipalViewSupervisor;
