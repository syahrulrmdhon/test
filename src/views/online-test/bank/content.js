import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBank, } from './../../../redux-modules/modules/bank'
import BankChoices from './choices'

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
        dataEntries.map((x, i) => {
            content.push(
                <div className='wrapper' key={x.id}>
                    <div className='row padding-side-2' key={Math.random()}>
                        <div className='col-sm-1 col-md-1 float-right'>
                            {/* <label htmlFor={'present-' + x.id}></label>
                            <input type="radio" className="rd-btn"
                                name={x.id} value="present"
                                onChange={e => this.props.handleOptionChange(e)}
                                id={'present-' + x.id}
                                checked={'present'}
                            />
                            <div className="check"></div> */}
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
    getBank
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(BankContent)
