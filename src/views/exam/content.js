import React, {Component} from 'react';

class Content extends Component {
  render() {
    return (
      <div className="margin-top-6 margin-left-3 margin-right-6">
        <div className="row">
          <div className="col-sm-6">
            <label className="header-title">Daftar git Tugas</label>
          </div>
          <div className="col-sm-6">
            <div className="float-right">
              <a href="javascript:void(0);" className="submit-btn default">Tambah Topik</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;