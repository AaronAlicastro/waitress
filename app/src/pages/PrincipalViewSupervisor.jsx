import React from "react";
import SideBoardFloat from "./views/components/SideBoardFloat";
import Footer from "./views/components/Footer";
import TablesMarked from "./views/components/TablesMarked";
import {
  closeLeftSliderWindow,
  LeftSliderWindow,
  openLeftSliderWindow,
} from "./views/components/LeftSliderWindow";
import LeftFloatButtonAcc from "./views/components/LeftFloatButtonAcc";

const sliderArrivedId = "principalViewSupervisor_slider";

function PrincipalViewSupervisor(props) {
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

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />

      <LeftSliderWindow id={sliderArrivedId}>
        <h1>Llegadas</h1>
        <button onClick={closeOrdersArrived}>Cerrar</button>
      </LeftSliderWindow>

      <LeftFloatButtonAcc onClick={openOrdersArrived} />

      <h1 className="flexRowCenter infoGeneral_details">Mesas</h1>
      <TablesMarked tableList={props.querys.tables} onClick={selectTable} />

      <Footer />
    </div>
  );
}

export default PrincipalViewSupervisor;
