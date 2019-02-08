import React, { Component } from "react";
import "./../../styles/rapor.css";
import "./../../styles/global/component.css";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import Header from "../global/header";
import FilterRapor from "./filter";
import TablePengetahuan from "./table-pengetahuan";
import TableKeterampilan from "./table-keterampilan";
import TableSikap from "./table-sikap";
import { apiClient } from "../../utils/apiClient";
import { NotAvailable } from "../../views/global/notAvailable";

export default class Rapor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      listStatus: [],
      selectedStatus: "",
      listSemester: [],
      selectedSemester: "",
      tableKnowledge: [],
      tableSkill: [],
      tableAttitude: [],
      idxScoreK: 0,
      subjectName: "",
      nameClass: "",
      dTableKnowledge: [],
      dTableSkill: [],
      dTableAttitude: [],
      semesterActive: ""
    };
    this.toggle = this.toggle.bind(this);
    this.getSemesterList = this.getSemesterList.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.getStatusList = this.getStatusList.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nameClicked = this.nameClicked.bind(this);
    this.getActiveSemester = this.getActiveSemester.bind(this);
  }
  componentDidMount() {
    this.notKnowledge();
    this.getSemesterList();
    this.getStatusList();
    this.getClassName();
    this.getActiveSemester();
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  getActiveSemester() {
    const periodObject = localStorage.getItem("current_period");
    const periodParse = JSON.parse(periodObject);
    const activeSemester = periodParse.period_name;
    this.state.semesterActive = activeSemester;
    this.getMountData();
  }
  getClassName() {
    const classList = localStorage.getItem("homeroom_class");
    const classes = JSON.parse(classList);
    const nameClass = classes.name;
    this.setState({
      nameClass: nameClass
    });
  }
  getSemesterList() {
    const url = `v1/filters/semesters`;
    apiClient("get", url).then(res => {
      let semester = [];
      for (var i in res.data.data) {
        const datum = res.data.data[i];
        datum.map(function(data, i) {
          semester.push({ value: data.id, label: data.period_name });
        });
      }
      this.setState({
        listSemester: semester
      });
    });
  }
  onChangeSemester(selectedSemester) {
    this.setState({ selectedSemester });
  }
  getStatusList() {
    const url = `v1/filters/risk_status`;
    apiClient("get", url).then(res => {
      let status = [];
      for (var i in res.data.data) {
        const datum = res.data.data[i];
        datum.map(function(data, i) {
          status.push({ value: data.key, label: data.value });
        });
      }
      this.setState({
        listStatus: status
      });
    });
  }
  onChangeStatus(selectedStatus) {
    this.setState({ selectedStatus });
  }
  getKnowledge() {
    let url = `v1/scores/report?semester=${
      this.state.selectedSemester.label
    }&category=knowledge&class_id=${localStorage.getItem(
      "class_id"
    )}&risk_status=${this.state.selectedStatus.value}`;
    return apiClient("get", url);
  }
  getMountKnowledge() {
    let url = `v1/scores/report?semester=${
      this.state.semesterActive
    }&category=knowledge&class_id=${localStorage.getItem(
      "class_id"
    )}&risk_status=all`;
    return apiClient("get", url);
  }
  notKnowledge() {
    if (!this.state.tableKnowledge) {
      return "";
    } else {
      return "Data belum tersedia.";
    }
  }
  getSkill() {
    let url = `v1/scores/report?semester=${
      this.state.selectedSemester.label
    }&category=skill&class_id=${localStorage.getItem("class_id")}&risk_status=${
      this.state.selectedStatus.value
    }`;
    return apiClient("get", url);
  }
  getMountSkill() {
    let url = `v1/scores/report?semester=${
      this.state.semesterActive
    }&category=skill&class_id=${localStorage.getItem(
      "class_id"
    )}&risk_status=all`;
    return apiClient("get", url);
  }
  getAttitude() {
    let url = `v1/scores/report?semester=${
      this.state.selectedSemester.label
    }&category=attitude&class_id=${localStorage.getItem(
      "class_id"
    )}&risk_status=${this.state.selectedStatus.value}`;
    return apiClient("get", url);
  }
  getMountAttitude() {
    let url = `v1/scores/report?semester=${
      this.state.semesterActive
    }&category=attitude&class_id=${localStorage.getItem(
      "class_id"
    )}&risk_status=all`;
    return apiClient("get", url);
  }
  getMountData() {
    let tableKnowledge = [];
    let tableAttitude = [];
    let tableSkill = [];
    this.getMountKnowledge().then(res => {
      tableKnowledge = res.data.data.users;
      const iTableKnowledge = tableKnowledge[0];
      this.getMountAttitude().then(attitudes => {
        tableAttitude = attitudes.data.data.users;
        const iTableAttitude = tableAttitude[0];
        this.getMountSkill().then(skills => {
          tableSkill = skills.data.data.users;
          const iTableSkill = tableSkill[0];
          this.setState({
            tableKnowledge: tableKnowledge,
            tableAttitude: tableAttitude,
            tableSkill: tableSkill,
            dTableKnowledge: iTableKnowledge,
            dTableAttitude: iTableAttitude,
            dTableSkill: iTableSkill
          });
        });
      });
    });
  }
  handleSubmit() {
    let tableKnowledge = [];
    let tableAttitude = [];
    let tableSkill = [];
    this.getKnowledge().then(res => {
      tableKnowledge = res.data.data.users;
      const iTableKnowledge = tableKnowledge[0];
      this.getAttitude().then(attitudes => {
        tableAttitude = attitudes.data.data.users;
        const iTableAttitude = tableAttitude[0];
        this.getSkill().then(skills => {
          tableSkill = skills.data.data.users;
          const iTableSkill = tableSkill[0];
          this.setState({
            tableKnowledge: tableKnowledge,
            tableAttitude: tableAttitude,
            tableSkill: tableSkill,
            dTableKnowledge: iTableKnowledge,
            dTableAttitude: iTableAttitude,
            dTableSkill: iTableSkill
          });
        });
      });
    });
  }
  nameClicked(e, id) {
    e.preventDefault();
    this.props.history.push("detail/" + id);
  }
  render() {
    return (
      <div className="padding-content">
        <Header />
        <div className="content">
          <div className="row row-rapor">
            <div className="left-content col-2">
              <FilterRapor
                listSemester={this.state.listSemester}
                selectedSemester={this.state.selectedSemester}
                onChangeSemester={this.onChangeSemester}
                listStatus={this.state.listStatus}
                selectedStatus={this.state.selectedStatus}
                onChangeStatus={this.onChangeStatus}
                handleSubmit={this.handleSubmit}
                handlePrint={this.handlePrint}
              />
            </div>
            <div className="right-content col-10">
              <div className="row margin-bottom-4">
                <div className="col-4">
                  <h5 className="float-left margin-left-1 padding-top-1">
                    <strong className="large-text">
                      Rapor Kelas {this.state.nameClass}
                    </strong>
                  </h5>
                </div>
                <div className="col-8">
                  <span className="float-right margin-right-1">
                    <Nav tabs className="toggle border-0 pull-right">
                      <NavItem className="tab-nilai">
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "1"
                          })}
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          Pengetahuan
                        </NavLink>
                      </NavItem>
                      <NavItem className="tab-nilai">
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "2"
                          })}
                          onClick={() => {
                            this.toggle("2");
                          }}
                        >
                          Keterampilan
                        </NavLink>
                      </NavItem>
                      <NavItem className="tab-nilai">
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "3"
                          })}
                          onClick={() => {
                            this.toggle("3");
                          }}
                        >
                          Sikap
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </span>
                </div>
              </div>
              <TabContent
                activeTab={this.state.activeTab}
                className="margin-left-1 margin-right-1"
              >
                <TabPane tabId="1">
                  {!this.state.tableKnowledge ||
                  this.state.tableKnowledge.length === 0 ? (
                    <NotAvailable>{this.notKnowledge()}</NotAvailable>
                  ) : (
                    <TablePengetahuan
                      tableKnowledge={this.state.tableKnowledge}
                      dTableKnowledge={this.state.dTableKnowledge}
                      nameClicked={this.nameClicked}
                    />
                  )}
                </TabPane>
                <TabPane tabId="2">
                  <TableKeterampilan
                    tableSkill={this.state.tableSkill}
                    dTableSkill={this.state.dTableSkill}
                    nameClicked={this.nameClicked}
                  />
                </TabPane>
                <TabPane tabId="3">
                  <TableSikap
                    tableAttitude={this.state.tableAttitude}
                    dTableAttitude={this.state.dTableAttitude}
                    nameClicked={this.nameClicked}
                  />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
