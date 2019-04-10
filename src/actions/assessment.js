import { basicComps } from './../utils/common'

export const setSubject = (event, props) => {
    // const category = this.props.assessment.category || null

    if(category && event.value){
        let basic_comps = basicComps.call(this, {
            category: category,
            school_subject_id: event.value,
        }, {
            listOptions: true,
            set_data: false,
        })
    } 

    return {
        type: 'SET_SUBJECT',
        payload: event,
    }
}