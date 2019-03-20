import React, { Component } from 'react'
import Select from 'react-select';

import { apiClient } from './../../../utils/apiClient'
import {
    changeFormatOptions,
    attitudeScores,
} from './../../../utils/common'

import {
    removeAttitudeItem,
    handleAttitudeItem,
} from './../../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autosuggest from 'react-autosuggest';

var FontAwesome = require('react-fontawesome')


const getSuggestions = (option, value,users) => {
    console.log(option, value,users,"value atas")
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : option.filter(lang =>
        lang.label.toLowerCase().slice(0, inputLength) === inputValue
    );
};


const getSuggestionValue = suggestion => suggestion.label;

const renderSuggestion = suggestion => (
    <div id="value">
        {suggestion.label}
    </div>
);

class DailyAttitudeItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attitude_scores: [],
            value: '',
            suggestions: [],
            index:'',
            field:''
        }
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.onSelect = this.onSelect.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
    }

    componentDidMount() {
        attitudeScores.call(this)
    }
    onChangeDate(newValue, idx, field ) {
        let url = `/v1/filters/users?full_name=${newValue}`;

        apiClient('get', url).then(response => {
            const users = response.data.data.users.entries || []
            let full_name = ''
            let class_id = ''
            let user_id = ''

            users.map((data) => {
                full_name = data.full_name;
                class_id = data.class_id;
                user_id = data.id
            })
            this.props.handleAttitudeItem(newValue, idx, field)
            this.props.handleAttitudeItem(full_name, idx, 'full_name')
            this.props.handleAttitudeItem(class_id, idx, 'class_id')
            this.props.handleAttitudeItem(user_id, idx, 'user_id')


       
        }).catch(err => {
            // alert('Kesalahan API User')
        })
        this.props.handleAttitudeItem(newValue, idx, field)
        this.retrieveUsers(newValue, idx, field)
        this.setState({
            value: newValue
        });

    };

    getItemValue(item) {
        return `${item.value} - ${item.label}`;
    }

    renderItem(item, isHighlighted) {
        return (
            <div className="fullwidth" style={{ background: isHighlighted ? 'lightgray' : 'white', zIndex: '9999' }}>
                {item.label}
            </div>
        );
    }

    onSuggestionsFetchRequested(e, index, field) {
        this.retrieveUsers(e, index)
    };

    onChange(event, idx, fieldName) {
        this.props.handleAttitudeItem(event.target.value, idx, fieldName)
        this.retrieveUsers(event.target.value, idx);
    }

    retrieveUsers(searchText, idx, field) {
        let url = `/v1/filters/users?full_name=${searchText.value}`;

        apiClient('get', url).then(response => {
            const users = response.data.data.users.entries || []
            const options = changeFormatOptions(users, {
                key: 'id',
                value: 'full_name',
            })

            this.setState({
                suggestions: options,
                index:idx,
                field:field
            })
            getSuggestions(options, searchText.value, users)
            
            users.filter((element) =>{
                return element.full_name === searchText.value
            })

            console.log(users,"users")
            this.props.handleAttitudeItem(searchText.value, idx, field)
            this.props.handleAttitudeItem(users, idx, 'data')
            this.props.handleAttitudeItem(options, idx, 'options')
        }).catch(err => {
            // alert('Kesalahan API User')
        })
    }

    onSelect(val, idx) {
        if (val) {
            console.log(val,"here")
            const data_arr = val.split(' - ')
            const user_id = data_arr[0]
            const full_name = data_arr[1]


            if (this.props.user_attitude.data.length > 0) {
                let user = this.props.user_attitude.data.find((element) => {
                    console.log(element.id, user_id, "element")
                    return element.id == user_id
                })

                this.props.handleAttitudeItem(full_name, idx, 'name')
                this.props.handleAttitudeItem(user_id, idx, 'user_id')
                this.props.handleAttitudeItem(user.class_id, idx, 'class_id')
            }

            // user = this.props.user_attitude.data.find((element) => { return element.id == user_id })
        }
    }

    render() {
        let remove;
        const description = this.props.user_attitude ? this.props.user_attitude.description : null
        const name = this.props.user_attitude == null ? '' : (this.props.user_attitude.name == null ? '' : this.props.user_attitude.name)
        const options = this.props.user_attitude == null ? [] : (this.props.user_attitude.options == null ? [] : this.props.user_attitude.options)
        const score = this.props.user_attitude == null ? null : (this.props.user_attitude.score == null ? null : this.props.user_attitude.score)

        if (this.props.index > 0) {
            remove = <div className="col-sm-1 margin-top-9">
                <a href="javascript:void(0);" onClick={() => { this.props.removeAttitudeItem(this.props.index) }}>
                    <FontAwesome name="trash" className="margin-top-2" />
                </a>
            </div>
        }
        const { value, suggestions } = this.state
        
        return (
            <div>
                <div className="row">
                    <div className="col-sm-11">
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="content-input margin-top-5 fullwidth">
                                    <label className="content-label">Nama Peserta Didik</label>
                                    <Autosuggest
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={(e) => { this.retrieveUsers(e, this.props.index, 'name') }}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={{
                                            placeholder: 'Tulis nama siswa',
                                            value,
                                            onChange:(e, {newValue}) => this.onChangeDate(newValue,this.props.index, 'name') 
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="content-input margin-top-5">
                                    <label className="content-label">Nilai Sikap</label>
                                    <Select
                                        isClearable
                                        className="select-list"
                                        classNamePrefix="select"
                                        placeholder="Pilih nilai sikap"
                                        name="score"
                                        options={this.state.attitude_scores}
                                        onChange={(event) => { this.props.handleAttitudeItem(event.value, this.props.index, 'score') }}
                                        value={this.state.attitude_scores.find((element) => { return element.value == score })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row margin-top-4">
                            <div className="col-sm-12">
                                <div className="content-input margin-top-4">
                                    <label className="content-label">Deskripsi Sikap</label>
                                    <textarea
                                        placeholder="Masukkan keterangan"
                                        className="disblock fullwidth textarea-box"
                                        onChange={(event) => { this.props.handleAttitudeItem(event.target.value, this.props.index, 'description','') }}
                                    >
                                        {description}
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    {remove}
                </div>
                <div className="row">
                    <div className="col-sm-11">
                        <div className="margin-vert-4 border-bottom"></div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => ({
    assessment: state.assessment,
    user_attitude: state.assessment.user_attitudes_attributes ? (state.assessment.user_attitudes_attributes.length > 0 ? state.assessment.user_attitudes_attributes[props.index] : {}) : {}
})

const mapDispatchToProps = dispatch => bindActionCreators({
    removeAttitudeItem,
    handleAttitudeItem,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DailyAttitudeItem)



// import React, { Component } from 'react'
// import Autosuggest from 'react-autosuggest';

// const languages = [
//     {
//         name: 'C',
//         year: 1972
//     },
//     {
//         name: 'C++',
//         year: 1972
//     },
//     {
//         name: 'C--',
//         year: 1972
//     },
//     {
//         name: 'Elm',
//         year: 2012
//     },
// ];

// // Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//     const inputValue = value.trim().toLowerCase();
//     const inputLength = inputValue.length;

//     return inputLength === 0 ? [] : languages.filter(lang =>
//         lang.name.toLowerCase().slice(0, inputLength) === inputValue
//     );
// };


// // When suggestion is clicked, Autosuggest needs to populate the input
// // based on the clicked suggestion. Teach Autosuggest how to calculate the
// // input value for every given suggestion.
// const getSuggestionValue = suggestion => suggestion.name;


// // Use your imagination to render suggestions.
// const renderSuggestion = suggestion => (
//     <div>
//         {suggestion.name}
//     </div>
// );

// export default class Example extends React.Component {
//     constructor() {
//         super();

//         // Autosuggest is a controlled component.
//         // This means that you need to provide an input value
//         // and an onChange handler that updates this value (see below).
//         // Suggestions also need to be provided to the Autosuggest,
//         // and they are initially empty because the Autosuggest is closed.
//         this.state = {
//             value: '',
//             suggestions: []
//         };

//         this.onChange = this.onChange.bind(this)
//         this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
//         this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
//     }

//     onChange(event, { newValue }) {
//         console.log(newValue,"new value")
//         this.setState({
//             value: newValue
//         });
//     };

//     // Autosuggest will call this function every time you need to update suggestions.
//     // You already implemented this logic above, so just use it.
//     onSuggestionsFetchRequested({ value }) {
//         let data = getSuggestions(value)
//         console.log(data, "my data")
//         this.setState({
//             suggestions: getSuggestions(value)
//         });
//     };

//     // Autosuggest will call this function every time you need to clear suggestions.
//     onSuggestionsClearRequested() {
//         this.setState({
//             suggestions: []
//         });
//     };

//     render() {
//         const { value, suggestions } = this.state;
//         console.log(value)
//         // Autosuggest will pass through all these props to the input.
//         const inputProps = {
//             placeholder: 'Type a programming language',
//             value,
//             onChange: this.onChange
//         };
//         // console.log(suggestion,"here new cok")
//         // Finally, render it!
//         return (
//             <Autosuggest
//                 suggestions={suggestions}
//                 onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//                 onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//                 getSuggestionValue={getSuggestionValue}
//                 renderSuggestion={renderSuggestion}
//                 inputProps={{
//                     placeholder: 'Type a programming language',
//                     value,
//                     onChange: this.onChange
//                 }}
//             />
//         );
//     }
// }