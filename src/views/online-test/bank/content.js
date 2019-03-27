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
                        <div className='wrapper' key={i}>
                            <div className='row padding-side-2' >
                                <div className='col-sm-1 col-md-1 padding-top-3'>
                                    <input
                                        type='radio' name='apalah' value='Opsi Question' id={x.id} checked={x.is_selected == true}
                                        onChange={(e) => this.props.handleEvent(e.target.id, 'is_selected')}
                                    />
                                    <label htmlFor={x.id}></label>
                                    <div className="check"></div>
                                </div>
                                <div className='col-sm-1 col-md-1 margin-top-5 text-left'>{x.qn_number ? x.qn_number : '-'}.</div>
                                <div className='col-sm-10 col-md-10'>
                                    <div className='kd margin-top-5'>
                                        KD. {x.comp_number ? x.comp_number : '-'} {x.content ? x.content : '-'}
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
                        </div>
                    )
                })
                :
                content.push(
                    <NotAvailable key={Math.random()}>Data tidak tersedia</NotAvailable>
                )
        }
        return (
            <div className='content-bank margin-top-2 margin-bottom-4'>
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
