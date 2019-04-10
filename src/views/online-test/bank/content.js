import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBank, handleEvent} from './../../../redux-modules/modules/bank'
import BankChoices from './choices'
import { NotAvailable } from '../../global/notAvailable';
import _ from 'lodash'

class BankContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            page: 1,
            // loader: true
        }

        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        this.props.getBank()

        var element = document.getElementById("content-bank")
        element.addEventListener('scroll', this.handleScroll)
    }

    handleScroll(event) {
        const scrollTop = event.target.scrollTop
        const scrollHeight = event.target.scrollHeight
        const clientHeight = event.target.clientHeight
        const scrollPosition = scrollHeight - clientHeight
        const competencyId = _.map(this.props.basic_comps, 'id')
        const page = this.state.page + 1
        const totalPages = _.get(this.props.dataBank, 'data.questions.total_pages', 1)

        if (scrollPosition === scrollTop && page <= totalPages  ) {
            this.setState({
                page: page
            })
            this.props.getBank(this.props.questionType, competencyId, page, 'scroll')
            return false
        }
        // this.setState({
        //     loader: true
        // })
    }


    render() {
        let dataEntries = _.get(this.props.dataBank, 'data.questions.entries', [])
        let content = dataEntries.map((x, i) => {
            return (
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

        return (
            <div className='content-bank margin-bottom-4' id="content-bank">
                {
                    content.length ?
                        content

                            /* {this.state.loader &&
                                <div className="loader"></div>
                            } */
                    :
                        <NotAvailable key={Math.random()}>Data tidak tersedia</NotAvailable>

                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dataBank: state.bank, //bank dari reducer
    basic_comps: _.get(state, 'onlineQuestion.basicCompetencies', []),

})

const mapDispatchToProps = dispatch => bindActionCreators({
    getBank,
    handleEvent
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(BankContent)
