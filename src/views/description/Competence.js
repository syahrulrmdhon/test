import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getCompetencies } from "./../../redux-modules/modules/description"
import BrokenHeart from './../../assets/images/BROKENHEARTFORHENGKYFROMHENGKY.svg'


const competence = props => {
  let predicate = props.predicate
  let predicateLabel = ''
  let indicator = 'heart'

  switch(predicate) {
    case 'A':
      predicateLabel = 'Sangat Baik'
      break
    case 'B':
      predicateLabel = 'Baik'
      break
    case 'C':
      predicateLabel = 'Cukup'
      indicator = 'broken-heart'
      break
    case 'D':
      predicateLabel = 'Kurang'
      indicator = 'broken-heart'
      break
    default:
      break
  }

  return (
    <div key={props.key} className="score-description__basic-competence">
      <div className="score-description__competence-number">
        {props.competenceNumber}
      </div>
      <div className="score-description__competence-name text-justify">
        {props.competenceName}
        <div className="clearfix"></div>
        <div className="score-description__predicate">
        {
          (predicate === 'A' || predicate === 'B') ?
            <i className="fa fas fa-heart heart"></i>
          : (predicate === 'C' || predicate === 'D') ?
            <img src={BrokenHeart} alt="" />
          : false
         }
         <span className={indicator + " ml-1"}> {predicateLabel}</span>
         </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  competencies: state.description && state.description.basic_comps
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCompetencies
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(competence);
