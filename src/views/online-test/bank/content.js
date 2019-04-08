import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBank, handleEvent} from './../../../redux-modules/modules/bank'
import BankChoices from './choices'
import { NotAvailable } from '../../global/notAvailable';

class BankContent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        this.props.getBank()
    }
    render() {
        const content = []
        let dataQuestions = this.props.dataBank && this.props.dataBank.data && this.props.dataBank.data.questions
        let dataEntries = dataQuestions && dataQuestions.entries || []
        {
            dataEntries && dataEntries.length > 0 ?
                dataEntries.map((x, i) => {
                    content.push(
                        <label className='wrapper' key={i}>
                            <div className='question-wrapper d-flex' >
                                <div className='select-question-wrapper'>
                                    <label htmlFor={x.id}></label>
                                    <input
                                        className="selected-question" type='radio' name='apalah' value='Opsi Question' id={x.id} checked={x.is_selected == true}
                                        onChange={(e) => this.props.handleEvent(e.target.id, 'is_selected')}
                                    />
                                    <div className="check"></div>
                                </div>
                                <div className='number'>{i + 1}.</div>
                                <div className=''>
                                    <div className='kd'>
                                        <span className="competency-number">KD. {x.comp_number ? x.comp_number : '-'}</span> <span className="competency">{x.content ? x.content : '-'}</span>
                                    </div>
                                    <div className='question margin-top-2'>
                                        {x.question ? x.question : '-'}
                                    </div>
                                    <BankChoices
                                        i={i}
                                        data={x.exam_question_choices}
                                    />
                                </div>
                            </div>
                        </label>
                    )
                })
                :
                content.push(
                    <NotAvailable key={Math.random()}>Data tidak tersedia</NotAvailable>
                )
        }
        return (
            <div className='content-bank margin-bottom-4'>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dataBank: state.bank //bank dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getBank,
    handleEvent
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(BankContent)
