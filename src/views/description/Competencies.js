import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getCompetencies } from "./../../redux-modules/modules/description"
import Competence from "./Competence"

const competencies = props => {
  return props.competencies.map((competence) => {
    return (
      <Competence
        key={competence.id}
        competenceNumber={competence.comp_number}
        competenceName={competence.content}
        predicate={competence.average_score.predicate} />
      )
  })
}

const mapStateToProps = state => ({
  competencies: state.description && state.description.basic_comps
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCompetencies
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(competencies);
