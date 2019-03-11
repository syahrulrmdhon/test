import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNoQuestions, handleChange } from './../../../redux-modules/modules/no-question'


class GiveScore extends Component {
    render() {
        const { score, aliasName } = this.props.questionItem
        return (
            <div>
                <div className='col-sm-6'>
                    <label className='disblock padding-bottom-2 subject-title'>Mata Pelajaran</label>
                    <input className='input-question' type='text' placeholder={aliasName} readOnly></input>
                </div>
                <div className='col-sm-6 margin-bottom-4'>
                    <label className='disblock padding-bottom-2 subject-title'>Nilai</label>
                    <input
                        key={Math.random()}
                        className='input-question'
                        name='nilai'
                        defaultValue={score ? score : ''}
                        type='number'
                        onChange={(e) => this.props.handleChange(e.target.value, this.props.i, 'score')}
                        placeholder='Masukkan Nilai...'
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, props) => ({
    questionItem: state.noQuestion.data.no_questions[props.i]
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleChange
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(GiveScore)