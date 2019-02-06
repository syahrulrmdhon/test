import React, { Component } from 'react'

export class Percentage extends Component {
    render() {
        let classname = ''
        let dataPercentages = this.props.evaluations
        let percentage = dataPercentages.correct_percentage
        let predicate = dataPercentages.predicate


        if (dataPercentages.length === 0) {
            classname = 'large-text-red-bold'
        } else if (dataPercentages.length !== 0 && (predicate === 'a' || predicate === 'b')) {
            classname = 'large-text-green-bold'
        } else if (dataPercentages.length !== 0 && predicate === 'c') {
            classname = 'large-text-yellow-bold'
        } else if (dataPercentages.length !== 0 && predicate === 'd') {
            classname = 'large-text-red-bold'
        }

        return (
            <td className={classname}>{percentage}</td>
        )
    }
}

export class Predicate extends Component {
    render() {
        let p =''
        let dataPredicates = this.props.evaluations
        let predicate = dataPredicates.predicate

        if(dataPredicates.length===0){
            p=''
        }else if(dataPredicates.length!==0 && (predicate==='a'||predicate==='b')){
            p='Murid Kurang Paham'
        }else if(dataPredicates.length!==0 && predicate==='c'){
            p='Murid Cukup Paham'
        }else if(dataPredicates.length!==0 && predicate==='d'){
            p='Murid Kurang Paham'
        }

        return (
            <td className="text-left">{p}</td>
        )
    }
}

