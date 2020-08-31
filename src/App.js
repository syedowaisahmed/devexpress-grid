import React from "react";
import { generateData } from "./data.js";
import DetailTemplate from "./DetailTemplate.js";

import DataGrid, {
  Scrolling,
  Sorting,
  LoadPanel,
  GroupPanel,
  SearchPanel,
  Grouping,
  Paging,
  HeaderFilter,
  FilterRow,
  Editing,
  Column,
  Summary,
  TotalItem,
  GroupItem,
  Export,
  MasterDetail
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
const dataSource = generateData(100000);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.applyFilterTypes = [
      {
        key: "auto",
        name: "Immediately",
      },
      {
        key: "onClick",
        name: "On Button Click",
      },
    ];
    this.state = {
      loadPanelEnabled: true,
      showHeaderFilter: true,
      showFilterRow: true,
      currentFilter: this.applyFilterTypes[0].key,
    };
    this.onContentReady = this.onContentReady.bind(this);
  }

  render() {
    return (
      <DataGrid
        elementAttr={{
          id: "gridContainer",
        }}
        allowColumnReordering={true}
        dataSource={dataSource}
        showBorders={true}
        customizeColumns={this.customizeColumns}
        onContentReady={this.onContentReady}
        keyExpr="id"
      >
        <Sorting mode="single" />
        <Scrolling mode="virtual" />
        <LoadPanel enabled={this.state.loadPanelEnabled} />
        <GroupPanel visible={true} />
        <SearchPanel visible={true} />
        <Grouping autoExpandAll={this.state.autoExpandAll} />
        <Paging defaultPageSize={15} />
        <FilterRow
          visible={this.state.showFilterRow}
          applyFilter={this.state.currentFilter}
        />
        <HeaderFilter visible={this.state.showHeaderFilter} />
        <Editing mode="form" allowUpdating={true} />
        <Summary>
          <TotalItem column="Salary" summaryType="sum" valueFormat="currency" />
          <TotalItem column="birthDate" summaryType="count" />
          <GroupItem
            column="id"
            summaryType="count"
            displayFormat={"{0} employees"}
          />
        </Summary>
        <Export enabled={true} allowExportSelectedData={true} />
        <Column dataField="id" dataType="number"></Column>
        <Column dataField="firstName" dataType="string"></Column>
        <Column dataField="lastName" dataType="string"></Column>
        <Column dataField="gender" dataType="string"></Column>
        <Column dataField="birthDate" dataType="date"></Column>
        <Column dataField="state" dataType="string" groupIndex={0}></Column>
        <Column dataField="salary" dataType="number"></Column>

        <MasterDetail
          enabled={true}
          component={DetailTemplate}
        />
      </DataGrid>
    );
  }

  customizeColumns(columns) {
    columns[0].width = 50;
  }

  onContentReady() {
    this.setState({
      loadPanelEnabled: false,
    });
  }
}

export default App;
